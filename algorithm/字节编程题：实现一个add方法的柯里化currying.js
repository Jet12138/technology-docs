// https://github.com/sisterAn/JavaScript-Algorithms/issues/103

function add(...args){
    const nums = [...args];
    function addFn(...args1){
        nums.push(...args1);
        return addFn;
    }
    addFn.value = ()=> nums.reduce((pre, val)=> pre+val);
    return addFn;
    
}


add(0)(1,2)(3).value(); // 6  ，已完成


// 第二种写法：currying：柯里化的写法

function add(...args){
    function _add(...args1){
        return add(...args, ...args1);
    }

    _add.value = ()=>{
        return args.reduce((pre, val)=> pre+val);
    } 

    return _add;
}


//另外附加柯里化的一些代码
// https://github.com/yygmind/blog/issues/37#:~:text=toString.call()%20%E3%80%82-,%E5%AE%9E%E7%8E%B0%20currying%20%E5%87%BD%E6%95%B0,-%E6%88%91%E4%BB%AC%E5%8F%AF%E4%BB%A5%E7%90%86%E8%A7%A3

// 柯里化
function currying(fn, length){
	length = length || fn.length;
	return function(...args){
		return args.length>length
				? fn.apply(this, args)
				: currying(fn.bind(this, ...args), length-args.length);
	}
}


//柯里化第二种箭头函数的写法
const currying = fn =>
	judge=(...args)=>
		args.length>=fn.length
		?fn(...args)
		: (...args1)=>judge(...args, ...args1)

;