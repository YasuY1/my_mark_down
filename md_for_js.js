'use strict';
// import {tagSellector} from "./tagSellctModule.js";
// ＊＊切り出しは後ほど＊＊

// イベントエリアの定義
const input = document.getElementById('input');
const preview = document.getElementById('preview');
const outputArea = document.getElementById('outputArea');

// 最初のアクションの中身 (ユーザがクリックをしたのかバックスペースを押したのか？)
document.addEventListener('click',()=>{
    input.focus();
    input.addEventListener('keydown',keyDivider,{once:true});
},{once:true});
document.addEventListener('keydown',(e)=>{
    if(e.key === 'Backspace' && input.value === '' && outputArea.innerHTML !== ''){
        pressBackspace();
    }
});

// エンターなら改行。それ以外ではコマンド入力
function keyDivider(e){
    if(input.value === '' && e.key === 'Enter'){
        outputArea.innerHTML += '<br>';
        input.addEventListener('keypress',keyDivider,{once:true});
    }
    if(input.value === '' && e.key !== 'Enter'){
        input.addEventListener('input',tagSellector);
    }
}

// 実際のコマンド入力
function tagSellector(){
    switch(input.value){
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
            directInsert();
            break;
    }
}


function createTag(str){
    const tag = document.createElement(str);
    preview.appendChild(tag);
    input.value = '';
    preview.removeChild(preview.firstElementChild);
    input.addEventListener('input',insertText);
}

function directInsert(){
    input.addEventListener('input',insertText);
}

function createNextContainer(){
    const elm = preview.lastElementChild;
    elm.insertAdjacentText('beforeend','');
    input.addEventListener('input',insertNextText);
}

function insertText(){
    preview.lastElementChild.textContent = input.value;
    input.addEventListener('keypress',pressEnter,{once:true});
}

function insertNextText(){
    const elm = preview.lastElementChild;
    elm.lastChild.textContent = input.value;
    input.addEventListener('keypress',pressEnter,{once:true});
}

// テキスト入力後のエンターキーの挙動
function pressEnter(e){
    if(e.key === 'Enter' && e.shiftKey === false){
        outputArea.insertAdjacentHTML('beforeend',preview.innerHTML);
        preview.innerHTML = '<p></p>';
        input.value = '';
        input.addEventListener('keypress',keyDivider,{once:true});
    }
    if(e.key === 'Enter' && e.shiftKey === true){
        input.value = '';
        preview.firstElementChild.insertAdjacentHTML('beforeend','<br>');
        input.removeEventListener('input',insertText);
        input.addEventListener('input',createNextContainer,{once:true});
    }
}

// バックスペースキーの挙動
function pressBackspace(){
    if(outputArea.childElementCount === 0){
        return false;
    }
    input.value = outputArea.lastElementChild.textContent;
    outputArea.removeChild(outputArea.lastElementChild);
}

// 見出しタグ入力時、shift + ↑ or ↓ 見出しの入れ替え
