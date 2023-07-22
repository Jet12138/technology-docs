//请写出输出内容

setTimeout(function() {
    console.log('setTimeout');
    async1();
}, 0)

async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
	console.log('async2');
}

console.log('script start');



setTimeout(function() {
    console.log('setTimeout after setTimeout!!!');
}, 0)

async1();

new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');

/*
* 注释： 中间的空行是为了便于区分，而实际运行中是没有下面这些空行的。请注意。

script start
async1 start
async2
promise1
script end
async1 end
promise2


setTimeout
async1 start
async2
async1 end


setTimeout after setTimeout!!!

*/
