/* reactとreact-domの読み込み */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as jQuey from 'jquery';

export function pageTrans(pageName:string,option?:object){
            
}

export interface I_pageModule {
    onload:Function,
    onunload:Function,
    [key:string]:Function
}

