function sendHttpRequest(para) {
    var req = new XMLHttpRequest();
    req.open(para.method, para.url);
    var p = new Promise(function (resolve) {
        req.addEventListener("load", function (event) {
            resolve();
        });
    });
    req.send();
}
