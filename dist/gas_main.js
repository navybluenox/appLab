var startPageName = "index";

function doGet(request) {
  return HtmlService.createTemplateFromFile("html_" + startPageName)
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setTitle("JIMシステム_forJIMs");
}


function loadfun(funName,_arguments){
    var fun = ThisApp;
    funName.split(".").forEach(function(key){
        fun = fun[key] || {}
    });
    if(_arguments === undefined){
        return JSON.stringify(fun.apply(undefined));
    }else{
        if(!Array.isArray(_arguments))  _arguments = [_arguments];
        return JSON.stringify(fun.apply(undefined,_arguments));
    }
}


function updateFileToDrive(fileId, content){
    DriveApp.getFileById(fileId).setContent(content);
}

function loadFileFromDrive(fileId,charEnc){
    if(charEnc == null)  charEnc = "UTF-8";
    return DriveApp.getFileById(fileId).getBlob().getDataAsString(charEnc);
}



function handlePropertiesService(value,type,doKind){
    //value
    //set : {[names]:[values]}, get : [[names]], delete : [[names]]
    var properties;
    var result;
    switch(type){
        case "user":
            properties = PropertiesService.getUserProperties();
            break;
        case "script":
            properties = PropertiesService.getScriptProperties();
            break;
        default:
            throw new Error();
    }
    switch(doKind){
        case "set":
            properties.setProperties(value);
            result = true;
            break;
        case "get":
            if(value.length === 0){
                result = properties.getProperties();
            }else{
                result = {};
                value.forEach(function(v){
                    result[v] = (properties.getProperty(v) === undefined ? null : properties.getProperty(v));
                });
            }
            break;
        case "delete":
            if(value.length === 0){
                properties.deleteAllProperties();
            }else{
                value.forEach(function(v){
                    properties.deleteProperty(v);
                });
            }
            result = true;
            break;
        default:
            throw new Error();
    }
    return result;
}