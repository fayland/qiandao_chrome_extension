!function(win, doc, $){
    $(doc).ready(function() {

        chrome.runtime.sendMessage({method: "getLocalStorage", key: "iqiyi_status"}, function(res) {
            var status = res.data;
            var today = (new Date()).toDateString();
            if (! (status && today === status)) {
                // check if logined
                if (doc.cookie.match(/nickname/)) {
                    $.ajax({
                        type     : "GET",
                        url      : 'http://api.credit.iqiyi.com/services/user/event?cb=varName_userEventData&cid=0&eventid=sign_up&pid=0&type=click',
                        dataType : 'html',
                        success  : function(text) {
                            // var varName_userEventData = {"code":"A00000","data":{"creditHit":2,"ratio":1.0,"creditAdd":2,"continous":1,"lastTime":"2014-06-04 15:38:49","totalCredit":269}}
                            text = text.replace(/var varName_userEventData = /, "");
                            var data = JSON.parse(text);
                            if (data.code == 'A00000') {
                                chrome.runtime.sendMessage({
                                    method: "setLocalStorage", key: "iqiyi_status", val: today
                                }, function(res) {});
                                chrome.runtime.sendMessage({
                                    method: "setLocalStorage", key: "iqiyi_points", val: data.data.totalCredit
                                }, function(res) {});
                            }
                        }
                    });
                }
            } else {
                console.log('[qiandao][iqiyi] already signIn today.');
            }
        });
    });
}(window, document, Zepto);
