/* reactとreact-domの読み込み */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as jQuey from 'jquery';

module app.para.onOpen {
    
}

var _val:{
    pageFun:{
        [key:string]:{
            [key1:string]:Function
        }
    }[],
    isReady:boolean
};


