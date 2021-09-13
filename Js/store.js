//let STATIC_URL="http://192.168.30.192:8086"
let STATIC_URL = ""   //生产环境
// let STATIC_URL="localhost:9090";  //本地环境
let globalToken = ""
const ERROR_403 = 403;
let refreshToken = false;
//const TOKEN_REFRESH_TIME = 6600000; // token刷新时间 110分钟
const TOKEN_REFRESH_TIME = 110000; // token刷新时间

const ajaxPromise = param => {
  return   new Promise((resolve, reject) => {
        console.log(param, '0')
        $.ajax({
            type: param.type,
            async: param.async,
            data: param.data,
            url: STATIC_URL + param.url,
            dataType: param.dataType,
            contentType: param.contentType,
            // jsonp:'callback',
            // jsonpCallback:"successCallback",
            // success: function (json) {
            //     var jsonlist = json.dateli.length;
            //     if (jsonlist > 0) {
            //         var html = '';
            //         for (var i = 0; i < jsonlist; i+=2) {
            //             alert(json.dateli[i].price);
            //         }
            //         $("#jiji").append(html);
            //     }
            //
            // }
            "success": res => {
                console.log(res,222)
                resolve(res);
            },
            "error": err => {
                console.log(err,222)
                reject(err);
            },
            complete: function (xhr, data) {
                //获取服务端自定义的header信息
                var stoken = xhr.getResponseHeader('newToken');
                if (stoken != null && stoken != '') {
                    globalToken = stoken;
                }

            }
        });

    })
}


