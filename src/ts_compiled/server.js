"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sendHttpRequest(para) {
    var req = new XMLHttpRequest();
    req.open(para.method, para.url);
    var p = new Promise(function (resolve) {
        req.addEventListener("load", function (event) {
            resolve();
        });
    });
    req.send();
    return p;
}
function sendGASRequest(funcName, argu, userObj) {
    if (argu === void 0) { argu = []; }
    if (userObj === void 0) { userObj = null; }
    return new Promise(function (resolve, reject) {
        google.script.run
            .withSuccessHandler(function (v, o) {
            resolve(JSON.parse(v), o);
        })
            .withFailureHandler(function (e, o) {
            reject(e, o);
        })
            .withUserObject(userObj)
            .getGASRequest(funcName, argu);
    });
}
//# sourceMappingURL=server.js.map