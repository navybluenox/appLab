var module1;
(function (module1) {
    var bar = (function () {
        function bar() {
        }
        return bar;
    }());
    module1.bar = bar;
})(module1 || (module1 = {}));
var foo = new module1.bar();
console.log(foo);
