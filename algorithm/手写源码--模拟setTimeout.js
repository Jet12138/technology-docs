let _setTimeout = function(fn, timeout, ...args){
    const start = +new Date();
    let time, now ;
    const loop = () =>{
        timer = window.requestAnimationFrame(loop);
        now = +new Date();
        if(now - start >= timeout){
            fn.apply(this, args);
            window.cancelAnimationFrame(timer);
        }
    }
    window.requestAnimationFrame(loop);
}

let showName = ()=>{
    console.log('Hello World!')
}

_setTimeout(showName, 2000);