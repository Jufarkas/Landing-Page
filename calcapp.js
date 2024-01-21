const numberBtn = document.querySelectorAll('.number');
const mathBtns = document.querySelectorAll('.mathFnc');
const allBtns = document.querySelectorAll('button');
let viewport = document.querySelector('.result');
let smallViewport = document.querySelector('.nextNum')
let mathViewport = document.querySelector('.currentMathFnc')
let sumTotal = 0;
let numHolder = [];
let mathFncHolder = "";
let num1 = [];
let num2 = [];
let equalsHolder = [];
let percentTrue = false;

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
            if (button.textContent === "%"){
                percentListener();
            } else if (button.textContent === "="){
                if (numHolder.join('') === '0' && mathFncHolder === "/"){
                    viewport.textContent = "How dare you..";
                } else if (numHolder.length >= 1 && num1.length >= 1) {
                    num2 = numHolder;
                    equalsHolder = numHolder;
                    numHolder = [];
                    timeToMath(num1, num2, mathFncHolder);
                    num1 = [sumTotal.toString()];
                    num2 = [];
                } else if (num1.length === 1 && numHolder.length === 0 && mathFncHolder.length === 1){
                    num1 = num1.join('');
                    equalsHolder = equalsHolder.join('');
                    if (mathFncHolder === "*") {
                        sumTotal = parseFloat(num1) * parseFloat(equalsHolder);
                        viewport.textContent = Math.round(sumTotal * 10000000)/10000000;
                        num1 = [sumTotal.toString()];
                        equalsHolder = [equalsHolder];
                    } else if (mathFncHolder === "/") {
                        sumTotal = parseFloat(num1) / parseFloat(equalsHolder);
                        viewport.textContent = Math.round(sumTotal * 10000000)/10000000;
                        num1 = [sumTotal.toString()];
                        equalsHolder = [equalsHolder];
                    } else if (mathFncHolder === "+") {
                        sumTotal = parseFloat(num1) + parseFloat(equalsHolder);
                        viewport.textContent = Math.round(sumTotal * 10000000)/10000000;
                        num1 = [sumTotal.toString()];
                        equalsHolder = [equalsHolder];
                    } else if (mathFncHolder === "-") {
                        sumTotal = parseFloat(num1) - parseFloat(equalsHolder);
                        viewport.textContent = Math.round(sumTotal * 10000000)/10000000;
                        num1 = [sumTotal.toString()];
                        equalsHolder = [equalsHolder];
                    }
                }
            } else if (button.textContent === "Del") {
                numHolder.pop();
                viewport.textContent = numHolder.join("");
                if (numHolder.length === 0 && num1.length === 0){
                    viewport.textContent = 0;
                } else if (num1.length >= 1){
                    viewport.textContent = num1.join("");
                    smallViewport.textContent = numHolder.join("");
                }
            } else if (button.textContent === "Clear") {
                numHolder = [];
                num1 = [];
                num2 = [];
                equalsHolder = [];
                viewport.textContent = 0;
                mathViewport.textContent = "";
                smallViewport.textContent = "";
                mathFncHolder = "";
            } else if (button.textContent === "Random # (1-100)") {
                numHolder = [];
                num1 = [];
                num2 = [];
                viewport.textContent = Math.floor((Math.random() * 100) + 1);
                mathViewport.textContent = "";
                smallViewport.textContent = "";
            };
        })
    })
};


btnListener();
mathFncWatcher();


function mathFncWatcher() {
    mathBtns.forEach(button => {
        button.addEventListener('click', () => {
            if (mathFncHolder.length > 0 && button.textContent != "="){
                mathViewport.textContent = button.textContent;
            }
            if (button.textContent === "*"){
                if (numHolder.length === 0 && num1.length >= 1) {
                    mathFncHolder = "*";
                    mathViewport.textContent = "*";
                } else if (numHolder.length > 0 && num1.length > 0 && mathFncHolder.length === 1){
                    comboMath(num1, numHolder, mathFncHolder);
                    numHolder = [];
                    num1 = [sumTotal.toString()];
                    mathFncHolder = "*";
                    mathViewport.textContent = "*";
                } else if (numHolder.length > 0 && num1.length > 0){
                    mathFncHolder = "*";
                    mathViewport.textContent = "*";
                } else if (num1.length === 0){
                    mathFncHolder = "*";
                    mathViewport.textContent = "*"
                    num1 = numHolder;
                    numHolder = [];  
                }
            } else if (button.textContent === "/"){
                if (numHolder.length === 0 && num1.length >= 1) {
                    mathFncHolder = "/";
                    mathViewport.textContent = "/";
                } else if (numHolder.length > 0 && num1.length > 0 && mathFncHolder.length === 1){
                    comboMath(num1, numHolder, mathFncHolder);
                    numHolder = [];
                    num1 = [sumTotal.toString()];
                    mathFncHolder = "/";
                    mathViewport.textContent = "/"
                } else if (numHolder.length > 0 && num1.length > 0){
                    mathFncHolder = "/";
                    mathViewport.textContent = "/"
                } else if (num1.length === 0){
                    mathFncHolder = "/";
                    mathViewport.textContent = "/"
                    num1 = numHolder;
                    numHolder = [];  
                }
            } else if (button.textContent === "+"){
                if (numHolder.length === 0 && num1.length >= 1) {
                    mathFncHolder = "+";
                    mathViewport.textContent = "+"
                } else if (numHolder.length > 0 && num1.length > 0 && mathFncHolder.length === 1){
                    comboMath(num1, numHolder, mathFncHolder);
                    numHolder = [];
                    num1 = [sumTotal.toString()];
                    mathFncHolder = "+";
                    mathViewport.textContent = "+"
                } else if (numHolder.length > 0 && num1.length > 0){
                    mathFncHolder = "+";
                    mathViewport.textContent = "+"
                } else if (num1.length === 0) {
                    mathFncHolder = "+";
                    mathViewport.textContent = "+"
                    num1 = numHolder;
                    numHolder = [];
                }
            } else if (button.textContent === "-"){
                if (numHolder.length === 0 && num1.length >= 1) {
                    mathFncHolder = "-";
                    mathViewport.textContent = "-"
                } else if (numHolder.length > 0 && num1.length > 0 && mathFncHolder.length === 1){
                    comboMath(num1, numHolder, mathFncHolder);
                    numHolder = [];
                    num1 = [sumTotal.toString()];
                    mathFncHolder = "-";
                    mathViewport.textContent = "-"
                } else if (numHolder.length > 0 && num1.length > 0){
                    mathFncHolder = "-";
                    mathViewport.textContent = "-"
                } else if (num1.length === 0){
                    mathFncHolder = "-";
                    mathViewport.textContent = "-"
                    num1 = numHolder;
                    numHolder = [];
                }
            }
        })
    })
}


function timeToMath(num1, num2, mathFncHolder) {
    num1 = num1.join('');
    num2 = num2.join('');
    if (mathFncHolder === "*") {
        sumTotal = parseFloat(num1) * parseFloat(num2);
        viewport.textContent = Math.round(sumTotal * 10000000)/10000000;
        mathViewport.textContent = "";
        smallViewport.textContent = "";
    } else if (mathFncHolder === "/") {
        sumTotal = parseFloat(num1) / parseFloat(num2);
        viewport.textContent = Math.round(sumTotal * 10000000)/10000000;
        mathViewport.textContent = "";
        smallViewport.textContent = "";
    } else if (mathFncHolder === "+") {
        sumTotal = parseFloat(num1) + parseFloat(num2);
        viewport.textContent = Math.round(sumTotal * 10000000)/10000000;
        mathViewport.textContent = "";
        smallViewport.textContent = "";
    } else if (mathFncHolder === "-") {
        sumTotal = parseFloat(num1) - parseFloat(num2);
        viewport.textContent = Math.round(sumTotal * 10000000)/10000000;
        mathViewport.textContent = "";
        smallViewport.textContent = "";
    }
};


function comboMath(num1, numHolder, mathFncHolder) {
    num1 = num1.join('');
    num2 = numHolder.join('');
    if (mathFncHolder === "*") {
        numHolder = [];
        sumTotal = parseFloat(num1) * parseFloat(num2);
        viewport.textContent = Math.round(sumTotal * 10000000)/10000000;
        smallViewport.textContent = numHolder;
        num1 = [sumTotal.toString()];
        num2 = []; 
    } else if (mathFncHolder === "/") {
        numHolder = [];
        sumTotal = parseFloat(num1) / parseFloat(num2);
        viewport.textContent = Math.round(sumTotal * 10000000)/10000000;
        smallViewport.textContent = numHolder;
        num1 = [sumTotal.toString()];
        num2 = []; 
    } else if (mathFncHolder === "+") {
        numHolder = [];
        sumTotal = parseFloat(num1) + parseFloat(num2);
        viewport.textContent = Math.round(sumTotal * 10000000)/10000000;
        smallViewport.textContent = numHolder;
        num1 = [sumTotal.toString()];
        num2 = [];        
    } else if (mathFncHolder === "-") {
        numHolder = [];
        sumTotal = parseFloat(num1) - parseFloat(num2);
        viewport.textContent = Math.round(sumTotal * 10000000)/10000000;
        smallViewport.textContent = numHolder;
        num1 = [sumTotal.toString()];
        num2 = [];        
    }
}




// Percent mode (replace Night Mode button)
//
// when clicked, changes viewport to 2 input fields separated by "percent of"
//
// ['x'] percent of ['y'] = ['z'] 
//


function percentListener() {
    if (percentTrue === true){
        return;
    } else {
        percentTrue = true;
        viewport.textContent = "";
        let input1 = document.createElement('input');
        let input2 = document.createElement('input');
        let pText = document.createElement('p');
        input1.type = "integer";
        input1.maxLength = "7";
        input1.classList.add("percent");
        input2.type = "integer";
        input2.maxLength = "7";
        input2.classList.add("percent");
        pText.classList.add("pText");
        viewport.appendChild(input1);
        viewport.appendChild(pText);
        pText.textContent = "% of"
        viewport.appendChild(input2);
        viewport.appendChild(document.createElement("br"));
    }
}