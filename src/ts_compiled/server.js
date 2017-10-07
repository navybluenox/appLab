"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app;
(function (app) {
    var server;
    (function (server) {
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
        server.sendHttpRequest = sendHttpRequest;
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
        server.sendGASRequest = sendGASRequest;
    })(server = app.server || (app.server = {}));
})(app || (app = {}));
//# sourceMappingURL=server.js.map