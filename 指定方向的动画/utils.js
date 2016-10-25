var utils={};
utils.getCss=function (curEle,attr){
    var val = typeof window.getComputedStyle == "function" ? getComputedStyle(curEle,null)[attr] : curEle.currentStyle[attr];
    if(attr=="opacity"){//处理IE8及以下透明度问题
        var reg=/alpha\(opacity=((?:\d|[1-9]\d+)(?:\.\d+)?)\)/;
        if(reg.test(curEle.style.filter)){
            return RegExp.$1/100;
        }else{
            return 1;
            //如果没有写opacit则把默认的1返回
        }
    }
    if(!isNaN(parseFloat(val))) val = parseFloat(val);
    return val;
};

//setCss:  Set the current styles inline element;
utils.setCss=function (curEle, attr, val) {
    with (curEle) {//理解with的用法，这样就把ele当作当前的作用域了，不必在写每一个CSS属性之前再写ele.了
        switch (attr) {
            case 'float'://处理float的兼容性问题
                style['cssFloat'] = val;
                style['styleFloat'] = val;
                break;
            case 'opacity': //处理不透明度的兼容性问题
                //这儿还应该处理一下，因为opacity的值是介于0和1之间的
                val = Math.max(0, val) && Math.min(1, val);
                style['opacity'] = val;
                style['filter'] = "alpha(opacity:" + val * 100 + ")";
                break;
            case 'width':
            case 'height':
            case 'paddingLeft':
            case 'paddingBottom':
            case 'paddingTop':
            case 'paddingRight':
            case 'borderLeftWidth':
            case 'borderRightWidth':
            case 'borderTopWidth':
            case 'borderBottomWidth':
                //这些css属性值的特点就是都不能为负数，所以会用max方法运算一下
                var reg= /^(-?\d+(?:\.\d+)?)(pt|px|em|in)?$/;
                //这个正则相对要完善一点，可以判断带小数的
                if (reg.test(val)) {
                    var num = RegExp.$1;//取出第一个分组
                    var unit = RegExp.$2;//取出第二个分组：单位部分
                    num = Math.max(0, num);//如果传进来的值是负数，则用0
                    if (unit)//如果有单位，则加上单位，如果没有单位，则以px为默认单位
                        val = num + unit;
                    else
                        val = num + 'px';
                }
                style[attr] = val;
                break;
            case 'marginLeft':
            case 'marginRight':
            case 'marginTop':
            case 'marginBottom':
            case 'right':
            case 'left':
            case 'top':
            case 'bottom':
                var reg = /^(-?\d+(?:\.\d+)?)(pt|px|em|in)?$/;
                //这个正则相对要完善一点，可以判断带小数的了.
                //这个正则可以处理象：2.5em,22px,22,3pt,-10.6in这样的css单位
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
            default:
                style[attr] = val;
        }
    }
}
//setGroupCss: Set the current batch inline styles;
utils.setGroupCss=function (curEle, object) {
    if (({}).toString.call(object) == "[object Object]") {
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                this.setCss(curEle, key, object[key]);
            }
        }
    }
}
