# Vue-router v4.x

# **1.入门章节里的 router 初始化过程发生了变化；**

> (1).改用了 VueRouter.createRouter()
> (2). mode 属性改为了 history 属性，并用 VueRouter.createWebHashHistory()方法；

创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单

```
const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})
```

用 createWebHistory() 创建 HTML5 模式，推荐使用这个模式

```
history: createWebHistory(),
```

# **2. 动态路由匹配章节**

> (1)常规参数只匹配 url 片段之间的字符，用 / 分隔。如果我们想匹配任意路径，我们可以使用自定义的 路径参数 正则表达式，在 路径参数 后面的括号中加入 正则表达式 :

```
const routes = [
    // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    // 将匹配以 `/user-` 开头的所有内容，并将其放在 `$route.params.afterUser` 下
    { path: '/user-:afterUser(.*)', component: UserGeneric },
]
```

# **3. 重定向和别名 章节**

> 请注意，导航守卫并没有应用在跳转路由上，而仅仅应用在其目标上。在下面的例子中，在 /home 路由中添加 beforeEnter 守卫不会有任何效果。

在写 redirect 的时候，可以省略 component 配置，因为它从来没有被直接访问过，所以没有组件要渲染。唯一的例外是嵌套路由：如果一个路由记录有 children 和 redirect 属性，它也应该有 component 属性。

重定向（redirect）的写法甚至可以是一个方法，动态返回重定向目标：

```
const routes = [
  {
    // /search/screens -> /search?q=screens
    path: '/search/:searchText',
    redirect: to => {
      // 方法接收目标路由作为参数
      // return 重定向的字符串路径/路径对象
      return { path: '/search', query: { q: to.params.searchText } }
    },
  },
  {
    path: '/search',
    // ...
  },
]
```

通过别名，你可以自由地将 UI 结构映射到一个任意的 URL，而不受配置的嵌套结构的限制。使别名以 / 开头，以使嵌套路径中的路径成为绝对路径。你甚至可以将两者结合起来，用一个数组提供多个别名：

```
const routes = [
  {
    path: '/users',
    component: UsersLayout,
    children: [
      // 为这 3 个 URL 呈现 UserList
      // - /users
      // - /users/list
      // - /people
      { path: '', component: UserList, alias: ['/people', 'list'] },
    ],
  },
]
```

# **4.路由组件传参**

> 在你的组件中使用 $route 会与路由紧密耦合，这限制了组件的灵活性，因为它只能用于特定的 URL。虽然这不一定是件坏事，但我们可以通过 props 配置来解除这种行为：

我们可以将下面的代码

```
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
const routes = [{ path: '/user/:id', component: User }]
```

替换成

```
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const routes = [{ path: '/user/:id', component: User, props: true }]

//当 props 设置为 true 时，route.params 将被设置为组件的 props。
```

> 对象模式
> 当 props 是一个对象时，它将原样设置为组件 props。当 props 是静态的时候很有用。

> 函数模式
> 你可以创建一个返回 props 的函数。这允许你将参数转换为其他类型，将静态值与基于路由的值相结合等等。

```
//URL  /search?q=vue 将传递 {query: 'vue'} 作为 props 传给 SearchUser 组件。

const routes = [
  {
    path: '/search',
    component: SearchUser,
    props: route => ({ query: route.query.q })
  }
]
```

# **5.导航守卫**

> 全局前置守卫的 router.beforeEach() 方法里 **_不推荐_** 使用第三个参数 next ,改为在方法的最后 return true/false 来控制导航；

```
const router = createRouter({ ... })

router.beforeEach((to, from) => {
  // ...
  // 返回 false 以取消导航
  return false
})
```

> 当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于等待中。

> 你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身：

```
router.afterEach((to, from) => {
  sendToAnalytics(to.fullPath)
})
```

> 它们对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用。
> 它们也反映了 navigation failures 作为第三个参数：

```
router.afterEach((to, from, failure) => {
  if (!failure) sendToAnalytics(to.fullPath)
})
```

> 路由独享的守卫：
> beforeEnter 守卫 只在进入路由时触发，不会在 params、query 或 hash 改变时触发。也是取消了第三个参数 next 。

> 组件内的守卫:

-   beforeRouteEnter
-   beforeRouteUpdate
-   beforeRouteLeave

注意 beforeRouteEnter 是支持给 next 传递回调的唯一守卫。对于 beforeRouteUpdate 和 beforeRouteLeave 来说，this 已经可用了，所以不支持 传递回调，因为没有必要了,也就是说 beforeRouteUpdate 和 beforeRouteLeave 取消了第三个参数 next，只剩下了两个参数：to, from。
这个 离开守卫（beforeRouteLeave） 通常用来预防用户在还未保存修改前突然离开。该导航可以通过返回 false 来取消导航。

# **6. 滚动行为**

> savedPosition，只有当这是一个 popstate 导航时才可用（由浏览器的后退/前进按钮触发）。该函数可以返回一个 ScrollToOptions 位置对象;
> 你也可以通过 el 传递一个 CSS 选择器或一个 DOM 元素。在这种情况下，top 和 left 将被视为该元素的相对偏移量。
> 如果返回一个 falsy 的值，或者是一个空对象，那么不会发生滚动。返回 savedPosition，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样。示例如下:

```
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // 始终在元素 #main 上方滚动 10px
    return {
      // 也可以这么写
      // el: document.getElementById('main'),
      el: '#main',
      top: -10,
    }
  },
})
```

> 如果你要模拟 “滚动到锚点” 的行为：

```
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
  },
})
```

### 延迟滚动

> 有时候，我们需要在页面中滚动之前稍作等待。例如，当处理过渡时，我们希望等待过渡结束后再滚动。要做到这一点，你可以返回一个 Promise，它可以返回所需的位置描述符。下面是一个例子，我们在滚动前等待 500ms：

```
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 })
      }, 500)
    })
  },
})
```

# **7. 导航故障**

> 虽然大多数链接的预期行为是将用户导航到一个新页面，但也有少数情况下用户将留在同一页面上：

-   用户已经位于他们正在尝试导航到的页面
-   一个导航守卫通过调用 return false 中断了这次导航
-   当前的导航守卫还没有完成时，一个新的导航守卫会出现了
-   一个导航守卫通过返回一个新的位置，重定向到其他地方 (例如，return '/login')
-   一个导航守卫抛出了一个 Error

> 如果导航被阻止，导致用户停留在同一个页面上，由 router.push 返回的 Promise 的解析值将是 Navigation Failure。否则，它将是一个 falsy 值(通常是 undefined)。这样我们就可以区分我们导航是否离开了当前位置：

```
const navigationResult = await router.push('/my-profile')

if (navigationResult) {
  // 导航被阻止
} else {
  // 导航成功 (包括重新导航的情况)
  this.isMenuOpen = false
}
```

> Navigation Failure 是带有一些额外属性的 Error 实例，这些属性为我们提供了足够的信息，让我们知道哪些导航被阻止了以及为什么被阻止了。要检查导航结果的性质，请使用 isNavigationFailure 函数：

```
import { NavigationFailureType, isNavigationFailure } from 'vue-router'

// 试图离开未保存的编辑文本界面
const failure = await router.push('/articles/2')

if (isNavigationFailure(failure, NavigationFailureType.aborted)) {
  // 给用户显示一个小通知
  showToast('You have unsaved changes, discard and leave anyway?')
}
```

> > TIP:
> > 如果你忽略第二个参数： isNavigationFailure(failure)，那么就只会检查这个 failure 是不是一个 Navigation Failure。

> 正如我们在一开始所说的，有不同的情况会导致导航的中止，所有这些情况都会导致不同的 Navigation Failure。它们可以用 isNavigationFailure 和 NavigationFailureType 来区分。总共有三种不同的类型：

-   aborted：在导航守卫中返回 false 中断了本次导航。
-   cancelled： 在当前导航还没有完成之前又有了一个新的导航。比如，在等待导航守卫的过程中又调用了 router.push。
-   duplicated：导航被阻止，因为我们已经在目标位置了。

> 所有的导航失败都会暴露 to 和 from 属性，以反映失败导航的当前位置和目标位置：

```
// 正在尝试访问 admin 页面
router.push('/admin').then(failure => {
  if (isNavigationFailure(failure, NavigationFailureType.redirected)) {
    failure.to.path // '/admin'
    failure.from.path // '/'
  }
})
//在所有情况下，to 和 from 都是规范化的路由地址。
```
