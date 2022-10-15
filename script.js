function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    if(b === 0) {
        clearCalculator();        
        return "ERROR";
    }
    return a/b;
}

const currentDisplay = document.getElementById("numdisplay");
const currentTempDisplay = document.getElementById("tempdisplay");
const numButtons = document.querySelectorAll(".number");
const opButtons = document.querySelectorAll(".oper");
const decimalButton = document.getElementById("decimal");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");

let firstOperand;
let secondOperand;
let tempValueUsed = false;
let tempOperator;

function clearCalculator() {
    tempValueUsed = false;
    firstOperand = 0;
    secondOperand = 0;
    tempOperator = "";
    currentDisplay.innerHTML = "0";
    currentTempDisplay.innerHTML = "0";
}

function deleteLastInput() {
    if(currentDisplay.innerHTML.length === 1) {
        currentDisplay.innerHTML = "0";
    } else {
        currentDisplay.innerHTML = currentDisplay.innerHTML.slice(0, -1);
    }
}

function putDecimal(event) {
    if(currentDisplay.innerHTML.indexOf(".") < 0) {
        appendInput(event);
    }
}

function appendInput (event) {
    if((currentDisplay.innerHTML === "0" && event.target.innerHTML !== ".") || currentDisplay.innerHTML === "ERROR") {
        currentDisplay.innerHTML = event.target.innerHTML;
    } else {
        currentDisplay.innerHTML += event.target.innerHTML;
    }
}

function operate (event) {
    if(tempValueUsed === false) {
        currentTempDisplay.innerHTML = currentDisplay.innerHTML + " " + event.target.innerHTML;
        firstOperand = +currentDisplay.innerHTML;
        currentDisplay.innerHTML = "0";
        tempValueUsed = true;
    } else {
        secondOperand = +currentDisplay.innerHTML;
        firstOperand = chooseOperator();
        currentTempDisplay.innerHTML = firstOperand.toString();
        currentDisplay.innerHTML = "0";
    }
    tempOperator = event.target.id;
}

function chooseOperator() {
    switch(tempOperator) {
        case "add": return add(firstOperand,secondOperand);
        case "subtract": return subtract(firstOperand,secondOperand);
        case "multiply": return multiply(firstOperand,secondOperand);
        case "divide": return divide(firstOperand,secondOperand);
    }
}

function equalOperate () {
    if(tempOperator === undefined) {
        return;
    }
    secondOperand = +currentDisplay.innerHTML;
    firstOperand = chooseOperator();
    if(firstOperand === undefined || secondOperand === undefined)
        return;
    currentDisplay.innerHTML = firstOperand.toString();
    currentTempDisplay.innerHTML = "0";
    tempValueUsed = false;
    tempOperator = "";
}

numButtons.forEach(num => num.addEventListener("click", appendInput));
opButtons.forEach(op => op.addEventListener("click", operate));
decimalButton.addEventListener("click", putDecimal);
equalsButton.addEventListener("click", equalOperate);
clearButton.addEventListener("click", clearCalculator);
deleteButton.addEventListener("click", deleteLastInput);

