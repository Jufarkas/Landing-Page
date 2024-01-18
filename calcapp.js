const numberBtn = document.querySelectorAll('.number');
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const rngBtn = document.getElementById('rng');
const nightBtn = document.getElementById('night');
const mathBtns = document.querySelectorAll('.mathFnc');



function btnListener() {
    let viewport = document.querySelector('.result');
    let sumTotal = 0;
    let mathBtn;
    numberBtn.forEach(button => {
        button.addEventListener('click', () => {
            viewport.textContent = button.textContent;
        })
    })
    mathBtns.forEach(button => {
        button.addEventListener('click', () => {
            mathBtn = button.textContent;
            alert (mathBtn);
        })
    })
};


btnListener();

