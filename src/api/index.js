import wepy from 'wepy';
import tip from '../utils/tip';

const APP_URL = 'https://mobile.caryue.com';
// const APP_URL = 'http://test.mobile.com';
const GOODS_IMG_URL = 'http://www.caryue.com/Public/Uploads/goods/source/';
const PHOTO_IMG_URL = APP_URL + '/Public/Uploads/photo/';
const UPLOAD_IMG_URL = APP_URL + '/Admin/Image/uploadPicture';

const wxRequest = async(method = 'GET',params = {}, url) => {
    let data = params || {};
    if (wx.getStorageSync('token')) {
        data.token = wx.getStorageSync('token');
    } else {
        data.token = '';
    }
    let res = await wepy.request({
        url: APP_URL + url,
        method: method,
        data: data,
        header: { 'Content-Type': 'application/json' ,'Accept': 'application/json'},
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
    PHOTO_IMG_URL: PHOTO_IMG_URL,
    UPLOAD_IMG_URL: UPLOAD_IMG_URL,
    login: (method,params) => wxRequest(method,params, "/api/public/login"),
    register: (method,params) => wxRequest(method,params, "/api/public/register"),
    queryGoodsList: (method,params) => wxRequest(method,params, "/api/goods/index"),
    addGoodsCart: (method,params) => wxRequest(method,params, "/api/cart/addGoodsCart"),
    queryCartInfo: (method,params) => wxRequest(method,params, "/api/cart/getCartGoods"),
    createServiceOrder: (method,params) => wxRequest(method,params, "/api/order/service"),
    payOrder: (method,params) => wxRequest(method,params, "/api/order/pay"),
};