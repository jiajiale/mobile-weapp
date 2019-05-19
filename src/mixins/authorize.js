import wepy from 'wepy';
import api from '../api';

export default class authorize extends wepy.mixin {
    checkAuthorize (callback) {
        let token = wx.getStorageSync('token');
        let userInfo = wx.getStorageSync('userInfo');
        if(!token){
            wx.navigateTo({
                url: '/pages/authorize/index'
            })
        }else{
            this.$parent.globalData.userInfo = userInfo;
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
    };

    checkUserFrom(params){
        if(params.userFrom){
            wx.setStorageSync('userFrom', params.userFrom);
            return true;
        }else{
            return false;
        }
    }

    saveCustomer(){
        let userFrom = wx.getStorageSync('userFrom');
        let userFromSave = wx.getStorageSync('userFromSave');

        console.log(userFrom);
        console.log(userFromSave);

        if(userFrom != userFromSave){
            api.saveCustomer('POST', {from_user_id:userFrom}).then(resp => {
                console.log(resp);
                if(resp && resp.status === 'success'){
                    console.log('aaaa');
                    wx.setStorageSync('userFromSave', userFrom);
                }
            });
        }
    }
}
