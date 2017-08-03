var startPageName = "index";
var userConst = {
    logSheet:"1rR_rj2plSj9rB5RhWJHDHST9Tsiz6GaB0d-UngQgss8"
};

function _debug(){
    var tables = FusionTables.Table.list();
    //var str = JSON.stringify(tables,null,4);
    var str = "test";
    outputLogs(str);
}

function doGet(request) {
  return HtmlService.createTemplateFromFile("html_" + startPageName)
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setTitle("AppLab");
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

function loadTextFileFromDrive(fileId,charEnc){
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

function outputLogs(comments, option){
    option = option === undefined ? {"inputTime":true} : option;
    if(Array.isArray(comments)){
        comments.forEach(function(comment){outputLogs(comment,option)});
        return;
    }

    var ss = SpreadsheetApp.openById(userConst.logSheet);
    var sheet = ss.getSheets()[0];

    var allRangeValues = sheet.getRange(1,1,sheet.getMaxRows(),sheet.getMaxColumns()).getValues();
    var sheetSize = {
        "height":allRangeValues.map(function(arr){return arr[0]}).findIndex(function(v){return v !== ""}),
        "width":allRangeValues[0].findIndex(function(v){return v !== ""})
    };

    var ranges = sheet.getRange(sheetSize.height+1,1,1,sheetSize.width);
    ranges.setValues([[
        option.inputTime ? "" : "",
        comments
    ]]);
}

function clearLogs(option){
    option = option === undefined ? {} : option;
    var rowStartIndex = 1;  //exclude header

    var ss = SpreadsheetApp.openById(userConst.logSheet);
    var sheet = ss.getSheets()[0];

    var ranges = sheet.getRange(rowStartIndex+1,1,sheet.getMaxRows(),sheet.getMaxColumns());
    ranges.clear();
}

function dateString(date,template){
    //year : %Y 2017, %y 17
    //month : %m 08, %N _8, %B Octobar, %b Oct
    //date : %d 01, %e _1
    //day : %a Tue, %A Tuesday, %W 火, %w 2
    //hour : %H 01(00-23), %I 01(00-11), %h _1(00-23), %i _1(00-11)
    //minute : %M 02
    //second : %S 23
    //millisecond : %z 534
    //ampm : %P AM, %p am, %q 午前
    //other : %n new line, %j ISO8601 style, %O time offset hour, %o time offset minute, %g time offset sign

    if(date === undefined || date === null) date = new Date();
    template = template === undefined ? "%j" : template;

    var dVal = {
        "year":date.getFullYear(),"month":date.getMonth(),"date":date.getDate(),"day":date.getDay(),
        "hour":date.getHours(),"minute":date.getMinutes(),"second":date.getSeconds(),"millisecond":date.getMilliseconds(),"offsetTimeAbs":Math.abs(date.getTimezoneOffset()),"offsetSign":-date.getTimezoneOffset()<0?-1:+1
    };

    var fillD = function(str,fillStr,digit){
        str = ""+str;
        digit = digit === undefined ? 2 : digit;
        for(var i=0,l=digit-str.length;i<l;i++){
            str = "" + fillStr + str;
        }
        return str;
    };

    var pattern = {
        "%Y":""+dVal.year,"%y":""+dVal.year%100,
        "%m":fillD(dVal.month+1,0),"%N":fillD(dVal.month+1," "),"%B":["January","February","March","April","May","June","July","August","September","October","November","December"][dVal.month],"%b":["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"][dVal.month],
        "%d":fillD(dVal.date,0),"%e":fillD(dVal.date," "),
        "%a":["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][dVal.day],"%A":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][dVal.day],"%W":["月","火","水","木","金","土","日"][dVal.day],"%w":"" + dVal.day,
        "%H":fillD(dVal.hour,0),"%I":fillD(dVal.hour," "),"%h":fillD(dVal.hour%12,0),"%i":fillD(dVal.hour%12," "),
        "%M":fillD(dVal.minute,0),
        "%S":fillD(dVal.second,0),
        "%z":fillD(dVal.millisecond,0,3),
        "%P":dVal.hour<12?"AM":"PM","%p":dVal.hour<12?"am":"pm","%q":dVal.hour<12?"午前":"午後",
        "%n":"\n","%O":fillD((dVal.offsetTimeAbs-dVal.offsetTimeAbs%60)/60,0),"%o":fillD(dVal.offsetTimeAbs%60,0),"%g":dVal.offsetSign<0?"-":"+", 
        "%j":["%Y-%m-%dT%H:%M:%S.%z%g%O:%o"]
    };


    Object.keys(pattern).forEach(function(searchStr){
        var setStr = pattern[searchStr];
        var reg = new RegExp(searchStr,"g");

        if(reg.test(template)){
            if(typeof setStr !== "string"){
                setStr = dateString(date,setStr[0]);
            }
            template = template.replace(reg,setStr);
        }
    });

    return template;
}