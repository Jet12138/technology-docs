# 2021-5-13， Vue 插件的一般编写顺序：

# 资料来源：

# 1. [单文件组件 export 出来的是什么东西](https://vue-loader.vuejs.org/zh/spec.html#%E8%AF%AD%E8%A8%80%E5%9D%97 )

即：编写顺序的第一步，往往是 import TheComponent from '/path/to/TheComponent.vue' ;
而从 TheComponent.vue文件里 export 出来的（默认导出的）是一个Vue.js 的组件选项对象（其他的还可以添加自定义块来导出用来实现项目的特定需求），这个选项对象是经过 vue-loader 在内的一系列 loader处理后的。

---
 请注意上面网址里的下列描述内容，以加深理解：

**vue-loader 会解析文件，提取每个语言块，如有必要会通过其它 loader 处理，最后将他们组装成一个 ES Module，它的默认导出是一个 Vue.js 组件选项的对象。**

> 模板
*  每个 .vue 文件最多包含一个 `<template>` 块。

*  **内容将被提取并传递给 vue-template-compiler 为字符串，预处理为 JavaScript 渲染函数，并最终注入到从 `<script>` 导出的组件中。**

> 脚本

*  **它的默认导出应该是一个 Vue.js 的组件选项对象。也可以导出由 Vue.extend() 创建的扩展对象，但是普通对象是更好的选择。**

* 任何匹配 .js 文件 (或通过它的 lang 特性指定的扩展名) 的 webpack 规则都将会运用到这个 `<script>` 块的内容中。
---

# 2. Vue.extend(TheComponent);

Vue.extend()的资料来源：
>> (1)[Vue-loader官网/单文件组件规范关于Vue.extend()的描述](https://vue-loader.vuejs.org/zh/spec.html#%E8%AF%AD%E8%A8%80%E5%9D%97)

>> (2) [Vue.js/v2 官网关于Vue.extend()的介绍](https://cn.vuejs.org/v2/api/#Vue-extend)



>> Vue.extend( options )
* 参数：

{Object} options
* 用法：

**使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。**

data 选项是特例，需要注意 - 在 Vue.extend() 中它必须是函数
```
<div id="mount-point"></div>
```

```
// 创建构造器
var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// 创建 Profile 实例，并挂载到一个元素上。
new Profile().$mount('#mount-point')
```
结果如下：
```
<p>Walter White aka Heisenberg</p>
```

# 3. [使用插件](https://cn.vuejs.org/v2/guide/plugins.html)

通过全局方法 Vue.use() 使用插件。它需要在你调用 new Vue() 启动应用之前完成：
```
// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin)

new Vue({
  // ...组件选项
})
```
即： 调用 Vue.use(MyPlugin) 的时候，就是去执行了 MyPlugin.install(Vue)
也可以传入一个可选的选项对象：
```
Vue.use(MyPlugin, { someOption: true })
```
Vue.use 会自动阻止多次注册相同插件，届时即使多次调用也只会注册一次该插件。

所以在开发Vue.js 的插件时，Vue.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象：
```
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```


# 4. 理论部分上面讲完了，下面举一个例子，相关代码在E:/myself/xzjproject 下，代码主要看 /src/components/easytoast/index.js , 如下 :

```
import Vue from 'vue'
import EasyToastVue from './EasyToast'

export default {
  install(Vue, defaultOptions = {}) {
    // 重点， .vue 文件导出的是一个 Vue.js 的组件选项对象
    // 使用Vue.extend() 语法：通过基础 Vue 构造器，创建一个“子类”构造器
    const CONSTRUCTOR = Vue.extend(EasyToastVue)

    const CACHE = {}
    Object.assign(EasyToastVue.DEFAULT_OPT, defaultOptions)

    function toast(msg, options = {}) {
      options.message = msg

      // 创建 一个“子类”构造器的实例
      // 补充一个小知识 ， new Foo 等同于 new Foo(),也就是没有指定参数列表，Foo 不带任何参数调用的情况。---[来源：MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)
      let toast = CACHE[options.id] || (CACHE[options.id] = new CONSTRUCTOR)


      if (!toast.$el) {
        let vm = toast.$mount()
        document.querySelector(options.parent || 'body').appendChild(vm.$el)
      }
      toast.queue.push(options)
    }

    // 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。
    Vue.toast = Vue.prototype.$toast = toast
  }
}
```

```
// 在 /src/main.js 中使用
import TheToast from '@/components/easytoast/index';
Vue.use(TheToast);
```



