!function(win, doc, $){

    $(doc).ready(function() {
        // only do it when login
        if (1) {
            var today = (new Date()).toDateString();
            var status = localStorage.getItem('xiami_status');
            if (! (status && today === status)) {
                $.ajax({
                    type     : "POST",
                    url      : 'http://www.xiami.com/task/signin',
                    dataType : 'html',
                    success  : function(data) {
                        if (data === '1') {
                            localStorage.setItem('xiami_status', today);
                            console.log('[qiandao][xiami] signIn OK.');
                        } else {
                            console.log(data);
                        }
                    }
                });

            } else {
                console.log('[qiandao][xiami] already signIn today.');
            }
        } else {
            console.log('[qiandao][xiami] not login yet.');
        }
    });

}(window, document, Zepto);