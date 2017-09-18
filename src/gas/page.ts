import * as GoogleAppsScript from 'google-apps-script';

function include(filename:string) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getPage(pageName:string){
    var htmlName = "html_" + pageName;
    return  HtmlService.createTemplateFromFile(htmlName)
        .evaluate()
        .setSandboxMode(HtmlService.SandboxMode.IFRAME)
        .getContent();
}
