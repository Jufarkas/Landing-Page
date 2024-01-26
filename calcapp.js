const numberBtn = document.querySelectorAll('.number');
const mathBtns = document.querySelectorAll('.mathFnc');
const allBtns = document.querySelectorAll('button');
let viewport = document.querySelector('.result');
viewport.style.fontSize = "100px";
viewport.style.overflow = "hidden";
let smallViewport = document.querySelector('.nextNum');
let mathViewport = document.querySelector('.currentMathFnc');
let sumTotal = 0;
let numHolder = [];
let mathFncHolder = "";
let num1 = [];
let num2 = [];
let equalsHolder = [];
let percentTrue = false;

// keyboard listener
document.addEventListener('keydown', (e) => {
    if(e.repeat){
        return;
    };
    switch (e.key) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
        case ".":
            checkOverflow();
            if (e.key === "."){
                if (numHolder.includes(".")){
                    return;
                }
            };
            if (percentTrue === true){
                if (document.activeElement.nodeName == 'TEXTAREA'
                || document.activeElement.nodeName == 'INPUT'
                || (document.activeElement.nodeName == 'DIV'
                && document.activeElement.isContentEditable)) {
                    document.activeElement.textContent = (e.key);
                }
            } else if (num1.toString() === (Math.round(sumTotal * 10000000)/10000000).toString() && equalsHolder.length > 0){
                numHolder.push(e.key);
                viewport.textContent = numHolder.join("");
                num1 = [];
                mathFncHolder = "";
                equalsHolder = [];
            } else if (num1.length > 0){
                numHolder.push(e.key);
                smallViewport.textContent = numHolder.join("");
            } else {
            numHolder.push(e.key);
            viewport.textContent = numHolder.join("");
            };
            break;
        case "Enter":
            equalsEnter ();
        break;
        case "*":
            multiply();
            break;
        case "+":
            addition();
        break;
        case "-":
            subtraction();
        break;
        case "/":
            e.preventDefault;
            divide();
        break;
        case "Backspace":
            checkOverflow();
                if (percentTrue === true){
                    return;
                } else if (percentTrue === false){
                numHolder.pop();
                viewport.textContent = numHolder.join("");
                    if (numHolder.length === 0 && num1.length === 0){
                    viewport.textContent = 0;
                    } else if (num1.length >= 1){
                    viewport.textContent = num1.join("");
                    smallViewport.textContent = numHolder.join("");
                    };
                };
            break;
        default:
          return;
    }
})

// html/calc button listeners
function btnListener() {
    numberBtn.forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent === "."){
                if (numHolder.includes(".")){
                    return;
                }
            };
            if (percentTrue === true){
                return;
            } else if (num1.toString() === (Math.round(sumTotal * 10000000)/10000000).toString() && equalsHolder.length > 0){
                numHolder.push(button.textContent);
                viewport.textContent = numHolder.join("");
                num1 = [];
                mathFncHolder = "";
                equalsHolder = [];
            } else if (num1.length > 0){
                numHolder.push(button.textContent);
                smallViewport.textContent = numHolder.join("");
            } else {
            numHolder.push(button.textContent);
            viewport.textContent = numHolder.join("");
            };
        checkOverflow();
        });
    });
    allBtns.forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent === "%"){
                percentListener();
                let percent1 = document.querySelector('.percent1');
                let percent2 = document.querySelector('.percent2');
                let pText2 = document.querySelector('.pText2')
                percent1.addEventListener('input', () => {
                    pText2.textContent = 
                    "= " + Math.round(((percent1.value / 100) * percent2.value) * 1000)/1000;
                });
                percent2.addEventListener('input', () => {
                    pText2.textContent = 
                    "= " + Math.round(((percent1.value / 100) * percent2.value) * 1000)/1000;
                });
            } else if (button.textContent === "="){
                equalsEnter ();
            } else if (button.textContent === "DEL") {
                checkOverflow();
                if (percentTrue === true){
                    return;
                } else if (percentTrue === false){
                numHolder.pop();
                viewport.textContent = numHolder.join("");
                    if (numHolder.length === 0 && num1.length === 0){
                    viewport.textContent = 0;
                    } else if (num1.length >= 1){
                    viewport.textContent = num1.join("");
                    smallViewport.textContent = numHolder.join("");
                    }
                    if (numHolder.length === 0 && equalsHolder.length > 0){
                        viewport.style.fontSize = "105px";
                        percentTrue = false;
                        numHolder = [];
                        num1 = [];
                        num2 = [];
                        equalsHolder = [];
                        viewport.textContent = 0;
                        mathViewport.textContent = "";
                        smallViewport.textContent = "";
                        mathFncHolder = "";   
                    };
                };
            } else if (button.textContent === "CLEAR") {
                viewport.style.fontSize = "100px";
                percentTrue = false;
                numHolder = [];
                num1 = [];
                num2 = [];
                equalsHolder = [];
                viewport.textContent = 0;
                mathViewport.textContent = "";
                smallViewport.textContent = "";
                mathFncHolder = "";
            } else if (button.textContent === "#RNG (1-100)") {
                percentTrue = false;
                numHolder = [];
                num1 = [];
                num2 = [];
                viewport.textContent = Math.floor((Math.random() * 100) + 1);
                mathViewport.textContent = "";
                smallViewport.textContent = "";
            };
        });
    });
};


btnListener();
mathFncWatcher();

// Watches the math operator buttons
function mathFncWatcher() {
    mathBtns.forEach(button => {
        button.addEventListener('click', () => {
            if (mathFncHolder.length > 0 && button.textContent != "="){
                mathViewport.textContent = button.textContent;
            }
            if (button.textContent === "*"){
                multiply();
            } else if (button.textContent === "/"){
                divide();
            } else if (button.textContent === "+"){
                addition();
            } else if (button.textContent === "-"){
                subtraction();
            }
        })
    })
}

// Execute current math equation

function timeToMath(num1, num2, mathFncHolder) {
    num1 = num1.join('');
    num2 = num2.join('');
    if (mathFncHolder === "*") {
        sumTotal = parseFloat(num1) * parseFloat(num2);
        // maxed out at the 7th decimal place
        viewport.textContent = Math.round(sumTotal * 10000000)/10000000;
        sumTotal = viewport.textContent;
        // CLEAR top corner info
        mathViewport.textContent = "";
        smallViewport.textContent = "";
    } else if (mathFncHolder === "/") {
        sumTotal = parseFloat(num1) / parseFloat(num2);
        // maxed out at the 7th decimal place
        viewport.textContent = Math.round(sumTotal * 10000000)/10000000;
        sumTotal = viewport.textContent;
        // CLEAR top corner info
        mathViewport.textContent = "";
        smallViewport.textContent = "";
    } else if (mathFncHolder === "+") {
        sumTotal = parseFloat(num1) + parseFloat(num2);
        // maxed out at the 7th decimal place
        viewport.textContent = Math.round(sumTotal * 10000000)/10000000;
        sumTotal = viewport.textContent;
        // CLEAR top corner info
        mathViewport.textContent = "";
        smallViewport.textContent = "";
    } else if (mathFncHolder === "-") {
        sumTotal = parseFloat(num1) - parseFloat(num2);
        // maxed out at the 7th decimal place
        viewport.textContent = Math.round(sumTotal * 10000000)/10000000;
        sumTotal = viewport.textContent;
        // CLEAR top corner info
        mathViewport.textContent = "";
        smallViewport.textContent = "";
    }
};


// Function to execute current equation if another operator is pressed
// ex: user inputs "4 + 5 [another operator]"
// on the selection of the second [operator] the original equation will execute, return the result, and then ready that result to be used with the new operator and further number entry

function operatorWatch(num1, numHolder, mathFncHolder) {
    num1 = num1.join('');
    num2 = numHolder.join('');
    if (mathFncHolder === "*") {
        // CLEAR out numHolder for future entry, calc the total and round it, set num1 to the sum so it's used again for the next calculation, && CLEAR num2 to ready for input again
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


function percentListener() {
    // if it's already on, do nothing if pressed
    if (percentTrue === true){
        return;
    // turn on Percent displayer
    } else {
        // CLEAR all fields in case there's previous calculations present
        numHolder = [];
        num1 = [];
        num2 = [];
        equalsHolder = [];
        mathViewport.textContent = "";
        smallViewport.textContent = "";
        percentTrue = true;
        viewport.textContent = "";
        // create new elements to hold user input, add classes and append to '.result'
        let input1 = document.createElement('input');
        let input2 = document.createElement('input');
        let pText = document.createElement('p');
        let pText2 = document.createElement('p');
        // input2.type = "tel" so that on mobile only the numbers are displayed;
        input1.type = "tel";
        input1.maxLength = "4"; // limiting to 4 to avoid overflow (and let's be honest, who needs to know what > %10,000 of something is with my little calculator?)
        input1.classList.add("percent1");
        // input2.type = "tel" so that on mobile only the numbers are displayed;
        input2.type = "tel";
        input2.maxLength = "4"; // limiting to avoid overflow while still allowing someone to find out what %9999= of 9999 is, if they must know
        input2.classList.add("percent2");
        pText.classList.add("pText");
        pText2.classList.add("pText2");
        viewport.appendChild(input1);
        viewport.appendChild(pText);
        pText.textContent = "% of"
        viewport.appendChild(input2);
        viewport.appendChild(pText2);
        pText2.textContent = "= 0";
        viewport.appendChild(document.createElement("br"));
    }
};


//checks for text overflow (in my questionable way of doing it) and changes based on input
// scattered the function throughout button presses to keep watch for changes

function checkOverflow(){
    if (viewport.textContent.length < 7){
        viewport.style.fontSize = "100px";

    } else if (viewport.textContent.length > 7){
        viewport.style.fontSize = "80px";
    }
    
    if (viewport.textContent.length > 9){
        viewport.style.fontSize = "65px";
    }

    if (viewport.textContent.length > 11){
            viewport.style.fontSize = "54px";
    }

    if (viewport.textContent.length > 13){
        viewport.style.fontSize = "48px";
    }
    
    if (viewport.textContent.length > 15){
        viewport.style.fontSize = "42px";
    }

    if (viewport.textContent.length > 18){
            viewport.style.fontSize = "35px";
    }
};

checkOverflow();


function equalsEnter () {
    if (numHolder.join('') === '0' && mathFncHolder === "/"){
    // cheeky little message if trying to divide by zero
        viewport.textContent = "Nice try..";
    } else if (numHolder.length >= 1 && num1.length >= 1) {
        num2 = numHolder;
        equalsHolder = numHolder;
        numHolder = [];
        timeToMath(num1, num2, mathFncHolder);
        checkOverflow();
        num1 = [(Math.round(sumTotal * 10000000)/10000000).toString()];
        num2 = [];
    } else if (num1.length === 1 && numHolder.length === 0 && mathFncHolder.length === 1){
        num1 = num1.join('');
        equalsHolder = equalsHolder.join('');
        if (mathFncHolder === "*") {
            sumTotal = parseFloat(num1) * parseFloat(equalsHolder);
            viewport.textContent = Math.round(sumTotal * 10000000)/10000000;
            sumTotal = viewport.textContent;
            checkOverflow();
            num1 = [sumTotal.toString()];
            equalsHolder = [equalsHolder];
        } else if (mathFncHolder === "/") {
            sumTotal = parseFloat(num1) / parseFloat(equalsHolder);
            viewport.textContent = Math.round(sumTotal * 10000000)/10000000;
            sumTotal = viewport.textContent;
            checkOverflow();
            num1 = [sumTotal.toString()];
            equalsHolder = [equalsHolder];
        } else if (mathFncHolder === "+") {
            sumTotal = parseFloat(num1) + parseFloat(equalsHolder);
            viewport.textContent = Math.round(sumTotal * 10000000)/10000000;
            sumTotal = viewport.textContent;
            checkOverflow();
            num1 = [sumTotal.toString()];
            equalsHolder = [equalsHolder];
        } else if (mathFncHolder === "-") {
            sumTotal = parseFloat(num1) - parseFloat(equalsHolder);
            viewport.textContent = Math.round(sumTotal * 10000000)/10000000;
            checkOverflow();
            num1 = [sumTotal.toString()];
            equalsHolder = [equalsHolder];
        };
    };
};

function addition() {
    if (numHolder.length === 0 && num1.length >= 1) {
        mathFncHolder = "+";
        mathViewport.textContent = "+"
        equalsHolder = [];
    } else if (numHolder.length > 0 && num1.length > 0 && mathFncHolder.length === 1){
        operatorWatch(num1, numHolder, mathFncHolder);
        checkOverflow();
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
    };
};

function subtraction() {
    if (numHolder.length === 0 && num1.length >= 1) {
        mathFncHolder = "-";
        mathViewport.textContent = "-"
        equalsHolder = [];
    } else if (numHolder.length > 0 && num1.length > 0 && mathFncHolder.length === 1){
        operatorWatch(num1, numHolder, mathFncHolder);
        checkOverflow();
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
    };    
};

function multiply() {
    if (numHolder.length === 0 && num1.length >= 1) {
        mathFncHolder = "*";
        mathViewport.textContent = "*";
        equalsHolder = [];
    } else if (numHolder.length > 0 && num1.length > 0 && mathFncHolder.length === 1){
        operatorWatch(num1, numHolder, mathFncHolder);
        checkOverflow();
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
    };
};

function divide() {
    if (numHolder.length === 0 && num1.length >= 1) {
        mathFncHolder = "/";
        mathViewport.textContent = "/";
        equalsHolder = [];
    } else if (numHolder.length > 0 && num1.length > 0 && mathFncHolder.length === 1){
        operatorWatch(num1, numHolder, mathFncHolder);
        checkOverflow();
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
    };    
};