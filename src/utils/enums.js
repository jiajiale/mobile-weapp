export default{
    BASIC : {
        ACTIVE : [1,'启用'],
        DELETE : [99,'禁用']
    },
    BOOL : {
        YES : [1,'是'],
        NO : [0,'否']
    },
    WITHDRAW_STATUS : {
        UNCHECK : [1,'待审核'],
        UNPASS : [2,'审核不通过'],
        UNPAY : [3,'待打款'],
        PAID : [4,'提现成功']
    },
    getValue: function(enumName,status) {
        var result = '';
        for(let index in this[enumName]){
            if(index == status){
                result = this[enumName][index][0];
                break;
            }
        }

        return result;
    },
    getKey: function(enumName,value) {
        var result = '';
        for(let index in this[enumName]){
            if(this[enumName][index][0] == value){
                result = index;
                break;
            }
        }
        return result;
    },
    getDesc: function(enumName,value) {
        var result = '未知';
        for(let index in this[enumName]){
            if(this[enumName][index][0] == value){
                result = this[enumName][index][1];
                break;
            }
        }
        return result;
    },
    getItems: function(enumName,except = []) {
        var result = [];
        for(let index in this[enumName]){
            if(!this.in_array(index,except)){
                result.push({value:this[enumName][index][0],label:this[enumName][index][1]});
            }
        }

        return result;
    },
    in_array: function(needle, haystack) {
        let n = haystack.length;

        for (let i = 0;i < n; ++i){
            if (haystack[i] === needle)
                return true;
        }
        return false;
    }
};