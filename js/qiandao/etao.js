!function(win, doc, $){
    $(doc).ready(function() {
        chrome.runtime.sendMessage({method: "getLocalStorage", key: "etao_status"}, function(res) {
            var status = res.data;
            var today = (new Date()).toDateString();
            if (! (status && today === status)) {
                var html = doc.documentElement.innerHTML;
                var m1 = html.match(/wk_tk=(\w+)/);
                if (m1) {
                    var wk_tk = m1[1];
                    var timestamp = (new Date()).getTime();
                    $.ajax({
                        type     : "POST",
                        url      : 'http://wanke.etao.com/api/ajax.php?siteid=54&mdList=site_check_in&format=json&wk_tk=' + wk_tk,
                        dataType : 'json',
                        success  : function(data) {
                            // {"status":"1","resultList":{"site_check_in":{"data":{"status":1,"msg":"\u7b7e\u5230\u6210\u529f\uff01","reward":{"exp":{"code":1,"value":1},"score":{"code":1,"value":1},"site_id":"54","site_name":"\u6d77\u6dd8\u5927\u6742\u9662","is_join":1,"days_counter":1,"exp_follow_site":0,"rank":{"code":2,"value":"\u6d77\u6dd8\u5e7c\u513f\u56ed","changed":1,"exp":"11","next_exp":"51"}}}}}}
                            // alert(JSON.stringify(data));
                            if (data.status == '1') {
                                chrome.runtime.sendMessage({
                                    method: "setLocalStorage", key: "etao_status", val: today
                                }, function(res) {});
                                chrome.runtime.sendMessage({
                                    method: "setLocalStorage", key: "etao_points", val: data.resultList.site_check_in.data.reward.rank.exp
                                }, function(res) {});
                            }
                        }
                    });
                }
            } else {
                console.log('[qiandao][etao] already signIn today.');
            }
        });
    });
}(window, document, Zepto);