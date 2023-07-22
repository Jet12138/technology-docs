Function.prototype.myCall = function (thisArg, ...args){
    let fn = Symbol('fn');
    thisArg = thisArg || window;
    thisArg[fn] = this;
    const res = thisArg[fn](...args);
    delete thisArg[fn];
    return res;
}

Function.prototype.myApply = function (thisArg, args){
    const fn = Symbol('fn');
    thisArg = thisArg || window;
    thisArg[fn] = this;
    const res = thisArg[fn](...args);
    delete thisArg[fn];
    return res;
}

Function.prototype._call = function (context){
    context = context ? Object(context) : window;
    context.fn = this;
    let args = [...arguments].slice(1);
    let res = context.fn(...args);
    delete context.fn;
    return res;
}

Function.prototype._apply = function(context, args){
    context = context ? Object(context) : window;
    context.fn = this;

    let res;
    if(!args){
        res = context.fn();
    }else{
        res = context.fn(...args);
    }
    delete context.fn;
    return res;
}


Function.prototype.myBind = function(){
    let context = arguments[0];
    let fn = this;
    let bindargs = Array.prototype.slice.call(arguments, 1);
    return function(){
        let fnargs = Array.prototype.slice.call(argumets);
        return fn.apply(context, bindargs.concat(fnargs));
    }
}


// flatten  flatten2
function flatten(arr){
    let res = [];
    for(let el of arr){
        if(Array.isArray(el)){
            res= res.concat(flatten(el));
        }else{
            res.push(el);
        }
    }
    return res;
}


function flatten2(arr, res=[]){
    for(let el of arr){
        if(Array.isArray(el)){
            flatten2(el, res);
        }else{
            res.push(el);
        }
    }

    return res;
}

let arr = [1, [2, [3,4], 5], 6, [7, 8]]
console.log(flatten(arr, []));