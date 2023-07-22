// debounce 防抖函数
function debounce(fn, wait, leading=false){
    let timer;
    let lastCallTime;
    let isInvoked = false;
    return function(...args){
        let context = this;
        let thisCallTime = Date.now();
        if(leading){
            if(!isInvoked){
                fn.apply(context, args);
                isInvoked = true;
            }

            if(this.CallTime - lastCallTime >= wait){
                fn.apply(context, args);
            }
            lastCallTime = Date.now();
        }

        clearTimeout(timer);
        timer = setTimeout(()=>fn.apply(context, args), wait);
    }
}

function debounce2(fn, wait=50, immediate=false){
    let timer = null;
    return function(...args){
        const context = this;
       
        if(timer) clearTimeout(timer);
        console.log(timer);

        if(immediate && !timer){
            fn.apply(context, args);
        }
        
        timer = setTimeout(()=>{ fn.apply(context, args)}, wait);
    }
}

// DEMO
// 执行 debounce 函数返回新函数
const betterFn = debounce2(() => console.log('fn 防抖执行了'), 1000, true)
// 第一次触发 scroll 执行一次 fn，后续只有在停止滑动 1 秒后才执行函数 fn
document.addEventListener('scroll', betterFn)



// throttle 节流  ; threshold: 阈， 门槛
function throttle(fn, threshold){
    let lastCallTime=0;
    let isInvoked = false;
    return function(...args){
        const context = this;
        const thisCallTime = Date.now();
        if(!isInvoked){
            fn.apply(context, args);
            lastCallTime = Date.now();
            isInvoked = true;
        }

        if(lastCallTime - thisCallTime >= threshold){
            fn.apply(context, args);
            lastCallTime = Date.now();
        }
    }
}

function throttle2(fn, wait = 50){
    let previous = 0;
    return function (...args) {
        const context = this;
        let now = Date.now();
        if(now - previoust > wait){
            fn.apply(context, args);
            previoust = Date.now();
        }
    }
}