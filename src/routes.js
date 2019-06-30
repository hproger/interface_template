const DOMAIN = 'http://dialer-syste.tw1.ru';
export default {
    "users" : {
        "list"   : DOMAIN + "/users/list", //  get
        "add"    : DOMAIN + "/users/add", // post
        "edit"   : DOMAIN + "/users/edit", // post
        "delete" : DOMAIN + "/users/delete" // post
    },
    "rate" : {
        "list"   : DOMAIN + "/call_load/list", // get
        "get"    : DOMAIN + "/call_load/get", // (id в параметрах) /get?id=1
        "add"    : DOMAIN + "/call_load/add", // JSON STRING {name, data}  post
        "edit"   : DOMAIN + "/call_load/edit", // JSON STRING {id, name, data} post
        "delete" : DOMAIN + "/call_load/delete" // JSON STRING {id} post
    },
    "pool" : {
        "list"   : DOMAIN + "/numbers_pool/list", // get
        "get"    : DOMAIN + "/numbers_pool/get", // (id в параметрах) /get?id=1
        "add"    : DOMAIN + "/numbers_pool/add", // JSON STRING {name, data}  post
        "edit"   : DOMAIN + "/numbers_pool/edit", // JSON STRING {id, name, data} post
        "delete" : DOMAIN + "/numbers_pool/delete", // JSON STRING {id} post
        "exportALL" : DOMAIN + "/numbers_pool/exportALL", // get
        "importAllMerge" : DOMAIN + "/numbers_pool/importAllMerge", // post
        "importСSV" : DOMAIN + "/numbers_pool/importСSV" // post
    },
    "calls" : {
        "list"   : DOMAIN + "/call_task/list", // get
        "get"    : DOMAIN + "/call_task/get", // (id в параметрах) /get?id=1
        "add"    : DOMAIN + "/call_task/add", // JSON STRING {name, data}  post
        "edit"   : DOMAIN + "/call_task/edit", // JSON STRING {id, name, data} post
        "delete" : DOMAIN + "/call_task/delete", // JSON STRING {id} post
        "run"    : DOMAIN + "/call_task/run", // Return: {result : 1} если успешно  JSON STRING {id} post
        "stop"   : DOMAIN + "/call_task/stop", // Return: {result : 1} если успешно  JSON STRING {id} post
        "getCDR" : DOMAIN + "/call_task/getCDR",
        "deleteCDR" : DOMAIN + "/call_task/deleteCDR",
        "deleteStat" : DOMAIN + "/call_task/deleteStat",
        "getVerificationReqCount" : DOMAIN + "/call_task/getVerificationReqCount",
    },
    "trunks" : {
        "list"   : DOMAIN + "/trunk/list", // get
        "add"   : DOMAIN + "/trunk/add", // post
        "edit"   : DOMAIN + "/trunk/edit", // post
        "delete"   : DOMAIN + "/trunk/delete" // post
    },
    "errors" : {
        "list" : DOMAIN + "/error_log/list", // get
        "delete" : DOMAIN + "/error_log/delete", // post
        "deleteall" : DOMAIN + "/error_log/deleteall", // post
        "edit" : DOMAIN + "/error_log/edit", //post {id,status}
    }
}