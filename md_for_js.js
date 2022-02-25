'use strict';

const inputArea = document.getElementById('inputArea');
const previewArea = document.getElementById('previewArea');
const outputArea = document.getElementById('outputArea');

window.addEventListener('load',()=>{
    inputArea.focus();
});

inputArea.addEventListener('keypress',keyDivider,{once:true});

function keyDivider(e){
    if(inputArea.value === '' && e.key === 'Enter'){
        outputArea.innerHTML += '<br>';
        inputArea.addEventListener('keypress',keyDivider,{once:true});
    }
    if(inputArea.value === '' && e.key !== 'Enter'){
        inputArea.addEventListener('input',tagSellector);
    }
}

function tagSellector(){
        switch(inputArea.value){
            case 'h1 ':
                createTag('h1');
                break;
            case 'h2 ':
                createTag('h2');
                break;
            case 'h3 ':
                createTag('h3');
                break;
            default:
                if(!previewArea.hasChildNodes()){
                    createP();
                }
                break;
        }
    }


function createTag(str){
    const tag = document.createElement(str);
    previewArea.appendChild(tag);
    inputArea.value = '';
    previewArea.removeChild(previewArea.firstElementChild);
    inputArea.addEventListener('input',insertText);
}

function createP(){
    const p = document.createElement('p');
    previewArea.appendChild(p);
    p.textContent = inputArea.value;
    inputArea.addEventListener('input',insertText);
}


function createNextContainer(){
    const elm = previewArea.lastElementChild;
    elm.insertAdjacentText('beforeend','');
    inputArea.addEventListener('input',insertNextText);
}


function insertText(){
    previewArea.lastElementChild.textContent = inputArea.value;
    inputArea.addEventListener('keypress',pressEnter,{once:true});
}

function insertNextText(){
    const elm = previewArea.lastElementChild;
    elm.lastChild.textContent = inputArea.value;
    inputArea.addEventListener('keypress',pressEnter,{once:true});
}


function pressEnter(e){
    if(e.key === 'Enter' && e.shiftKey === false){
        outputArea.insertAdjacentHTML('beforeend',previewArea.innerHTML);
        previewArea.innerHTML = '';
        inputArea.value = '';
        inputArea.addEventListener('keypress',keyDivider,{once:true});
    }
    if(e.key === 'Enter' && e.shiftKey === true){
        inputArea.value = '';
        previewArea.firstElementChild.insertAdjacentHTML('beforeend','<br>');
        inputArea.removeEventListener('input',insertText);//insertTextのリムーブ
        inputArea.addEventListener('input',createNextContainer,{once:true});
    }
}

