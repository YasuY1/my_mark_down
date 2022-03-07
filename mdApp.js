const markdown = document.getElementById('markdown');
const printArea = document.getElementById('printArea');
const previewArea = document.getElementById('previewArea');
const input = document.getElementById('input');

markdown.addEventListener('click',()=>{
    input.focus();
});

input.addEventListener('input',insertPreviewText);
input.addEventListener('keydown',pressEnter);
input.addEventListener('keydown',pressShiftEnter);
input.addEventListener('keydown',pressBackspace);

function insertPreviewText(){
    if(previewArea.firstElementChild.childElementCount === 0){
        previewArea.firstElementChild.textContent = input.value;
    }
    if(previewArea.firstElementChild.childElementCount !== 0){
        input.removeEventListener('input',insertPreviewText,{onece:true});
        input.addEventListener('input',()=>{
            previewArea.firstElementChild.lastChild.textContent = input.value;
        });
    }
}

function pressEnter(e){
    if(!input.value.match(/[^\x01-\x7E]/) && e.key === 'Enter' && e.shiftKey === false){
        printText();
    }//シングルバイト
    if(input.value.match(/[^\x01-\x7E]/) && e.key === 'Enter' && e.shiftKey === false){
        if(e.isComposing){
            previewArea.firstElementChild.removeChild(previewArea.firstElementChild.lastChild);
            previewArea.firstElementChild.insertAdjacentHTML('beforeend',input.value);
        }
        if(e.isComposing === false){
            printText();
        }
    }//マルチバイト
}

function printText(){
    printArea.insertAdjacentHTML('beforeend',previewArea.innerHTML);
    previewArea.firstElementChild.textContent = ' ';
    input.value = '';
}

function pressShiftEnter(e){
    if(!input.value.match(/[^\x01-\x7E]/) && e.key === 'Enter' && e.shiftKey === true){
        previewArea.firstElementChild.insertAdjacentHTML('beforeend','<br>'+' ');
        input.value = '';
    }//シングルバイト
    if(input.value.match(/[^\x01-\x7E]/) && e.key === 'Enter' && e.shiftKey === true){
        if(e.isComposing){
            previewArea.firstElementChild.textContent = input.value;
        }
        if(e.isComposing === false){
            previewArea.firstElementChild.insertAdjacentHTML('beforeend','<br>'+' ');
            input.value = '';
        }
    }//マルチバイト
}

function pressBackspace(e){
    if(printArea.getElementsByTagName("p") === null){
        if(printArea.innerHTML && e.key === 'Backspace'){
            input.value = printArea.lastElementChild.textContent;
            printArea.removeChild(printArea.lastElementChild);
            return false;
        }
    }
    if(printArea.getElementsByTagName("p") !== null){//pの中身を代入
        if(printArea.innerHTML && e.key === 'Backspace'){
            input.value = printArea.lastElementChild.lastChild.textContent;
            printArea.lastElementChild.removeChild(printArea.lastElementChild.lastChild);
            printArea.lastElementChild.removeChild(printArea.lastElementChild.lastChild);
            return false;
        }
    }
}

// if(printArea.getElementsByTagName("p") === null){

// }
// if(printArea.getElementsByTagName("p") !== null){

// }

// if(!input.value.match(/[^\x01-\x7E]/) && e.key === 'Enter' && e.shiftKey === true){

// }
// if(input.value.match(/[^\x01-\x7E]/) && e.key === 'Enter' && e.shiftKey === true){

// }

// if(e.isComposing){

// }
// if(e.isComposing === false){

// }