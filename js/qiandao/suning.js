!function(win, doc, $){

    $(doc).ready(function() {
        // only do it when login
        if (1) { // no way to find
            chrome.runtime.sendMessage({method: "getLocalStorage", key: "suning_status"}, function(res) {
                var status = res.data;
                var today = (new Date()).toDateString();
                if (! (status && today === status)) {
                    $.ajax({
                        type     : "POST",
                        url      : 'http://vip.suning.com/ams-web/world/pointSign.htm?r=' + Math.random(),
                        dataType : 'json',
                        success  : function(data) {
                            // copied from http://vip.suning.com/
                            if (data.errorFlag ==" Y"){
                                return;
                            }

                            if (data.pointGetInfo.pointsQuantity) {
                                chrome.runtime.sendMessage({
                                    method: "setLocalStorage", key: "suning_status", val: today
                                }, function(res) {});
                                chrome.runtime.sendMessage({
                                    method: "setLocalStorage", key: "suning_points", val: data.pointValue.totalPoint
                                }, function(res) {});
                                console.log('[qiandao][suning] signIn OK.');
                                // console.log(data);
                            }
                        }
                    });
                } else {
                    console.log('[qiandao][suning] already signIn today.');
                }
            });
        } else {
            console.log('[qiandao][suning] not login yet.');
        }
    });

}(window, document, Zepto);