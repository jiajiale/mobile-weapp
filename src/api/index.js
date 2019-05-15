import wepy from 'wepy';
import tip from '../utils/tip';

const APP_URL = 'https://www.caryue.com';
// const APP_URL = 'https://mobile.caryue.com';
const GOODS_IMG_URL = APP_URL + '/Public/Uploads/goods/source/';
const CATEGORY_IMG_URL = APP_URL + '/Public/Uploads/category/source/';
const FOCUS_IMG_URL = APP_URL + '/Public/Uploads/focus/source/';
const ADV_IMG_URL = APP_URL + '/Public/Uploads/adv/source/';
const APP_IMG_URL = APP_URL + '/Public/Uploads/app/';
const PHOTO_IMG_URL = APP_URL + '/Public/Uploads/photo/';
const UPLOAD_IMG_URL = APP_URL + '/Admin/Image/uploadPicture';
const THUMBNAIL_IMG = APP_URL + '/Api/Public/thumbnail';

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
    CATEGORY_IMG_URL: CATEGORY_IMG_URL,
    FOCUS_IMG_URL: FOCUS_IMG_URL,
    ADV_IMG_URL: ADV_IMG_URL,
    APP_IMG_URL: APP_IMG_URL,
    PHOTO_IMG_URL: PHOTO_IMG_URL,
    UPLOAD_IMG_URL: UPLOAD_IMG_URL,
    THUMBNAIL_IMG: THUMBNAIL_IMG,
    login: (method,params) => wxRequest(method,params, "/api/public/login"),
    register: (method,params) => wxRequest(method,params, "/api/public/register"),
    updateUserPhone: (method,params) => wxRequest(method,params, "/api/public/updateUserPhone"),
    queryIndex: (method,params) => wxRequest(method,params, "/api/index/index"),
    queryGoodsList: (method,params) => wxRequest(method,params, "/api/goods/index"),
    queryGoodsDetail: (method,params) => wxRequest(method,params, "/api/goods/detail"),
    queryCategoryList: (method,params) => wxRequest(method,params, "/api/goods/category"),
    queryGoodsQrcode: (method,params) => wxRequest(method,params, "/api/goods/qrcode"),
    addGoodsCart: (method,params) => wxRequest(method,params, "/api/cart/addGoodsCart"),
    delGoodsCart: (method,params) => wxRequest(method,params, "/api/cart/delGoodsCart"),
    addGoodsOrder: (method,params) => wxRequest(method,params, "/api/cart/addGoodsOrder"),
    queryCartInfo: (method,params) => wxRequest(method,params, "/api/cart/getCartGoods"),
    queryCartGoods: (method,params) => wxRequest(method,params, "/api/order/getCartGoods"),
    createGoodsOrder: (method,params) => wxRequest(method,params, "/api/order/goods"),
    createServiceOrder: (method,params) => wxRequest(method,params, "/api/order/service"),
    queryPayOrder: (method,params) => wxRequest(method,params, "/api/order/queryPayOrder"),
    payOrder: (method,params) => wxRequest(method,params, "/api/order/pay"),
    queryUserInfo: (method,params) => wxRequest(method,params, "/api/user/queryUserInfo"),
    cancelOrder: (method,params) => wxRequest(method,params, "/api/user/cancelOrder"),
    receiveOrder: (method,params) => wxRequest(method,params, "/api/user/receiveOrder"),
    queryReturnGoods: (method,params) => wxRequest(method,params, "/api/user/getReturnGoods"),
    returnOrder: (method,params) => wxRequest(method,params, "/api/user/returnOrder"),
    queryReturnList: (method,params) => wxRequest(method,params, "/api/user/queryReturnList"),
    queryOrderList: (method,params) => wxRequest(method,params, "/api/user/getOrderList"),
    queryPointList: (method,params) => wxRequest(method,params, "/api/user/queryPointList"),
    queryCustomerList: (method,params) => wxRequest(method,params, "/api/user/queryCustomerList"),
    queryAddressList: (method,params) => wxRequest(method,params, "/api/user/getAddressList"),
    makeUserCode: (method,params) => wxRequest(method,params, "/api/user/makeUserCode"),
    saveAddress: (method,params) => wxRequest(method,params, "/api/user/saveAddress"),
    delAddress: (method,params) => wxRequest(method,params, "/api/user/delAddress"),
    setDefaultAddress: (method,params) => wxRequest(method,params, "/api/user/setDefaultAddress"),
    saveCustomer: (method,params) => wxRequest(method,params, "/api/user/saveCustomer"),
};