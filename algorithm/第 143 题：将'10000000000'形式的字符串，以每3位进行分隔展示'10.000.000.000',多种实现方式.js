// https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/296

"10000000000".replace(/(\d)(?=(\d{3})+$)/g, "$1.");
// 结果是： '10.000.000.000'

// 寻找数字并在其后面加 .
"10000000000".replace(/(\d)(?=(\d{3})+\b)/g, "$1.");
