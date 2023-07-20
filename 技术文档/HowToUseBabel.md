总结:
我们使用 @babel/cli 从终端运行 Babel，利用 @babel/polyfill 来模拟所有新的 JavaScript 功能，而 env preset 只对我们所使用的并且目标浏览器中缺失的功能进行代码转换和加载 polyfill。

#Babel 的功能是：如何将 ES2015+ 语法的 JavaScript 代码编译为能在当前浏览器上工作的代码。这将涉及到新语法的转换和缺失特性的修补。Babel 是一个编译器（输入源码 => 输出编译后的代码）。就像其他编译器一样，编译过程分为三个阶段：解析、转换和打印输出。
``` 整个配置过程包括：

1.运行以下命令安装所需的包（package）：

npm install --save-dev @babel/core @babel/cli @babel/preset-env   //Babel 的核心功能包含在 @babel/core 模块中, @babel/core是babel的核心库
npm install --save @babel/polyfill

// ps: @babel/polyfill 模块包含 core-js 和一个自定义的 regenerator runtime 来模拟完整的 ES2015+ 环境。
从 Babel 7.4.0 版本开始，这个软件包(@babel/polyfill )已经不建议使用了，建议直接包含 core-js/stable （用于模拟 ECMAScript 的功能）和 regenerator-runtime/runtime （需要使用转译后的生成器函数）:
>>> import "core-js/stable";
>>> import "regenerator-runtime/runtime"; // 注意，使用 --save 参数而不是 --save-dev，因为这是一个需要在你的源码之前运行的 polyfill。


幸运的是，我们所使用的 env preset 提供了一个 "useBuiltIns" 参数，当此参数设置为 "usage" 时，就会加载上面所提到的最后一个优化措施，也就是只包含你所需要的 polyfill。
ps: 如果使用了 @babel/polyfill 一定在 @babel/env 的 preset 的配置参数里设置 "useBuiltIns": "usage" 。
ps: 更进一步，对于软件库/工具的作者来说，@babel/polyfill 全局前置 polufill 的东西可能太多了。如果你不需要类似 Array.prototype.includes 的实例方法，可以使用 transform runtime 插件而不是对全局范围（global scope）造成污染的 @babel/polyfill。
ps: 更进一步地，如果你确切地指导你所需要的 polyfills 功能，你可以直接从 core-js 获取它们。

2.在项目的根目录下创建一个命名为 babel.config.json 的配置文件（需要 babel v7.8.0 或更高版本），并将以下内容复制到此文件中：

{
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1",
        },
        "useBuiltIns": "usage",  //如果我们不使用 env preset 的 "useBuiltIns" 参数（即设置为 "usage"），那么我们必须在所有代码之前通过 require 加载一次完整的 polyfill。
        "corejs": "3.6.5",
      }
    ]
  ]
}


###上述浏览器列表仅用于示例。根据你所需要支持的浏览器进行调整。###

如果你使用的是 Babel 的旧版本 (低于babel v7.8.0)，则文件名为 babel.config.js。

const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      useBuiltIns: "usage",
      "corejs": "3.6.4",
    },
  ],
];

module.exports = { presets };

3.
运行此命令将 src 目录下的所有代码编译到 lib 目录：

./node_modules/.bin/babel src --out-dir lib

ps:
你可以利用 npm@5.2.0 所自带的 npm 包运行器将 ./node_modules/.bin/babel 命令缩短为 npx babel 。
```

> *1.*  Babel 尽可能用最少的代码并且不依赖太大量的运行环境。
>>有些情况是很难达成的这一愿望的，因此 Babel 提供了 "loose" 选项，用以在特定的转换情况下在符合规范、文件大小和速度之间做折中。

> *2.*  Babel 尽可能用最少的代码并且不依赖太大量的运行环境。
>>有些情况是很难达成的这一愿望的，因此 Babel 提供了 "loose" 选项，用以在特定的转换情况下在符合规范、文件大小和速度之间做折中。


```
 3.CLI 命令行工具
   @babel/cli 是一个能够从终端（命令行）使用的工具。
   ######## 如果你想从命令行直接使用babel功能的话， ########
   下面是其安装命令和基本用法：

   npm install --save-dev @babel/core @babel/cli

   ./node_modules/.bin/babel src --out-dir lib

这将解析 src 目录下的所有 JavaScript 文件，并应用我们所指定的代码转换功能，然后把每个文件输出到 lib 目录下。由于我们还没有指定任何代码转换功能，所以输出的代码将与输入的代码相同（不保留原代码格式）。我们可以将我们所需要的代码转换功能作为参数传递进去。

上面的示例中我们使用了 --out-dir 参数。你可以通过 --help 参数来查看命令行工具所能接受的所有参数列表。但是现在对我们来说最重要的是 --plugins 和 --presets 这两个参数。
```

4. "preset" : 即一组预先设定的插件 (plugin) :
Babel 是一个编译器（输入源码 => 输出编译后的代码）。就像其他编译器一样，编译过程分为三个阶段：解析、转换和打印输出。
Babel 虽然开箱即用，但是什么动作都不做。它基本上类似于 const babel = code => code; ，将代码解析之后再输出同样的代码。如果想要 Babel 做一些实际的工作，就需要为其添加插件。
除了一个一个的添加插件，你还可以以 preset 的形式启用一组插件。

4-1: 插件顺序
     插件的排列顺序很重要。

     这意味着如果两个转换插件都将处理“程序（Program）”的某个代码片段，则将根据转换插件或 preset 的排列顺序依次执行。

     插件在 Presets 前运行。
     插件顺序从前往后排列，且按照这个顺序执行。
     Preset 顺序是颠倒的（指的是将按照从后往前顺序执行）。
4-1： 插件 (plugin )参数
     插件 (plugin)和 预设 (preset) 都可以接受参数，参数是一个数组，数组成员由 插件名字符串 [+ 参数对象 ]组成，
     如果不指定参数，下面这几种形式都是一样的：
     ```
     {
       "plugins": ["pluginA", ["pluginA"], ["pluginA", {}]]
     }
     ```

     要指定参数，请看包含参数对象的完整示例：
     ```
    {
      "plugins": [
        [
          "transform-async-to-module-method",
          {
            "module": "bluebird",
            "method": "coroutine"
          }
        ]
      ]
    }
     ```

     preset 的设置参数的工作原理与 plugin 完全相同：：
          ```
         {
           "plugins": [
             [
               "transform-async-to-module-method",
               {
                 "module": "bluebird",
                 "method": "coroutine"
               }
             ]
           ]
         }
          ```


5. 配置文件的样子：
   （1） babel.config.json
   在项目的根目录（package.json 文件所在的目录）下创建一个名为 babel.config.json （需要对应 babel v7.8.0 或更高版本）的文件，并输入如下内容。

   {
     "presets": [...],
     "plugins": [...]
   }
   （2）babel 低版本的还有 .babelrc  或者 babel.config.js 作为配置文件。
   （3）其他的各种我不使用的能产生同等效果的方法：
     >1   使用 .babelrc.json 文件
       在你的项目中创建名为 .babelrc.json 的文件，并输入以下内容。

       ```
       {
         "presets": [...],
         "plugins": [...]
       }
       ```

   >2   将 .babelrc.json 中的配置信息作为 babel 键（key）的值添加到 package.json 文件中，如下所示：
   ```
   {
     "name": "my-package",
     "version": "1.0.0",
     "babel": {
       "presets": [ ... ],
       "plugins": [ ... ],
     }
   }
    ```

    >3   用 JavaScript 编写配置文件,还可以调用 Node.js 的任何 API，例如基于进程环境进行动态配置:

       ```
       const presets = [ ... ];
       const plugins = [ ... ];

       if (process.env["ENV"] === "prod") {
         plugins.push(...);
       }

       module.exports = { presets, plugins };
        ```





