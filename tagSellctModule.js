'use strict';

export function tagSellector(){
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