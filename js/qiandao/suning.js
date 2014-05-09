!function(win, doc, $){

    $(doc).ready(function() {
        // only do it when login
        if (1) { // no way to find
            var today = (new Date()).toDateString();
            var status = localStorage.getItem('suning_status');
            if (! (status && today === status)) {
                $.ajax({
                    type     : "POST",
                    url      : 'http://vip.suning.com/ams-web/world/pointSign.htm?r='+ Math.random(),
                    dataType : 'json',
                    success  : function(data) {
                        // copied from http://vip.suning.com/
                        if (data.errorFlag ==" Y"){
                            return;
                        }

                        console.log(data);

                        if (data.pointGetInfo.pointsQuantity) {
                            localStorage.setItem('suning_status', today);
                            localStorage.setItem('suning_points', data.pointValue.totalPoint);
                            console.log('[qiandao][suning] signIn OK.');
                            console.log(data);
                        }
                    }
                });
            } else {
                console.log('[qiandao][suning] already signIn today.');
            }
        } else {
            console.log('[qiandao][suning] not login yet.');
        }
    });

}(window, document, Zepto);