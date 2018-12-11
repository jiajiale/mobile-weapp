import wepy from 'wepy';
import util from '../utils/util';
import md5 from '../utils/md5';

const APP_URL = 'http://test.mobile.com';
// const APP_URL = 'https://reagent.caryue.com';
const API_SECRET_KEY = 'mapp.kexueshengyin.com';
const TIMESTAMP = util.getCurrentTime();
const SIGN = md5.hex_md5((TIMESTAMP + API_SECRET_KEY).toLowerCase());

const wxRequest = async(method = 'GET',params = {}, url) => {
    let data = params || {};
    if (wx.getStorageSync('token')) {
        data.token = wx.getStorageSync('token');
    } else {
        data.token = '';
    }
    const SIGN = md5.hex_md5((TIMESTAMP + API_SECRET_KEY).toLowerCase());
    let res = await wepy.request({
        url: APP_URL + url,
        method: method,
        data: data,
        header: { 'Content-Type': 'application/json' ,'Accept': 'application/json', 'time': TIMESTAMP,'sign':SIGN},
    });

    if(res.data.code === 200){
        return res.data;
    }else{
        return false;
    }
};

export default{
    login: (method,params) => wxRequest(method,params, "/api/public/login"),
    register: (method,params) => wxRequest(method,params, "/api/public/register"),
    queryGoodsList: (method,params) => wxRequest(method,params, "/api/goods/queryGoodsList"),
};