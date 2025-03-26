// Selecting the calculator screen and buttons
const expressionScreen = document.querySelector('.expression-screen'); // Shows full expression
const calculatorScreen = document.querySelector('.calculator-screen'); // Shows current number
const buttons = document.querySelectorAll('button');

// Initializing variables for the calculation
let currentInput = '';
let previousInput = '';
let operator = null;
let expression = ''; // Stores full expression

// Function to update the calculator screen
function updateScreen() {
    expressionScreen.value = expression || '0';
    calculatorScreen.value = currentInput || '0';
}

// Function to handle button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;

        // Handling different button types
        if (button.classList.contains('operator')) {
            handleOperator(value);
        } else if (button.classList.contains('all-clear')) {
            clearAll();
        } else if (button.classList.contains('backspace')) {
            backspace();
        } else if (button.classList.contains('equal-sign')) {
            calculate();
        } else {
            handleNumber(value);
        }

        // Updating the screen after each click
        updateScreen();
    });
});

// Function to handle number and decimal inputs
function handleNumber(value) {
    if (value === '.' && currentInput.includes('.')) return; // To Prevent multiple decimals
    if (currentInput === '0' && value !== '.') {
        currentInput = value; //  Replace 0 with the new number
    } else {
        currentInput += value;
    }
    expression += value; // Append to full expression
}

// Function to handle operator inputs
function handleOperator(value) {
    if (currentInput === '') return;
    if (previousInput !== '') {
    calculate(); // Auto calculate before adding a new operator
    }
    operator = value;
    previousInput = currentInput;
    currentInput = '';
    expression += ` ${value} `;
}

// Function to calculate the result
function calculate() {
    if (previousInput === '' || currentInput === '') return; 

    let result;
    const previous = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(previous) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = previous + current;
            break;
        case '-':
            result = previous - current;
            break;
        case '*':
            result = previous * current;
            break;
        case '/':
            result = current === 0 ? 'Error' : previous / current; 
            break;
        default:
            return;
    }

    currentInput = result.toString();
    expression = currentInput; // Reset expression to result
    operator = null;
    previousInput = '';
}

// Function to clear all inputs
function clearAll() {
    currentInput = '';
    previousInput = '';
    operator = null;
    expression = '';
}

// Function to handle backspace
function backspace() {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        expression = expression.slice(0, -1);
    }
}

// Initial screen update
updateScreen();
