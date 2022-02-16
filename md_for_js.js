'use strict';

const inputArea = document.getElementById('inputArea');
const previewArea = document.getElementById('previewArea');
const outputArea = document.getElementById('outputArea');

window.addEventListener('load',()=>{
    inputArea.focus();
});

/////
inputArea.addEventListener('keypress',keyDivider);

function keyDivider(e){
    if(inputArea.value === '' && e.key === 'Enter'){
        outputArea.innerHTML += '<br>';
    }
    if(inputArea.value === '' && e.key !== 'Enter'){
        inputArea.addEventListener('input',tagSellector);
    }
}

function tagSellector(){
    if(inputArea.value === 'h1 '){
        createTag('h1')
    }
    if(inputArea.value === 'h2 '){
        createTag('h2')
    }
}

function createTag(str){
    const tag = document.createElement(str);
    previewArea.appendChild(tag);
    inputArea.value = null;
    inputArea.addEventListener('input',insertText);
}

function insertText(){
    previewArea.lastElementChild.textContent = inputArea.value;
    inputArea.addEventListener('keypress',pressEnter);
}



function insertP(){
    const tag = document.createElement('p');
    previewArea.appendChild(tag);
    inputArea.removeEventListener('input',insertP);
    previewArea.firstElementChild.textContent = inputArea.value;
    inputArea.addEventListener('input',insertFirstText);
}


//クラス化
function insertFirstText(){
    const elm = previewArea.firstElementChild;
    elm.textContent = inputArea.value;
    inputArea.addEventListener('keypress',shiftEnterAction);
}

function insertNextText(){
    const elm = previewArea.firstElementChild;
    elm.insertAdjacentText('beforeend',inputArea.value);
    inputArea.value = null;
    inputArea.addEventListener('keypress',shiftEnterAgain);
}

function shiftEnterAction(e){
    if(e.key === 'Enter' && e.shiftKey === true){
        inputArea.removeEventListener('input',insertFirstText);
        inputArea.value = null;
        const elm = previewArea.firstElementChild;
        elm.innerHTML = elm.innerHTML + '<br>';
        inputArea.addEventListener('input',insertNextText);
    }
}

function shiftEnterAgain(e){
    if(e.key === 'Enter' && e.shiftKey === true){
        const elm = previewArea.firstElementChild;
        elm.innerHTML = elm.innerHTML;
        inputArea.addEventListener('input',insertNextText);
    }
}



function pressEnter(e){
    if(e.key === 'Enter' && e.shiftKey === false){
        outputArea.insertAdjacentHTML('beforeend',previewArea.innerHTML);
        while(previewArea.firstElementChild){
            previewArea.removeChild(previewArea.firstChild);
            inputArea.value = null;
        }
    }
}
// 単一行のエラー処理
