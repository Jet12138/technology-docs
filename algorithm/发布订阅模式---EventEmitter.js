class EventEmitter {
    constructor() {
        this._events = {};   //创建一个新对象来存放所有被监听的事件和处理函数
    }

    on(event, callback) {   //监听event事件，触发时调用callback函数
        let callbacks = this._events[event] || [];//判断event事件是否已有其他事件处理函数，没有则为空数组
        callbacks.push(callback);
        this._events[event] = callbacks;
        return this;
    }

    off(event, callback) {  //取消订阅。停止callback对event事件的订阅
        if (!callback) { //如果callback回调函数为undefined,则删除event对应的所有，即callbacks
            delete this._events[event];
            return this;
        }
        let callbacks = this._events[event];
        //如果event事件内存在事件处理函数，就查找其中是否有callback函数并把它过滤掉。
        this._events[event] = callbacks.filter(fn => fn !== callback);
        return this;
    }

    emit(event, ...args) {  //触发事件，并把参数传给事件的处理函数
        const callbacks = this._events[event];
        callbacks.map(cb => cb(...args));
        return this;
    }

    once(event, callback) {  //为事件注册单次监听器
        let wrap = (...args) => {          //创建一个wrapFanc函数实现单次调用后停止监听
            callback.apply(this, args);
            this.off(event, wrap);    //执行wrap后停止监听事件
        };
        this.on(event, wrap);
        return this;
    }
}

export default EventEmitter;   //将这个类暴露出去
