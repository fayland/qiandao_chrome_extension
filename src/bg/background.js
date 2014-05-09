!function(win, doc, $){
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.method == "getLocalStorage") {
            sendResponse({data: localStorage[request.key]});
        } else if (request.method == "setLocalStorage") {
            localStorage.setItem(request.key, request.val);
            sendResponse({});
        } else {
            sendResponse({}); // snub them.
        }
    });
}(window, document, Zepto);