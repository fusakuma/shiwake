dl_event((downloadItem)=>{
    let sendmsg={message:"hallow"};
    script_msg(sendmsg,(respons) =>{
        if(respons!=""){
            let dlfile=downloadItem.filename;  
            let appmsg={           
                kamoku:respons,
                name:dlfile
            };
            app_message(appmsg)
        }
    })
});


//（関数）dl_event：ダウンロード完了を検知し、ダウンロードファイルの情報を返す
function dl_event(callback){
    chrome.downloads.onChanged.addListener((downloadDelta) => {
        let nowState = downloadDelta.state;
        if (nowState && nowState.current == 'complete') {
            let dlid =downloadDelta.id;
            chrome.downloads.search({id:dlid},(downloadItem)=>{
                if (!(downloadItem.length > 0)) return;
                callback(downloadItem[0])
            });
        }else{
            return;
        }
    });
}


//（関数）script_msg：現在開いてるページのスクリプトに対し入力されたメッセージを送信しレスポンスを返す
function script_msg(sendmsg,callback){
    chrome.tabs.query( {active:true, currentWindow:true}, (tabs)=>{
        chrome.tabs.sendMessage(tabs[0].id, sendmsg, (respons)=>{
            if(!respons){
                console.log("Noevent");
                callback("");
            }else{   
                callback(respons);
            }
        });
    });
} 


//（関数）app_message：入力をネイティブアプリケーションに送信する
function app_message(appmsg){
    let port = chrome.runtime.connectNative('native_python_filemv');
    port.postMessage(appmsg);
    port.onDisconnect.addListener(function(){                
        if(chrome.runtime.lastError){
          console.log(chrome.runtime.lastError);
        }
    });
}


