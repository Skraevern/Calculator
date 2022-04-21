`use strict`;

const subtractBtn = document.getElementById(`subtract-btn`);
const multiplyBtn = document.getElementById(`multiply-btn`);
const percentBtn = document.getElementById(`percent-btn`);
const divideBtn = document.getElementById(`divide-btn`);
const equalsBtn = document.getElementById(`equals-btn`);
const rootBtn = document.getElementById(`root-btn`);
const dotBtn = document.getElementById(`dot-btn`);
const addBtn = document.getElementById(`add-btn`);
const acBtn = document.getElementById(`ac-btn`);
const cBtn = document.getElementById(`c-btn`);
const btn0 = document.getElementById(`btn-0`);
const btn1 = document.getElementById(`btn-1`);
const btn2 = document.getElementById(`btn-2`);
const btn3 = document.getElementById(`btn-3`);
const btn4 = document.getElementById(`btn-4`);
const btn5 = document.getElementById(`btn-5`);
const btn6 = document.getElementById(`btn-6`);
const btn7 = document.getElementById(`btn-7`);
const btn8 = document.getElementById(`btn-8`);
const btn9 = document.getElementById(`btn-9`);
const text = document.getElementById(`text`);

const calculator = {
  displayValue: ``,
  firstOperand: null,
  waitingForSecondOperand: true,
  operator: null,
  calculate() {
    if (this.operator === `+`) {
      this.firstOperand += Number(this.displayValue);
    }
    if (this.operator === `-`) {
      this.firstOperand -= Number(this.displayValue);
    }
    if (this.operator === `*`) {
      this.firstOperand *= Number(this.displayValue);
    }
    if (this.operator === `/`) {
      this.firstOperand /= Number(this.displayValue);
    }
    this.displayValue = this.firstOperand;
  },
};

displayText = () => (text.textContent = calculator.displayValue);

btnPressed = (e) => {
  // Prevents numbers user inputs overflowing.
  if (
    calculator.displayValue.length > 8 ||
    (calculator.displayValue === `` && e === `0`)
  ) {
    return;
  }

  // check if input is number. If it`s i number adds it to a string.
  if (!isNaN(e)) {
    calculator.displayValue += e;
    displayText();
  }

  // Stores first number in calculater object
  if (
    (e === `+` || e === `-` || e === `*` || e === `/`) &&
    calculator.waitingForSecondOperand
  ) {
    calculator.firstOperand = Number(calculator.displayValue);
    calculator.waitingForSecondOperand = false;
    calculator.displayValue = ``;
  }
  // if calculator object has a stored number. Calculates.
  if (
    (e === `+` || e === `-` || e === `*` || e === `/` || e === `=`) &&
    calculator.waitingForSecondOperand === false
  ) {
    calculator.calculate();
    displayText();
    calculator.operator = e;
    calculator.displayValue = ``;
  }
};

// Delete
acBtn.onclick = () => {
  calculator.displayValue = ``;
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = true;
  calculator.operator = null;
  displayText();
};
btn1.onclick = () => btnPressed(`1`);
btn2.onclick = () => btnPressed(`2`);
btn3.onclick = () => btnPressed(`3`);
btn4.onclick = () => btnPressed(`4`);
btn5.onclick = () => btnPressed(`5`);
btn6.onclick = () => btnPressed(`6`);
btn7.onclick = () => btnPressed(`7`);
btn8.onclick = () => btnPressed(`8`);
btn9.onclick = () => btnPressed(`9`);
btn0.onclick = () => btnPressed(`0`);
addBtn.onclick = () => btnPressed(`+`);
equalsBtn.onclick = () => btnPressed(`=`);
divideBtn.onclick = () => btnPressed(`/`);
multiplyBtn.onclick = () => btnPressed(`*`);
subtractBtn.onclick = () => btnPressed(`-`);
