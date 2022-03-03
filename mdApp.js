const markdown = document.getElementById('markdown');
const printAria = document.getElementById('printArea');
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
    if(e.key === 'Enter' && e.shiftKey === false){
        printAria.insertAdjacentHTML('beforeend',previewArea.innerHTML);
        previewArea.firstElementChild.textContent = '';
        input.value = '';
    }
}

function pressShiftEnter(e){
    if(e.key === 'Enter' && e.shiftKey === true){
        previewArea.firstElementChild.insertAdjacentHTML('beforeend','<br>'+'.');
        input.value = '';
    }
}

function pressBackspace(){

}