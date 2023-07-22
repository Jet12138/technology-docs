//用来模拟单个请求
function fetch(url) {
  return new Promise(function (res, rej) {
    setTimeout(() => {
      res(url);
    }, Math.random() * 1000);
  });
}

function multiRequest(urls, maxNum) {
  let arr = [];
  let i = 0;

  return new Promise(function (res, rej) {
    //第一次塞满maxNum个请求，之后的一个请求完毕后再塞入下一个。
    for (; i < maxNum; i++) {
      addTask();
    }

    function addTask() {
      arr[i] = fetch(urls[i]);
      arr[i].then((val) => {
        if (i >= urls.length) {
          res(arr);
        }
        if (i < urls.length) {
          addTask();
        }

        i++;
      });
    }
  }).then(() => Promise.all(arr).then((val) => console.log(val)));
}

//  https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/378
function multiRequest2(urls, maxNum) {
  let i = 0;
  let res = [];
  return new Promise((r) => {
    for (; i < maxNum; i++) {
      addTask();
    }
    function addTask() {
      res[i] = fetch(urls[i]);
      res[i].then((res) => {
        i >= urls.length && r();
        i < urls.length && addTask();
        i++;
      });
    }
  }).then(() => {
    Promise.all(res).then((ans) => {
      console.log(ans);
    });
  });
}
function fetch2(url) {
  return new Promise((resolve) => {
    let start = new Date();
    setTimeout(() => {
      resolve(`start: ${start};end: ${new Date()}`);
    }, 1000 * Math.random());
  });
}
multiRequest([1, 2, 3, 4, 5, 6, 7, 8, 9], 3);
