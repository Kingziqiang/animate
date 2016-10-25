var utils={};
utils.getCss = function (curEle, attr) {
    var val = "getComputedStyle" in window ? window.getComputedStyle(curEle, null)[attr] : curEle.currentStyle[attr];
    var temp = parseFloat(val);
    return isNaN(temp) ? val : temp;
};
    utils.setCss=function(curEle,attr,val){
        with(curEle){//把curEle当做当前作用域，这样就不用再每一个css属性前curEle.了；
            switch(attr){
                //处理float兼容性问题
                case 'float':
                    style['cssFloat']=val;
                    style['styleFloat']=val;
                    break;
                //处理opacity兼容性问题
                case 'opacity':
                    //让val在0-1之间
                    val=Math.min(1,val)&&Math.max(0,val);
                    style['opacity']=val;
                    style['filter']="alpha(opacity:"+val*100+")";
                    break;
                case'width':
                case'height':
                case'paddingTop':
                case'paddingRight':
                case'paddingBottom':
                case'paddingLeft':
                case'borderTop':
                case'borderRight':
                case'borderBottom':
                case'borderLeft':
                    var reg=/^-?((?:\d|[1-9]\d+)(?:\.\d+)?)(pt|px|in|em)?$/;
                    //这些值都不能为负数，所以用Math.max计算一下
                    if (reg.test(val)) {
                        var num = RegExp.$1;//获取第一个分组
                        var unit = RegExp.$2;//获取第二个分组
                        num = Math.max(0, num);//如果传进来是一个负数则有0代替；
                        val = unit ? num + unit : num + "px";//如果没带单位则默认用px；
                    }
                    style[attr]=val;
                    break;
                case 'top':
                case 'right':
                case'bottom':
                case'left':
                case'marginTop':
                case'marginRight':
                case'marginBottom':
                case'marginLeft':
                    //这些值可以为负数
                    var reg = /^(-?(?:\d|[1-9]\d+)(?:\.\d+)?)(pt|px|em|in)?$/;
                    if (reg.test(val)) {
                        //如果符合此正则，则按以下方式处理
                        var num = RegExp.$1;
                        var unit = RegExp.$2;
                        if (unit)
                        //如果是带单位的，则加上单位
                            val = num + unit;
                        else
                        //如果不带单位，则用默认的单位px
                            val = num + 'px';
                    }
                    style[attr] = val;
                    break;
                default :
                    style[attr] = val;
            }

        }
    };
utils.setGroupCss=function (curEle, object) {
    if (({}).toString.call(object) == "[object Object]") {
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                this.setCss(curEle, key, object[key]);
            }
        }
    }
}
