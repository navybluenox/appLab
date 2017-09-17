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

function useGAS(funcName:string, argu:any[] = []): Promise<{}>{
    return new Promise((resolve,reject):any => {
        google.script.run.myFun();
    });
}
