!function(win, doc, $){

    $(doc).ready(function() {
        if ($('#point_sign').length) {
            console.log('click #point_sign');
            $('#point_sign').click();
        }
    });

}(window, document, Zepto);