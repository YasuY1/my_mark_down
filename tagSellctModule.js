'use strict';

export const tagSellector = function(){
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