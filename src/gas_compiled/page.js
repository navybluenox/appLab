"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
function getPage(pageName) {
    var htmlName = "html_" + pageName;
    return HtmlService.createTemplateFromFile(htmlName)
        .evaluate()
        .setSandboxMode(HtmlService.SandboxMode.IFRAME)
        .getContent();
}
//# sourceMappingURL=page.js.map