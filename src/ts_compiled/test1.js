"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
/* reactとreact-domの読み込み */
var React = require("react");
var ReactDOM = require("react-dom");
var Index = (function (_super) {
    __extends(Index, _super);
    function Index(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            inputValue: '',
            outputValue: ''
        };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }
    Index.prototype.handleChange = function (e) {
        this.setState({
            inputValue: e.target.value
        });
    };
    Index.prototype.handleClick = function () {
        this.setState({
            inputValue: '',
            outputValue: this.state.inputValue
        });
    };
    Index.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(Input, { value: this.state.inputValue, handleChange: this.handleChange }),
            React.createElement(Button, { handleClick: this.handleClick }),
            React.createElement(Output, { hello: "Hello", value: this.state.outputValue })));
    };
    return Index;
}(React.Component));
var Input = function (props) {
    return (React.createElement("input", { type: "text", placeholder: "Input Name", value: props.value, onChange: props.handleChange }));
};
var Button = function (props) {
    return (React.createElement("button", { onClick: props.handleClick }, "Send"));
};
var Output = function (props) {
    var value = (props.value !== '') ? React.createElement("h1", null,
        props.hello,
        " ",
        props.value,
        " !") : '';
    return (React.createElement("div", null, value));
};
ReactDOM.render(React.createElement(Index, { hello: "Hello" }), document.querySelector('.content'));
