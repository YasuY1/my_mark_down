const input = document.getElementById('input');
const preview = document.getElementById('preview');
const outputArea = document.getElementById('outputArea');

/*
*/
document.addEventListener('click',()=>{
    if(preview.innerHTML === '<p></p>'){//0.タグがpタグかどうか -> (6)
        document.addEventListener('keypress',insertText);
    }
});

//1.キーダウンで入力->プレビューの<p></p> -> (5)
function insertText(e){
    preview.firstElementChild.textContent += e.key;
}
//2.コマンドをサーチ：<コマンド> + スペース
//3.タグの入れ替え switch
//4.EnterでprintAreaにHTML入力
//(5)shift + Enter で <br>挿入 次のテキストへ移る OKなら -> 4
//backspaceで文字を消す
//クリックした場所の要素を取り出す
//(6)pタグのみの挙動

// 結論！マルチバイト文字の対応ができないのでNG