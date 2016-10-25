var utils={};
utils.getCss = function (curEle, attr) {
    var val = "getComputedStyle" in window ? window.getComputedStyle(curEle, null)[attr] : curEle.currentStyle[attr];
    var temp = parseFloat(val);
    return isNaN(temp) ? val : temp;
};
    utils.setCss=function(curEle,attr,val){
        with(curEle){//��curEle������ǰ�����������Ͳ�����ÿһ��css����ǰcurEle.�ˣ�
            switch(attr){
                //����float����������
                case 'float':
                    style['cssFloat']=val;
                    style['styleFloat']=val;
                    break;
                //����opacity����������
                case 'opacity':
                    //��val��0-1֮��
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
                    //��Щֵ������Ϊ������������Math.max����һ��
                    if (reg.test(val)) {
                        var num = RegExp.$1;//��ȡ��һ������
                        var unit = RegExp.$2;//��ȡ�ڶ�������
                        num = Math.max(0, num);//�����������һ����������0���棻
                        val = unit ? num + unit : num + "px";//���û����λ��Ĭ����px��
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
                    //��Щֵ����Ϊ����
                    var reg = /^(-?(?:\d|[1-9]\d+)(?:\.\d+)?)(pt|px|em|in)?$/;
                    if (reg.test(val)) {
                        //������ϴ����������·�ʽ����
                        var num = RegExp.$1;
                        var unit = RegExp.$2;
                        if (unit)
                        //����Ǵ���λ�ģ�����ϵ�λ
                            val = num + unit;
                        else
                        //���������λ������Ĭ�ϵĵ�λpx
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
