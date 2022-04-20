`use strict`;

const text = document.getElementById(`text`);
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
const substractBtn = document.getElementById(`substract-btn`);
const multiplyBtn = document.getElementById(`multiply-btn`);
const percentBtn = document.getElementById(`percent-btn`);
const divideBtn = document.getElementById(`divide-btn`);
const equalsBtn = document.getElementById(`equals-btn`);
const rootBtn = document.getElementById(`root-btn`);
const dotBtn = document.getElementById(`dot-btn`);
const addBtn = document.getElementById(`add-btn`);
const acBtn = document.getElementById(`ac-btn`);
const cBtn = document.getElementById(`c-btn`);

let calculation = [];
let savedNumber = [];
let add;

displayText = () => (text.textContent = calculation.join(``));

btnPressed = (e) => {
  if (calculation.length > 8) {
    return;
  }
  if (!isNaN(e)) {
    calculation.push(e);
    displayText();
  }
};

acBtn.onclick = () => {
  calculation = [];
  displayText();
};
btn1.onclick = () => btnPressed(1);
btn2.onclick = () => btnPressed(2);
btn3.onclick = () => btnPressed(3);
btn4.onclick = () => btnPressed(4);
btn5.onclick = () => btnPressed(5);
btn6.onclick = () => btnPressed(6);
btn7.onclick = () => btnPressed(7);
btn8.onclick = () => btnPressed(8);
btn9.onclick = () => btnPressed(9);
btn0.onclick = () => btnPressed(0);
addBtn.onclick = () => btnPressed(`+`);
equalsBtn.onclick = () => btnPressed(`=`);
