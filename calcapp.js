const numberBtn = document.querySelectorAll('.number');
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const rngBtn = document.getElementById('rng');
const nightBtn = document.getElementById('night');
const mathBtns = document.querySelectorAll('.mathFnc');
const allBtns = document.querySelectorAll('button');
let viewport = document.querySelector('.result');
let sumTotal = 0;
let numHolder = [];
let num1 = [];
let num2 = [];

function btnListener() {
    numberBtn.forEach(button => {
        button.addEventListener('click', () => {
            numHolder.push(button.textContent);
            viewport.textContent = numHolder.join("");
        })
    })
    allBtns.forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent === "="){
                if (numHolder.length === 0) {
                    viewport.textContent = 0;
                } else {
                    viewport.textContent = numHolder.reduce((acc, val) => acc + val);
                    numHolder = [];
                }
            } else if (button.textContent === "Del") {
                numHolder.pop();
                viewport.textContent = numHolder.join("");
                if (numHolder.length === 0){
                    viewport.textContent = 0;
                }
            } else if (button.textContent === "Clear") {
                numHolder = [];
                num1 = [];
                num2 = [];
                viewport.textContent = 0;
            } else if (button.textContent === "Random # (1-100)") {
                numHolder = [];
                num1 = [];
                num2 = [];
                viewport.textContent = Math.floor((Math.random() * 100) + 1);
            };
        })
    })
};


btnListener();
mathTime();


function mathTime() {
    mathBtns.forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent === "*"){
                if (num1.length === 0) {
                    num1 = numHolder;
                    numHolder = [];
                } else if (num1.length > 0 && num2.length === 0) {
                    num2 = numHolder;
                    numHolder = [];
                    multiply(num1, num2);
                    num1 = [sumTotal.toString()];
                    num2 = [];
                    // console.log(mathHolder);
                }
            } else if (button.textContent === "/"){
                if (num1.length === 0) {
                    num1 = numHolder;
                    numHolder = [];
                } else if (num1.length > 0 && num2.length === 0) {
                    num2 = numHolder;
                    numHolder = [];
                    divide(num1, num2);
                    num1 = [sumTotal.toString()];
                    num2 = [];
                    // console.log(mathHolder);
                }
            } else if (button.textContent === "+"){
                if (num1.length === 0) {
                    num1 = numHolder;
                    numHolder = [];
                } else if (num1.length > 0 && num2.length === 0) {
                    num2 = numHolder;
                    numHolder = [];
                    add(num1, num2);
                    num1 = [sumTotal.toString()];
                    num2 = [];
                    // console.log(mathHolder);
                }
            } else if (button.textContent === "-"){
                if (num1.length === 0) {
                    num1 = numHolder;
                    numHolder = [];
                } else if (num1.length > 0 && num2.length === 0) {
                    num2 = numHolder;
                    numHolder = [];
                    subtract(num1, num2);
                    num1 = [sumTotal.toString()];
                    num2 = [];
                    // console.log(mathHolder);
                }
            }
        })
    })
}


function add(num1, num2) {
    num1 = num1.join('');
    num2 = num2.join('');
    sumTotal = parseFloat(num1) + parseFloat(num2);
    viewport.textContent = sumTotal;

    // sumTotal = num1.reduce((acc, val) => acc + val) + num2.reduce((acc, val) => acc + val);
    // viewport.textContent = sumTotal;
    // num1 = sumTotal;
}

function subtract(num1, num2) {
    num1 = num1.join('');
    num2 = num2.join('');
    sumTotal = parseFloat(num1) - parseFloat(num2);
    viewport.textContent = sumTotal;

    // sumTotal = num1.reduce((acc, val) => acc + val) - num2.reduce((acc, val) => acc + val);
    // viewport.textContent = sumTotal;
    // num1 = sumTotal;
}

function multiply(num1, num2) {
    num1 = num1.join('');
    num2 = num2.join('');
    sumTotal = parseFloat(num1) * parseFloat(num2);
    viewport.textContent = sumTotal;

    // sumTotal = num1.reduce((acc, val) => acc + val) * num2.reduce((acc, val) => acc + val);
    // viewport.textContent = sumTotal;
    // num1 = sumTotal;
}

function divide(num1, num2) {
    num1 = num1.join('');
    num2 = num2.join('');
    sumTotal = parseFloat(num1) / parseFloat(num2);
    viewport.textContent = sumTotal;

    // sumTotal = num1.reduce((acc, val) => acc + val) / num2.reduce((acc, val) => acc + val);
    // viewport.textContent = sumTotal;
    // num1 = sumTotal;
}

