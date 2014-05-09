!function(win, doc, $){

    $(doc).ready(function() {
        if ($('#signTrigger').length) {
            console.log('click #signTrigger');
            $('#signTrigger').click();
        }
    });

}(window, document, Zepto);