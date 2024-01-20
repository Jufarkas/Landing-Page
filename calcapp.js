const numberBtn = document.querySelectorAll('.number');
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const rngBtn = document.getElementById('rng');
const nightBtn = document.getElementById('night');
const mathBtns = document.querySelectorAll('.mathFnc');
const allBtns = document.querySelectorAll('button');
let viewport = document.querySelector('.result');
let smallViewport = document.querySelector('.nextNum')
let currentMathFnc = document.querySelector('.currentMathFnc')
let sumTotal = 0;
let numHolder = [];
let num1 = [];
let num2 = [];

function btnListener() {
    numberBtn.forEach(button => {
        button.addEventListener('click', () => {
            if (num1.length > 0){
                numHolder.push(button.textContent);
                smallViewport.textContent = numHolder.join("");
            } else {
            numHolder.push(button.textContent);
            viewport.textContent = numHolder.join("");
            }
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
                currentMathFnc.textContent = "";
                smallViewport.textContent = "";
            } else if (button.textContent === "Random # (1-100)") {
                numHolder = [];
                num1 = [];
                num2 = [];
                viewport.textContent = Math.floor((Math.random() * 100) + 1);
                currentMathFnc.textContent = "";
                smallViewport.textContent = "";
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
                    currentMathFnc.textContent = "*"
                    num1 = numHolder;
                    numHolder = [];
                } else if (num1.length > 0 && num2.length === 0) {
                    currentMathFnc.textContent = "*"
                    num2 = numHolder;
                    numHolder = [];
                    multiply(num1, num2);
                    num1 = [sumTotal.toString()];
                    num2 = [];
                    // console.log(mathHolder);
                }
            } else if (button.textContent === "/"){
                if (num1.length === 0) {
                    currentMathFnc.textContent = "/"
                    num1 = numHolder;
                    numHolder = [];
                } else if (num1.length > 0 && num2.length === 0) {
                    currentMathFnc.textContent = "/"
                    num2 = numHolder;
                    numHolder = [];
                    divide(num1, num2);
                    num1 = [sumTotal.toString()];
                    num2 = [];
                    // console.log(mathHolder);
                }
            } else if (button.textContent === "+"){
                if (num1.length === 0) {
                    currentMathFnc.textContent = "+"
                    num1 = numHolder;
                    numHolder = [];
                } else if (num1.length > 0 && num2.length === 0) {
                    currentMathFnc.textContent = "+"
                    num2 = numHolder;
                    numHolder = [];
                    add(num1, num2);
                    num1 = [sumTotal.toString()];
                    num2 = [];
                    // console.log(mathHolder);
                }
            } else if (button.textContent === "-"){
                if (num1.length === 0) {
                    currentMathFnc.textContent = "-"
                    num1 = numHolder;
                    numHolder = [];
                } else if (num1.length > 0 && num2.length === 0) {
                    currentMathFnc.textContent = "-"
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


// store the first numbers clicked into numHolder, once you press a math function button:

// num1 = numHolder; (now the first number is stored into num1)
// numHolder = []; (resets numHolder back to empty, and readys it to receive new numbers again)

// user enters more numbers.
// if any math button, or '=' is pressed: 
// *********************************************************************************************************
// (should put something here if the user just starts clicking math functions, ex: they enter 2 and then 
// click +, then -, then *, it should switch between these modes and still remember they clicked 2 as the 
// first number) 
// **********************************************************************************************


// num2 = numHolder; (stores second number into num2 now)

// We would now want to do the first math function and store the result into num1 again

// ex. if user enters 4(-> numHolder) 4(-> numHolder) + (now num1 = numHolder and we empty numHolder = []) 2(-> numHolder) 2(-> numHolder) then * / + - or = (now num2 = numHolder)


// viewport.textContent = num1.reduce((acc, val) => acc + val) + 'SYMBOL' + num2.reduce((acc, val) => acc + val);
// numHolder = [];
//
//



// ex: you enter 1 - 2 - 3 - 4
// numHolder is now ['1', '2', '3', '4']


// numHolder = numHolder.map(Number); // this turns numHolder into numbers
// numHolder is now [1, 2, 3, 4]

// numHolder = numHolder.join("");    // turns it into a single string
// numHolder is now '1234'

// parseInt(numHolder);              // turns string into number
// numHolder is now 1234




// set a counter that watches how many times a button is clicked
// counter = 0
// (if * is pressed), 
// counter = 1
// if (* is pressed && counter === 1)
// totalSum = num1 * num1;
// counter = 1