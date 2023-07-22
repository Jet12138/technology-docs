// https://github.com/sisterAn/JavaScript-Algorithms/issues/106

function createFlow(...effects){
    let tasks = [...effects.flat(Infinity)];
    async function run(cb){
        for(let task of tasks){
            if(task.isFlow){ // 如果是嵌套，执行嵌套函数
                await task.run();
            }else{
                await task();
            }
        }

        if(cb) cb();
    } 

    return {
        run,
        isFlow:true
    }
}

// function createFlow(effects = []) {
//     return new Flow(effects)
// }

// 测试
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const subFlow = createFlow([() => delay(1000).then(() => console.log("c"))]);

createFlow([
  () => console.log("a"),
  () => console.log("b"),
  subFlow,
  [() => delay(1000).then(() => console.log("d")) , () => console.log("e")],
]).run(() => {
  console.log("done");
});

// a,b,延迟1秒,c,延迟1秒,d,e, done 的顺序打印