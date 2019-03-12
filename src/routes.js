export default {
    "users" : {
        "list"   : "http://dialer-syste.tw1.ru/users/list", // http://dialer-syste.tw1.ru
        "add"    : "http://dialer-syste.tw1.ru/users/add",
        "edit"   : "http://dialer-syste.tw1.ru/users/edit",
        "delete" : "http://dialer-syste.tw1.ru/users/delete"
    },
    "rate" : {
        "list"   : "http://dialer-syste.tw1.ru/call_load/list",
        "get"    : "http://dialer-syste.tw1.ru/call_load/get", // (id в параметрах) /get?id=1
        "add"    : "http://dialer-syste.tw1.ru/call_load/add", // JSON STRING {name, data}  
        "edit"   : "http://dialer-syste.tw1.ru/call_load/edit", // JSON STRING {id, name, data}
        "delete" : "http://dialer-syste.tw1.ru/call_load/delete" // JSON STRING {id}
    }
}