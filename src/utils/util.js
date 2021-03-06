/**
 * 是否是空对象
 * @param obj
 * @returns {boolean}
 */
function isEmptyObject(obj) {
    for(let key in obj){
        return false;
    }
    return true;
}
function GetDateTimeDiff(startTime, endTime) {
    let retValue = {};

    let date3 = endTime.getTime() - startTime.getTime();  //时间差的毫秒数

    //计算出相差天数
    let days = Math.floor(date3 / (24 * 3600 * 1000));
    retValue.Days = days;

    let years = Math.floor(days / 365);
    retValue.Years = years;

    let months = Math.floor(days / 30);
    retValue.Months = months;

    //计算出小时数
    let leave1 = date3 % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
    let hours = Math.floor(leave1 / (3600 * 1000));
    retValue.Hours = hours;

    //计算相差分钟数
    let leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
    let minutes = Math.floor(leave2 / (60 * 1000));
    retValue.Minutes = minutes;

    //计算相差秒数
    let leave3 = leave2 % (60 * 1000);      //计算分钟数后剩余的毫秒数
    let seconds = Math.round(leave3 / 1000);
    retValue.Seconds = seconds;

    let strTime = "";
    if (years >= 1) {
        strTime = years + "年前";
    } else if (months >= 1) {
        strTime = months + "个月前";
    } else if (days >= 1) {
        strTime = days + "天前";
    } else if (hours >= 1) {
        strTime = hours + "小时前";
    } else {
        strTime = minutes + "分钟前";
    }
    retValue.PubTime = strTime;     //帖子,文章,博客发表时间的一种简短表示方法
    return retValue;
}
/**
 * 获取当前时间
 * @returns {string}
 */
function getCurrentTime() {
  let keep = '';
  let date = new Date();
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  let f = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  let rand = Math.round(Math.random() * 899 + 100);
  keep = y + '' + m + '' + d + '' + h + '' + f + '' + s;
  return keep; //20160614134947
}

function formatDateTime(date,fmt) {
    let newDate = new Date(date.replace(/-/g, "/"));
    let o = {
        "M+" : newDate.getMonth()+1, //月份
        "d+" : newDate.getDate(), //日
        "h+" : newDate.getHours()%12 == 0 ? 12 : newDate.getHours()%12, //小时
        "H+" : newDate.getHours(), //小时
        "m+" : newDate.getMinutes(), //分
        "s+" : newDate.getSeconds(), //秒
        "q+" : Math.floor((newDate.getMonth()+3)/3), //季度
        "S" : newDate.getMilliseconds() //毫秒
    };
    let week = {
        "0" : "/u65e5",
        "1" : "/u4e00",
        "2" : "/u4e8c",
        "3" : "/u4e09",
        "4" : "/u56db",
        "5" : "/u4e94",
        "6" : "/u516d"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (newDate.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[newDate.getDay()+""]);
    }
    for(let k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

/**
 * @return {boolean}
 */
function GoodsInCart(cartList,goods) {
    let flag = false;

    console.log(goods.spec_info)
    for(let i in cartList){
        console.log(cartList[i].spec_info);
        if(cartList[i].id === goods.id && cartList[i].spec_info === goods.spec_info){
            flag = i;
        }
    }
    return flag;
}

function sortNumber(a,b)
{
    return a - b;
}

/**
 * 是否在数组中
 * @param arr
 * @param value
 * @returns {boolean}
 */
function isInArray(arr,value){
    for(let i = 0; i < arr.length; i++){
        if(value === arr[i]){
            return true;
        }
    }
    return false;
}

/**
 * 在对象数组中的位置
 * @param arr
 * @param field
 * @param val
 * @returns {number}
 */
function findArrIndex(arr,field,val){
    return arr.findIndex(item => {
        if(item[field] === val){
            return true;
        }
    });
}

/**
 * 影藏手机号
 * @param mobile
 * @returns {string|*}
 */
function hideMobile(mobile){
    mobile = "" + mobile;

    if(mobile.length === 11){
        let reg=/(\d{3})\d{4}(\d{4})/;
        mobile = mobile.replace(reg, "$1****$2")
    }

    return mobile
}

const fsm = wx.getFileSystemManager();
//const FILE_BASE_NAME = 'tmp_base64src';
function base64src(base64data,basename){
    let FILE_BASE_NAME = basename
    return new Promise((resolve, reject) => {
        const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];
        if (!format) {
            reject(new Error('ERROR_BASE64SRC_PARSE'));
        }
        const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
        const buffer = wx.base64ToArrayBuffer(bodyData);
        fsm.writeFile({
            filePath,
            data: buffer,
            encoding: 'binary',
            success() {
                resolve(filePath);
            },
            fail() {
                reject(new Error('ERROR_BASE64SRC_WRITE'));
            },
        });
    });
}

module.exports = {
    isEmptyObject: isEmptyObject,
    getCurrentTime: getCurrentTime,
    GetDateTimeDiff: GetDateTimeDiff,
    formatDateTime: formatDateTime,
    GoodsInCart: GoodsInCart,
    sortNumber: sortNumber,
    isInArray: isInArray,
    findArrIndex: findArrIndex,
    base64src: base64src,
    hideMobile: hideMobile,
};
