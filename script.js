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
const memBtn = document.getElementById(`mr-btn`);
const memTxt = document.getElementById(`memory`);
const mPlussBtn = document.getElementById(`m+-btn`);
const mMinusBtn = document.getElementById(`m--btn`);
const mcBtn = document.getElementById(`mc-btn`);

const calculator = {
  displayValue: ``,
  firstOperand: null,
  waitingForSecondOperand: true,
  operator: null,
  numberContainsDot: false,
  memory: null,
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
  calculateRoot() {
    this.displayValue = Math.sqrt(this.firstOperand);
  },
};

displayText = () => {
  if (
    calculator.displayValue.toString().length > 8 &&
    calculator.firstOperand !== null
  ) {
    text.textContent = calculator.displayValue.toString().slice(0, 8) + `...`;
  } else {
    text.textContent = calculator.displayValue;
  }
};

btnPressed = (e) => {
  if (calculator.displayValue === `` && e === `.`) {
    calculator.displayValue = `0.`;
    displayText();
    return;
  }

  // Prevents numbers user inputs overflowing.
  if (
    calculator.displayValue.length > 8 ||
    (calculator.displayValue === `` && e === `0`) ||
    (e === `.` && calculator.numberContainsDot === true)
  ) {
    return;
  }

  // check if input is number. If it`s i number adds it to a string.
  if (!isNaN(e) || e === `.`) {
    calculator.displayValue += e;
    displayText();
    if (e === `.`) {
      calculator.numberContainsDot = true;
    }
  }

  // Stores first number in calculater object
  if (
    (e === `+` || e === `-` || e === `*` || e === `/`) &&
    calculator.waitingForSecondOperand
  ) {
    calculator.firstOperand = Number(calculator.displayValue);
    calculator.waitingForSecondOperand = false;
    calculator.displayValue = ``;
    calculator.numberContainsDot = false;
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
  if (e === `root`) {
    calculator.firstOperand = Number(calculator.displayValue);
    calculator.calculateRoot();
    displayText();
  }
};

// Delete
acBtn.onclick = () => {
  calculator.displayValue = ``;
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = true;
  calculator.operator = null;
  calculator.numberContainsDot = false;
  displayText();
};

cBtn.onclick = () => {
  calculator.displayValue = ``;
  displayText();
};
mPlussBtn.onclick = () => {
  if (calculator.memory === null) {
    calculator.memory = Number(calculator.displayValue);
    memTxt.textContent = `MEMORY`;
  } else {
    calculator.memory += Number(calculator.displayValue);
  }
};

memBtn.onclick = () => {
  if (calculator.memory === null) {
    return;
  } else {
    calculator.displayValue = calculator.memory;
    displayText();
  }
};
mMinusBtn.onclick = () => {
  if (calculator.memory === null) {
    return;
  } else {
    calculator.memory -= Number(calculator.displayValue);
  }
};

mcBtn.onclick = () => {
  calculator.memory = null;
  memTxt.textContent = ``;
};

rootBtn.onclick = () => btnPressed(`root`);
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
dotBtn.onclick = () => btnPressed(`.`);
addBtn.onclick = () => btnPressed(`+`);
equalsBtn.onclick = () => btnPressed(`=`);
divideBtn.onclick = () => btnPressed(`/`);
multiplyBtn.onclick = () => btnPressed(`*`);
subtractBtn.onclick = () => btnPressed(`-`);
