chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    let selection;
// 
// ウェブサイトからファイル仕分けキーとなる要素を取得します
// 変数selectionにその情報が入ります
//
    sendResponse(selection);
  });