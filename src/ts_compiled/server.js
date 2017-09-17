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
function useGAS(funcName, argu) {
    if (argu === void 0) { argu = []; }
    return new Promise(function (resolve, reject) {
    });
}
//# sourceMappingURL=server.js.map