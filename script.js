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
const plussMinusBtn = document.getElementById(`plus/minus-btn`);

const calculator = {
    displayValue: ``,
    firstOperand: null,
    waitingForSecondOperand: true,
    operator: null,
    numberContainsDot: false,
    memory: null,
    displayText() {
      if (
        this.displayValue.toString().length > 8 &&
        this.firstOperand !== null
      ) {
        text.textContent = this.displayValue.toString().slice(0, 8) + `...`;
      } else {
        text.textContent = this.displayValue;
      }
    },
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
    deleteAll() {
      this.displayValue = ``;
      this.firstOperand = null;
      this.waitingForSecondOperand = true;
      this.operator = null;
      this.numberContainsDot = false;
      this.displayText();
    },
    delete() {
      calculator.displayValue = ``;
      calculator.displayText();
    },
    calculateMemory(e) {
      if ((e === `-` || e === `memory-recall`) && this.memory === null) {
        return;
      }
      if (e === `+`) {
        if (this.memory === null) {
          this.memory = Number(this.displayValue);
          memTxt.textContent = `MEMORY`;
        } else {
          this.memory += Number(this.displayValue);
        }
      }
      if (e === `-`) {
        this.memory -= Number(calculator.displayValue);
      }
      if (e === `memory-recall`) {
        this.displayValue = this.memory;
        this.displayText();
      }
      if (e === `memory-clear`) {
        this.memory = null;
        memTxt.textContent = ``;
      }
    },
    plusMinus() {
      if (this.displayValue === `` || this.displayValue === `0.`) {
        return;
      } else {
        this.displayValue =
          Number(this.displayValue) - Number(this.displayValue) * 2;
        this.displayText();
      }
    },
    percentage() {
      if (calculator.displayValue === `` || calculator.displayValue === `0.`) {
        return;
      }
      if (calculator.operator === null) {
        calculator.displayValue = Number(calculator.displayValue) / 100;
      }
      if (calculator.operator === `*`) {
        calculator.displayValue =
          (Number(calculator.displayValue) * calculator.firstOperand) / 100;
      }
      if (calculator.operator === `+`) {
        calculator.displayValue =
          (Number(calculator.displayValue) * calculator.firstOperand) / 100 +
          calculator.firstOperand;
      }
      if (calculator.operator === `-`) {
        calculator.displayValue =
          calculator.firstOperand -
          (Number(calculator.displayValue) * calculator.firstOperand) / 100;
      }
      calculator.displayText();
    },
  },
  btnPressed = (e) => {
    if (calculator.displayValue === `` && e === `.`) {
      calculator.displayValue = `0.`;
      calculator.displayText();
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
    if (!isNaN(e) || e === `.` || e === `0.`) {
      calculator.displayValue += e;
      calculator.displayText();
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
      calculator.displayText();
      calculator.operator = e;
      calculator.displayValue = ``;
    }
    if (e === `root`) {
      calculator.firstOperand = Number(calculator.displayValue);
      calculator.calculateRoot();
      calculator.displayText();
    }
  };

// Delete

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
cBtn.onclick = () => calculator.delete();
equalsBtn.onclick = () => btnPressed(`=`);
divideBtn.onclick = () => btnPressed(`/`);
rootBtn.onclick = () => btnPressed(`root`);
multiplyBtn.onclick = () => btnPressed(`*`);
subtractBtn.onclick = () => btnPressed(`-`);
acBtn.onclick = () => calculator.deleteAll();
percentBtn.onclick = () => calculator.percentage();
plussMinusBtn.onclick = () => calculator.plusMinus();
mMinusBtn.onclick = () => calculator.calculateMemory(`-`);
mPlussBtn.onclick = () => calculator.calculateMemory(`+`);
mcBtn.onclick = () => calculator.calculateMemory(`memory-clear`);
memBtn.onclick = () => calculator.calculateMemory(`memory-recall`);
