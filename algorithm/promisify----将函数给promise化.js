// 写法一：

function promisify(fn) {
  return function (...args) {
    return new Promise(function (resolve, reject) {
      args.push(function (err, data) {
        if (err) reject(err);

        resolve(data);
      });

      fn(...args);
    });
  };
}

//写法二：
function promisify(originFn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      let cb = (err, data) => (err ? reject(err) : resolve(data));

      originFn.call(this, ...args, cb);
    });
  };
}
