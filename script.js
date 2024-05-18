const display = document.getElementById('display');
const buttons = Array.from(document.getElementsByClassName('btn'));
let currentInput = '';
let operator = '';
let previousInput = '';
let displayText = '';

document.addEventListener('keydown', (e) => {
    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || ['+', '-', '*', '/', '=', 'Enter', 'Backspace', '.', '%'].includes(e.key)) {
        e.preventDefault();
        const key = e.key === 'Enter' ? '=' : e.key;

        if (key === 'Backspace') {
            currentInput = currentInput.slice(0, -1);
            displayText = currentInput + (operator ? ` ${operator} ` : '');
            display.textContent = displayText;
            return;
        }

        if (key === '%') {
            currentInput = (parseFloat(currentInput) / 100).toString();
            displayText = currentInput + (operator ? ` ${operator} ` : '');
            display.textContent = displayText;
            return;
        }

        const button = buttons.find(btn => btn.getAttribute('data-value') === key);
        if (button) {
            button.click();
        }
    }
});

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.getAttribute('data-value');

        if (value === 'C') {
            currentInput = '';
            operator = '';
            previousInput = '';
            displayText = '';
            display.textContent = displayText;
        } else if (value === '=') {
            if (currentInput && previousInput && operator) {
                currentInput = eval(`${previousInput}${operator}${currentInput}`).toString();
                displayText = currentInput;
                display.textContent = displayText;
                previousInput = '';
                operator = '';
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput) {
                if (previousInput) {
                    previousInput = eval(`${previousInput}${operator}${currentInput}`).toString();
                } else {
                    previousInput = currentInput;
                }
                currentInput = '';
                operator = value;
                displayText = `${previousInput} ${operator}`;
                display.textContent = displayText;
            }
        } else if (value === '.') {
            if (!currentInput.includes('.')) {
                currentInput += value;
                displayText = currentInput + (operator ? ` ${operator} ` : '');
                display.textContent = displayText;
            }
        } else if (value === '%') {
            currentInput = (parseFloat(currentInput) / 100).toString();
            displayText = currentInput + (operator ? ` ${operator} ` : '');
            display.textContent = displayText;
        } else {
            currentInput += value;
            displayText = currentInput + (operator ? ` ${operator} ` : '');
            display.textContent = displayText;
        }
    });
});
