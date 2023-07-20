// 1. 用apply模拟bind方法
Function.prototype.bind = function () {
    let slice = Array.prototype.slice;
    let _this = this;                          // 函数---将要执行的那个函数
    let thisArg = arguments[0];         // this的值：也叫函数作用域，也叫上下文环境，也有人叫执行环境
    let args = slice.call(arguments, 1);  // bind时剩余的参数，函数执行时的前半段参数
    return function () {
        let fnargs = slice.call(arguments);  //函数执行时的后半段参数
        return _this.apply(thisArg, args.concat(fnargs));    //函数通过apply来执行时，1.指定作用域，即this的值； 2.配上完整的参数
    }
};


//参考来自polyfill : https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
// if (!Function.prototype.bind) (function(){
//   var slice = Array.prototype.slice;
//   Function.prototype.bind = function() {
//     var thatFunc = this, thatArg = arguments[0];
//     var args = slice.call(arguments, 1);
//     if (typeof thatFunc !== 'function') {
//       // closest thing possible to the ECMAScript 5
//       // internal IsCallable function
//       throw new TypeError('Function.prototype.bind - ' +
//         'what is trying to be bound is not callable');
//     }
//     return function(){
//       var funcArgs = args.concat(slice.call(arguments))
//       return thatFunc.apply(thatArg, funcArgs);
//     };
//   };
// })();

// 2. 实现call方法  ,来自： https://www.cnblogs.com/620chang/p/12699102.html
Function.prototype.myCall = function (thisArg, ...args) {
    const fn = Symbol('fn');       // 声明一个独有的Symbol属性, 防止fn覆盖已有属性
    thisArg = thisArg || window;    // 若没有传入this, 默认绑定window对象
    thisArg[fn] = this;              //改变的this的指向，把this赋给执行环境的一个属性，这时： 执行保存的函数( 即： this() ),这个时候作用域就是在thisArg的作用域下执行，
    const result = thisArg[fn](...args);  // 执行当前函数
    delete thisArg[fn];              // 删除刚才新增的属性值
    return result                  // 返回函数执行结果
};

// //测试
// foo.myCall(obj)


//  3. 实现一个apply，跟call相似，把参数列表改为参数数组

// 下面的this代表的含义是某个funcition (Function的实例)
Function.prototype.myApply = function (thisArg, args) {
    const fn = Symbol('fn');       // 声明一个独有的Symbol属性, 防止fn覆盖已有属性
    thisArg = thisArg || window;    // 若没有传入this, 默认绑定window对象
    thisArg[fn] = this;          // this指向调用call的对象,即我们要改变this指向的函数
    const result = thisArg[fn](...args);  // 执行当前函数
    delete thisArg[fn];             // 删除我们声明的fn属性
    return result                  // 返回函数执行结果
};

// //测试
// foo.myApply(obj, [])
