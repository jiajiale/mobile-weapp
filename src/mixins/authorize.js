import wepy from 'wepy'

export default class authorize extends wepy.mixin {
    checkAuthorize (callback) {
        let token = wx.getStorageSync('token');
        console.log(token)
        if(!token){
            wx.navigateTo({
                url: '/pages/authorize/index'
            })
        }else{
            callback();
        }
    };

    checkLogin(callback){
        let userInfo = wx.getStorageSync('userInfo');

        if(userInfo.mobile){
            callback();
        }else{
            wx.navigateTo({
                url: '/pages/authorize/login'
            })
        }
    }
}
