import * as GoogleAppsScript from 'google-apps-script';

function sendHttpRequest(para: {method: string, url: string}): Promise<{}>{
    const req = new XMLHttpRequest();
    req.open(para.method,para.url);
    let p = new Promise((resolve:()=>void) => {
        req.addEventListener("load",(event) => {
            resolve();
        })
    });
    req.send();
    return p;
}

function sendGASRequest(funcName:string, argu:any[] = [], userObj:Object|null = null): Promise<{}>{
    return new Promise((resolve:Function,reject:Function):any => {
        google.script.run
        .withSuccessHandler((v:string,o:Object) => {
            resolve(JSON.parse(v),o);
        })
        .withFailureHandler((e:Error,o:Object) => {
            reject(e,o);
        })
        .withUserObject(userObj)
        .getGASRequest(funcName,argu);
    });
}