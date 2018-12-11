import wepy from 'wepy'
import api from '../api';

export default class authorize extends wepy.mixin {
    checkAuthorize (callback) {
        let token = wx.getStorageSync('token');
        let token_expire = wx.getStorageSync('token_expire');
        let current_time = Date.parse(new Date());

         if(!token){
             wx.navigateTo({
                 url: '/pages/authorize/index'
             })
         }else{
             if(token_expire < current_time){
                 wx.login({
                     success: function (res) {
                         if (res.code) {
                             api.login('POST', {
                                 'code': res.code
                             }).then(resp => {
                                 if (resp.data) {
                                     token = resp.data.token;
                                     wx.setStorageSync('token', token);
                                     wx.setStorageSync('token_expire', current_time + 500000);
                                     callback();
                                 }
                             });
                         }
                     }
                 });
             }else{
                 callback();
             }
         }
    };
}
