"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app;
(function (app) {
    var base;
    (function (base) {
        function dateString(date, template) {
            //year : %Y 2017, %y 17
            //month : %m 08, %N _8, %B Octobar, %b Oct
            //date : %d 01, %e _1
            //day : %a Tue, %A Tuesday, %W 火, %w 2
            //hour : %H 01(00-23), %I 01(00-11), %h _1(00-23), %i _1(00-11)
            //minute : %M 02
            //second : %S 23
            //millisecond : %z 534
            //ampm : %P AM, %p am, %q 午前
            //other : %n new line, %%j ISO8601 style, %O time offset hour, %o time offset minute, %g time offset sign
            if (date === void 0) { date = new Date(); }
            if (template === void 0) { template = "%%j"; }
            var dVal = {
                "year": date.getFullYear(), "month": date.getMonth(), "date": date.getDate(), "day": date.getDay(),
                "hour": date.getHours(), "minute": date.getMinutes(), "second": date.getSeconds(), "millisecond": date.getMilliseconds(), "offsetTimeAbs": Math.abs(date.getTimezoneOffset()), "offsetSign": -date.getTimezoneOffset() < 0 ? -1 : +1
            };
            function fillD(str, fillStr, digit) {
                if (digit === void 0) { digit = 2; }
                var strRet = "" + str;
                for (var i = 0, l = digit - strRet.length; i < l; i++) {
                    strRet = fillStr + strRet;
                }
                return strRet;
            }
            ;
            var pattern = {
                "%Y": "" + dVal.year, "%y": "" + dVal.year % 100,
                "%m": fillD(dVal.month + 1, "0"), "%N": fillD(dVal.month + 1, " "), "%B": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][dVal.month], "%b": ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"][dVal.month],
                "%d": fillD(dVal.date, "0"), "%e": fillD(dVal.date, " "),
                "%a": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][dVal.day], "%A": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][dVal.day], "%W": ["月", "火", "水", "木", "金", "土", "日"][dVal.day], "%w": "" + dVal.day,
                "%H": fillD(dVal.hour, "0"), "%I": fillD(dVal.hour, " "), "%h": fillD(dVal.hour % 12, "0"), "%i": fillD(dVal.hour % 12, " "),
                "%M": fillD(dVal.minute, "0"),
                "%S": fillD(dVal.second, "0"),
                "%z": fillD(dVal.millisecond, "0", 3),
                "%P": dVal.hour < 12 ? "AM" : "PM", "%p": dVal.hour < 12 ? "am" : "pm", "%q": dVal.hour < 12 ? "午前" : "午後",
                "%n": "\n", "%O": fillD((dVal.offsetTimeAbs - dVal.offsetTimeAbs % 60) / 60, "0"), "%o": fillD(dVal.offsetTimeAbs % 60, "0"), "%g": dVal.offsetSign < 0 ? "-" : "+",
                "%%j": "%Y-%m-%dT%H:%M:%S.%z%g%O:%o"
            };
            Object.keys(pattern).forEach(function (searchStr) {
                var setStr = pattern[searchStr];
                var reg = new RegExp(searchStr, "g");
                if (reg.test(template)) {
                    if (/%%/.test(setStr)) {
                        setStr = dateString(date, setStr);
                    }
                    template = template.replace(reg, setStr);
                }
            });
            return template;
        }
        base.dateString = dateString;
    })(base = app.base || (app.base = {}));
})(app || (app = {}));
//# sourceMappingURL=base.js.map