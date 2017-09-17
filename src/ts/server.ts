function sendHttpRequest(para: {method: string, url: string, onLoad: () => Promise<void>}){
    const req = new XMLHttpRequest();
    req.open(para.method,para.url);
    let p = new Promise((resolve:()=>{}) => {
        req.addEventListener("load",(event) => {
            resolve();
        })
    });
    req.send();
}