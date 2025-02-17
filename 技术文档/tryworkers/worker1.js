// MDN上的例子写法
onmessage = function (e) {
    console.log('Message received from 主线程 脚本');
    var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
    console.log('Posting message back to main script');
    postMessage(workerResult);
}

// 阮一峰的wangdoc.com上的写法：
self.addEventListener('message', function (e) {
    self.postMessage('You said: ' + e.data);
}, false);  
//上面代码中，self代表子线程自身，即子线程的全局对象。因此，等同于下面两种写法。
// wangdoc.com上 写法一：
this.addEventListener('message', function (e) {
    this.postMessage('You said: ' + e.data);
}, false);
//wangdoc.com上 写法二：
addEventListener('message', function (e) {
    postMessage('You said: ' + e.data);
}, false);



// Worker 内部如果要加载其他脚本，有一个专门的方法importScripts()。
// importScripts('script1.js');
// 该方法可以同时加载多个脚本。
// importScripts('script1.js', 'script2.js');



// 主线程可以监听 Worker 是否发生错误。如果发生错误，Worker 会触发主线程的error事件。
// 在主线程里面，可以部署如下代码：
// worker.onerror = function (event) {
//     console.log(
//         'ERROR: Line ', event.lineno, ' in ', event.filename, ': ', event.message
//     );
// };



// 使用完毕，为了节省系统资源，必须关闭 Worker。
// 主线程里面可以这样关闭 Worker：
// worker.terminate();
// Worker 线程（worker.js）里面可以这样关闭 Worker：
// self.close();

