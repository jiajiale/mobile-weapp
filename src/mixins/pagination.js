import wepy from 'wepy';
import Tips from '../utils/tip';

/**
 * 分页通用方法
 */
export default class pagination extends wepy.mixin {
    config = {};
    components = {};
    methods = {};
    events = {};
    data = {
        isPageLoading: false,
        isPageEmpty: false,
        isPageReachBottom: false
    };
    /**
     * 下一页
     */
    async next () {
        if(this.hasPage){
            this.page++;
            this.queryItemList();
        }
    }

    /**
     * 到达底部
     */
    async onReachBottom () {
        await this.next();
    };

    /**
     * 重新加载
     */
    async reload () {
        Tips.loading();
        wepy.stopPullDownRefresh();
    }

    /**
     * 下拉刷新
     */
    async onPullDownRefresh () {
        await this.reload();
    }
}
