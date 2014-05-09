!function(win, doc, $){

    $(doc).ready(function() {
        // only do it when login
        if ($('.user-logged').length) {
            var today = (new Date()).toDateString();
            var status = localStorage.getItem('dianping_status');
            if (! (status && today === status)) {
                $.getJSON('http://www.dianping.com/ajax/member/signIn/signIn', function(data) {
                    if (data.signInResult) {
                        localStorage.setItem('dianping_status', today);
                        console.log('[qiandao][dianping] signIn OK.');
                    } else {
                        console.log('[qiandao][dianping] signIn failed.');
                    }
                });

            } else {
                console.log('[qiandao][dianping] already signIn today.');
            }
        } else {
            console.log('[qiandao][dianping] not login yet.');
        }
    });

}(window, document, Zepto);