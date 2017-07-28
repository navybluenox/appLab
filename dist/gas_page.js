function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getPage(pageName){
    var htmlName = "html_" + pageName;
    return  HtmlService.createTemplateFromFile(htmlName)
        .evaluate()
        .setSandboxMode(HtmlService.SandboxMode.IFRAME)
        .getContent();
}
