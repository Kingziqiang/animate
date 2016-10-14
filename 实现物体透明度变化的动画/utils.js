var utils={};
utils.getCss=function (curEle,attr){
        if(window.getComputedStyle){
            return parseFloat(getComputedStyle(curEle,null)[attr]);
        }else{//IE�Ľ������
            if(attr=="opacity"){
                "alpha(opacity=67)"
                var reg=/alpha\(opacity=(\d+(?:\.\d+)?)\)/
                if(reg.test(curEle.style.filter)){
                    return RegExp.$1/100;
                }else{//���������ƥ�䣬���ʾû��дopacity���ԡ����Ĭ��ֵ1����
                    return 1;
                }
            }else
                return parseFloat(curEle.currentStyle[attr]);


    }

};

//setCss:  Set the current styles inline element;
utils.setCss=function (curEle, attr, val) {
    with (curEle) {//���with���÷��������Ͱ�ele������ǰ���������ˣ�������дÿһ��CSS����֮ǰ��дele.��
        switch (attr) {
            case 'float'://����float�ļ���������
                style['cssFloat'] = val;
                style['styleFloat'] = val;
                break;
            case 'opacity': //����͸���ȵļ���������
                //�����Ӧ�ô���һ�£���Ϊopacity��ֵ�ǽ���0��1֮���
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
                //��Щcss����ֵ���ص���Ƕ�����Ϊ���������Ի���max��������һ��
                var reg= /^(-?\d+(?:\.\d+)?)(pt|px|em|in)?$/;
                //����������Ҫ����һ�㣬�����жϴ�С����
                if (reg.test(val)) {
                    var num = RegExp.$1;//ȡ����һ������
                    var unit = RegExp.$2;//ȡ���ڶ������飺��λ����
                    num = Math.max(0, num);//�����������ֵ�Ǹ���������0
                    if (unit)//����е�λ������ϵ�λ�����û�е�λ������pxΪĬ�ϵ�λ
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
                //����������Ҫ����һ�㣬�����жϴ�С������.
                //���������Դ�����2.5em,22px,22,3pt,-10.6in������css��λ
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
