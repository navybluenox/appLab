import * as GoogleAppsScript from 'google-apps-script';
import * as Main from './main'
import * as _ from './include'

_.initInclude();

var main = Main;

function _debug1(){
    Logger.log("hogehoge");
}

function _debug(){
    var tables = FusionTables.Table.list();
    var str = JSON.stringify(tables,null,4);
    //var str = "test";
    Main.outputLogs(str);
}

function doGet(request:any) {
    return HtmlService.createTemplateFromFile("html_" + Main.startPageName)
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setTitle("AppLab");
}

