`use strict`;

const calculator = {
  displayValue: ``,
  firstOperand: null,
  waitingForSecondOperand: true,
  operator: null,
  numberContainsDot: false,
  memory: null,
  //
  plussMinusBtn: document.getElementById(`calculator-plus/minus-btn`),
  subtractBtn: document.getElementById(`calculator-subtract-btn`),
  multiplyBtn: document.getElementById(`calculator-multiply-btn`),
  percentBtn: document.getElementById(`calculator-percent-btn`),
  divideBtn: document.getElementById(`calculator-divide-btn`),
  equalsBtn: document.getElementById(`calculator-equals-btn`),
  rootBtn: document.getElementById(`calculator-root-btn`),
  mPlussBtn: document.getElementById(`calculator-m+-btn`),
  mMinusBtn: document.getElementById(`calculator-m--btn`),
  dotBtn: document.getElementById(`calculator-dot-btn`),
  addBtn: document.getElementById(`calculator-add-btn`),
  memBtn: document.getElementById(`calculator-mr-btn`),
  memTxt: document.getElementById(`calculator-memory`),
  acBtn: document.getElementById(`calculator-ac-btn`),
  mcBtn: document.getElementById(`calculator-mc-btn`),
  cBtn: document.getElementById(`calculator-c-btn`),
  btn0: document.getElementById(`calculator-btn-0`),
  btn1: document.getElementById(`calculator-btn-1`),
  btn2: document.getElementById(`calculator-btn-2`),
  btn3: document.getElementById(`calculator-btn-3`),
  btn4: document.getElementById(`calculator-btn-4`),
  btn5: document.getElementById(`calculator-btn-5`),
  btn6: document.getElementById(`calculator-btn-6`),
  btn7: document.getElementById(`calculator-btn-7`),
  btn8: document.getElementById(`calculator-btn-8`),
  btn9: document.getElementById(`calculator-btn-9`),
  text: document.getElementById(`calculator-text`),
  //
  displayText() {
    if (this.displayValue.toString().length > 8 && this.firstOperand !== null) {
      text.textContent = this.displayValue.toString().slice(0, 8) + `...`;
    } else {
      this.text.textContent = this.displayValue;
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
        this.memTxt.textContent = `MEMORY`;
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
      this.memTxt.textContent = ``;
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
  btnPressed(e) {
    if (this.displayValue === `` && e === `.`) {
      this.displayValue = `0.`;
      this.numberContainsDot = true;
    }
    // Prevents numbers user inputs overflowing.
    if (
      this.displayValue.length > 8 ||
      (this.displayValue === `` && e === `0`) ||
      (e === `.` && this.numberContainsDot === true)
    ) {
      return;
    }
    // check if input is number. If it`s i number adds it to a string.
    if (!isNaN(e) || e === `.` || e === `0.`) {
      this.displayValue += e;
      if (e === `.`) {
        this.numberContainsDot = true;
      }
    }
    // Stores first number in calculater object
    if (
      (e === `+` || e === `-` || e === `*` || e === `/`) &&
      this.waitingForSecondOperand === true
    ) {
      this.firstOperand = Number(this.displayValue);
      this.waitingForSecondOperand = false;
      this.displayValue = ``;
      this.numberContainsDot = false;
    }
    // if this object has a stored number. Calculates.
    if (
      (e === `+` || e === `-` || e === `*` || e === `/` || e === `=`) &&
      this.waitingForSecondOperand === false
    ) {
      this.calculate();
      this.displayText();
      this.operator = e;
      this.displayValue = ``;
      return;
    }
    if (e === `root`) {
      this.firstOperand = Number(this.displayValue);
      this.calculateRoot();
    }
    this.displayText();
  },
  activateBtns() {
    this.cBtn.onclick = () => this.delete();
    this.acBtn.onclick = () => this.deleteAll();
    this.btn1.onclick = () => this.btnPressed(`1`);
    this.btn2.onclick = () => this.btnPressed(`2`);
    this.btn3.onclick = () => this.btnPressed(`3`);
    this.btn4.onclick = () => this.btnPressed(`4`);
    this.btn5.onclick = () => this.btnPressed(`5`);
    this.btn6.onclick = () => this.btnPressed(`6`);
    this.btn7.onclick = () => this.btnPressed(`7`);
    this.btn8.onclick = () => this.btnPressed(`8`);
    this.btn9.onclick = () => this.btnPressed(`9`);
    this.btn0.onclick = () => this.btnPressed(`0`);
    this.dotBtn.onclick = () => this.btnPressed(`.`);
    this.addBtn.onclick = () => this.btnPressed(`+`);
    this.percentBtn.onclick = () => this.percentage();
    this.plussMinusBtn.onclick = () => this.plusMinus();
    this.equalsBtn.onclick = () => this.btnPressed(`=`);
    this.divideBtn.onclick = () => this.btnPressed(`/`);
    this.rootBtn.onclick = () => this.btnPressed(`root`);
    this.multiplyBtn.onclick = () => this.btnPressed(`*`);
    this.subtractBtn.onclick = () => this.btnPressed(`-`);
    this.mMinusBtn.onclick = () => this.calculateMemory(`-`);
    this.mPlussBtn.onclick = () => this.calculateMemory(`+`);
    this.mcBtn.onclick = () => this.calculateMemory(`memory-clear`);
    this.memBtn.onclick = () => this.calculateMemory(`memory-recall`);
  },
};
window.onload = () => calculator.activateBtns();
