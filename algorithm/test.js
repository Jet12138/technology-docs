// 本文件作为测试算法的草稿，不重要，可以删除。

//4.编写一个函数 parseQueryString，它的用途是把 URL 参数解析为一个对象。
function parseQueryString(argu) {
    let str = argu.split('?')[1];
    let result = {};
    let temp = str.split("&");
    for (let i = 0; i < temp.length; i++) {
        let temp2 = temp[i].split('=');
        result[temp2[0]] = temp2[1];
    }
    return result;
}

//4-1.获取url里的参数
function getURLParam(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substring(1).match(reg);
    if (r != null) {
        return r[2];
    } else {
        return 0;
    }
}

function getUrlParam(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", 'i');
    let str = window.location.search.substring(1).match(reg);
    if (str !== null) {
        return r[2];
    } else {
        return 0;
    }
}


// 5、编写一个函数 flatten ，传入仅包含数字的多维数组，返回拍平后的结果。
// 如：传入 [1, [2, 3]] 返回 [1, 2, 3]。
function flatten(arr, result = []) {
    for (let elem of arr) {
        if (Array.isArray(elem)) {
            flatten(elem, result)
        } else {
            result.push(elem);
        }
    }
    return result;
}


//1、给Array对象增加一个原型方法，用于删除数组条目中重复的条目(可能有多个)，返回值是一个包含被删除的重复条目的新数组。
Array.prototype.del = function () {
    var arr = [];
    for (var i = 0; i < this.length; i++) {
        for (var j = i + 1; j < this.length; j++) {
            if (this[i] === this[j]) {
                arr.push(this.splice(j, 1)[0]);
                //this.slipce(j,1)就是删除第j个，就删除1个，[0]就是把删除的那个元素取出来，push到arr数组里。
            }
        }
    }
    return arr;
};

// 2、写个转换函数，把一个 JSON 对象的 key 从横杠形式（snake_case）转换到小驼峰形式（Pascal）
//短横线转换驼峰
function underline2hump(str) {
    return str.replace(/_(\w)/g, function (all, p1) {
        return p1.toUppercase();
    })
}

//驼峰转短横线
function hump2underline(str) {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}


//JSON对象的key值转换为驼峰式
function jsonToHump(obj) {
    if (obj instanceof Array) {
        obj.forEach(function (v, i) {
            jsonToHump(v);
        })
    } else if (obj instanceof Object) {
        Object.keys(obj).forEach(function (key) {
            let newKey = underline2hump(key);
            if (newKey !== key) {
                obj[newKey] = obj[key];
                delete obj[key];
            }
            jsonToHump(obj[newKey]);
        })
    }
}

//JSON对象的key值转换为下划线格式

function jsonToUnderline(obj) {
    if (obj instanceof Array) {
        jsonToUnderline(obj);
    } else if (obj instanceof Object) {
        Object.keys(obj).forEach(function (key) {
            let newKey = hump2underline(key);
            if (newKey !== key) {
                obj[newKey] = obj[key];
                delete obj[key];
            }
            jsonToUnderline(obj[newKey]);
        })
    }
}


//999. 深拷贝一个对象
function deepCopy(p, c = {}) {
    for (let i in p) {
        if (typeof p[i] === 'object') {
            c[i] = Array.isArray(p[i]) ? [] : {};
            deepCopy(p[i], c[i]);
        } else {
            c[i] = p[i]
        }
    }
    return c
}


// 3、写一个函数实现数字格式化输出，比如输入 999999999，输出为 999,999,999。
'999999999'.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,');

//面试题
// https://blog.csdn.net/kydkong/article/details/52494695?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-1.edu_weight&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-1.edu_weight


// 15. 实现超出整数存储范围的两个大整数相加function add(a,b)。注意a和b以及函数的返回值都是字符串。
// 链接：https://juejin.im/post/6844903745512275982
function add(a, b) {
    let lenA = a.length,
        lenB = b.length,
        len = lenA > lenB ? lenA : lenB;

    // 先补齐位数一致
    if (lenA > lenB) {
        for (let i = 0; i < lenA - lenB; i++) {
            b = '0' + b;
        }
    } else {
        for (let i = 0; i < lenB - lenA; i++) {
            a = '0' + a;
        }
    }

    let arrA = a.split('').reverse(),
        arrB = b.split('').reverse(),
        arr = [],
        carryAdd = 0;

    for (let i = 0; i < len; i++) {
        let temp = Number(arrA[i]) + Number(arrB[i]) + carryAdd;
        arr[i] = temp > 9 ? temp - 10 : temp;
        carryAdd = temp >= 10 ? 1 : 0;
    }

    if (carryAdd === 1) {
        arr[len] = 1;
    }

    return arr.reverse().join('');

}


//超大整数加法
function add2(a, b) {
    let lenA = a.length;
    let lenB = b.length;
    let len = lenA > lengB ? lenA : lenB;

    //先补齐短的数的数组，然后进行加法
    let arrA = a.split('').reverse();
    let arrB = b.split('').reverse();
    if (lenA > lenB) {
        for (let i = 0; i < lenA - lenB; i++) {
            arrB.push('0');
        }
    } else {
        for (let i = 0; i < lenB - lenA; i++) {
            arrA.push('0');
        }
    }

    let result = [];
    let temp = 0;
    let tempadd;
    for (let i = 0; i < len; i++) {
        tempadd = Number(arrA[i]) + Number(arrB[i]) + temp;
        if (tempadd > 9) {
            result.push(tempadd - 10);
            temp = 1;
        } else {
            result.push(tempadd);
            temp = 0;
        }
    }

    if (temp === 1) {
        result.push(1);
    }
    return result.reverse().join('');
}

// 11.运用JS设置cookie、读取cookie、删除cookie

//写cookies
function setCookie(name, value) {
    let Days = 30;
    let exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + encodeURIComponent()(value) + ";expires=" + exp.toGMTString();
}

//读取cookies
function getCookie(name) {
    let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    let arr = document.cookie.match(reg);
    if (arr !== null) {
        return decodeURIComponent(arr[2]);
    } else {
        return null;
    }
}

//删除cookies
function delCookie(name) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

// 10. 编写一个函数，使其支持找到目标字符串的第n个子字符串
// 网址： https://www.cnblogs.com/jingmin/p/6528545.html
function find(str, substr, n) {
    let x = str.indexOf(substr);
    for (let i = 0; i < n; i++) {
        x = str.indexOf(substr, x + 1);
    }
    return x;
}

// 11.  编写一段正则代码，规则：过滤掉字符串所有的空格、数字
str.replace(/[ ]|[0-9]/g, '');


