// https://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance_continued.html

// 浅拷贝
function shallowCopy(p){
    var c = {};
    for(var i in p){
        c[i] = p[i];
    }
    return c;
}

// 深拷贝
function deepCopy(target, c){
    var c = c || {};
    for(var i in target){
        if(typeof target[i] === 'object'){
            c[i] = (target[i].constructor=== Array ) ? [] : {};
            deepCopy(target[i], c[i]);
        }else{
            c[i] = target[i];
        }
    }

    return c;
}