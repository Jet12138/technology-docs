Promise.prototype.retry = function (fn, times) {
  return new Promise(async function (resolve, reject) {
    while (times > 0) {
      try {
        let res = await fn();
        resolve(res);
        return;
      } catch (e) {
        if (times === 0) {
          reject(e);
        }
        times--;
      }
    }
  });
};

Promise.prototype
  .retry(() => console.log("a"), 3)
  .then((val) => console.log(val));

console.log("完毕");

//Promise.prototype.all
Promise.prototype.all = function (list) {
  let res = [];
  let count = 0;
  return new Prommise(function (resolve, reject) {
    list.forEach((item, index) => {
      Promise.resolve(item)
        .then((val) => {
          res[index] = val;
          count++;
          if (count === list.length) {
            resolve(res);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

//Promise.prototype.race
// https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/140#:~:text=Promise.race%20%3D%20function(promises)%7B%0A%20%20%20%20return%20new%20Promise((resolve%2C%20reject)%3D%3E%7B%0A%20%20%20%20%20%20%20%20for(let%20i%20of%20promises)%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20Promise.resolve(i).then(resolve%2C%20reject)%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D)%20%20%20%20%0A%7D
const PromiseRace = (promises) => {
  return new Promise((resolve, reject) => {
    for (const p of promises) {
      Promise.resolve(p).then(resolve).catch(reject);
    }
  });
};

//Promise.prototype.finally
Promise.prototype.finally = function (fn) {
  let P = this.constructor;
  return this.then(
    (value) => P.resolve(fn()).then(() => value),
    (err) =>
      P.resolve(fn()).then(() => {
        throw err;
      })
  );
};
