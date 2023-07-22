// 用proxy写一个观察者模式
// https://es6.ruanyifeng.com/#docs/reflect#%E5%AE%9E%E4%BE%8B%EF%BC%9A%E4%BD%BF%E7%94%A8-Proxy-%E5%AE%9E%E7%8E%B0%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8F

const queuedObservers = new Set();

const observe = fn => queuedObservers.add(fn);

const observable = obj => new Proxy(obj, {set});

function set(target, key, value, receiver) {
	const result = Reflect.set(target, key, value, receiver);
	queuedObservers.forEach(observer => observer());
	return result;
}


// 用法：
const person = observable({
  name: "张三",
  age: 20,
});

function print(key, value) {
	console.log(`${person.name}, ${person.age}`);
}

observe(print);
person.name = "李四";


// 输出: 李四, 20