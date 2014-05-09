!function(win, doc, $){

    $(doc).ready(function() {
        // only do it when login
        if (1) { // no way to find expect another request with https://passport.yhd.com/publicPassport/isLogin.do
            var today = (new Date()).toDateString();
            var status = localStorage.getItem('yhd_status');
            if (! (status && today === status)) {
                $.ajax({
                    type     : "POST",
                    url      : "http://vip.yhd.com/point.html",
                    dataType : "text/xml",
                    success  : function(data) {
                        // "code":1,"data":5,"message":""
                        // {"code":0,"data":"300100000003","message":"user today already sign point"}
                        if (data.indexOf('"code"') > -1) {
                            localStorage.setItem('yhd_status', today);
                            console.log('[qiandao][yhd] signIn OK.');
                            console.log(data);
                        }
                    }
                });
            } else {
                console.log('[qiandao][yhd] already signIn today.');
            }
        } else {
            console.log('[qiandao][yhd] not login yet.');
        }
    });

}(window, document, Zepto);