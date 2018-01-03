/* reactとreact-domの読み込み */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as $ from 'jquery';

function test():void{
    var str:string = "" + $("#code").val();
    eval(str);
}
