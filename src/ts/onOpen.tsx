/* reactとreact-domの読み込み */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as jQuey from 'jquery';

module app.para {
    export var status:string;
    export function huga(){
        
    }
}

var _val:{
    pageFun:{
        [key:string]:{
            [key1:string]:Function
        }
    }[],
    isReady:boolean
};


