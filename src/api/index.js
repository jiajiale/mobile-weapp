import wepy from 'wepy';
import util from '../utils/util';
import tip from '../utils/tip';
import md5 from '../utils/md5';

const APP_URL = 'http://mobile.caryue.com';
const GOODS_IMG_URL = 'http://www.caryue.com/Public/Uploads/goods/source/';
const UPLOAD_IMG_URL = APP_URL + '/Admin/Image/uploadPicture';
// const APP_URL = 'http://test.mobile.com';
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
    if(res.statusCode === 200){
        return res.data;
    }else{
        tip.loaded();
        tip.toast('网络请求失败');
    }
};

export default{
    GOODS_IMG_URL: GOODS_IMG_URL,
    UPLOAD_IMG_URL: UPLOAD_IMG_URL,
    login: (method,params) => wxRequest(method,params, "/api/public/login"),
    register: (method,params) => wxRequest(method,params, "/api/public/register"),
    queryGoodsList: (method,params) => wxRequest(method,params, "/api/goods/index"),
    addGoodsCart: (method,params) => wxRequest(method,params, "/api/cart/addGoodsCart"),
    queryCartInfo: (method,params) => wxRequest(method,params, "/api/cart/getCartGoods"),
    createServiceOrder: (method,params) => wxRequest(method,params, "/api/order/service"),
    payOrder: (method,params) => wxRequest(method,params, "/api/order/pay"),
};