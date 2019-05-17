# webpack

* rules
// 这里是匹配条件，每个选项都接收一个正则表达式或字符串
// test 和 include 具有相同的作用，都是必须匹配选项
// exclude 是必不匹配选项（优先于 test 和 include）
// 最佳实践：
// - 只在 test 和 文件名匹配 中使用正则表达式
// - 在 include 和 exclude 中使用绝对路径数组
// - 尽量避免 exclude，更倾向于使用 include

* 入口
	* 入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部 依赖图(dependency graph) 的开始。进入入口起点后，
	* webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部 依赖图(dependency graph) 的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的.
	* 在 webpack < 4 的版本中，通常将 vendor 作为单独的入口起点添加到 entry 选项中，以将其编译为单独的文件（与 CommonsChunkPlugin 结合使用）。而在 webpack 4 中不鼓励这样做。而是使用 optimization.splitChunks 选项，将 vendor 和 app(应用程序) 模块分开，并为其创建一个单独的文件。不要 为 vendor 或其他不是执行起点创建 entry。

* 出口
	* 配置 output 选项可以控制 webpack 如何向硬盘写入编译文件。注意，即使可以存在多个 entry 起点，但只指定一个 output 配置。


* loader
	* 入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部 依赖图(dependency graph) 的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。
	* loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript 或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 import CSS文件！

* plugin
  * 插件是 webpack 生态系统的重要组成部分，为社区用户提供了一种强大方式来直接触及 webpack 的编译过程(compilation process)。插件能够 钩入(hook) 到在每个编译(compilation)中触发的所有关键事件。在编译的每一步，插件都具备完全访问 compiler 对象的能力，如果情况合适，还可以访问当前 compilation 对象。
  
* mode
	* 提供 mode 配置选项，告知 webpack 使用相应环境的内置优化。

*  webpack 配置是标准的 Node.js CommonJS 模块
*  webpack 模块 
	* ES2015 import 语句
	* CommonJS require() 语句
	* AMD define 和 require 语句
	* css/sass/less 文件中的 @import 语句。
	* 样式(url(...))或 HTML 文件(<img src=...>)中的图片链接

* optimization
	* 从 webpack 4 开始，会根据你选择的 mode 来执行不同的优化，不过所有的优化还是可以手动配置和重写。

* devtool
	* eval-source-map - 每个模块使用 eval() 执行，并且 source map 转换为 DataUrl 后添加到 eval() 中。初始化 source map 时比较慢，但是会在重新构建时提供比较快的速度，并且生成实际的文件。行数能够正确映射，因为会映射到原始代码中。它会生成用于开发环境的最佳品质的 source map。

* externals
	* 配置选项提供了「从输出的 bundle 中排除依赖」的方法
	* 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)。

* loader
	* 默认情况下，资源文件会被转化为 UTF-8 字符串，然后传给 loader。每一个 loader 都可以用 String 或者 Buffer 的形式传递它的处理结果。Complier 将会把它们在 loader 之间相互转换。

* 安装
	* 对于大多数项目，我们建议本地安装。这可以在引入突破式变更(breaking change)版本时，更容易分别升级项目。通常会通过运行一个或多个 npm scripts 以在本地 node_modules 目录中查找安装的 webpack，来运行 webpack ：node_modules/.bin/webpack 命令行；
	* npx 的原理很简单，就是运行的时候，会到node_modules/.bin路径和环境变量$PATH里面，检查命令是否存在。由于 npx 会检查环境变量$PATH，所以系统命令也可以调用。
	* Node 8.2/npm 5.2.0 以上版本提供的 npx 命令，可以运行在开始安装的 webpack package 中的 webpack 二进制文件（即 ./node_modules/.bin/webpack）
	* 不推荐全局安装 webpack。这会将你项目中的 webpack 锁定到指定版本，并且在使用不同的 webpack 版本的项目中，可能会导致构建失败。
	* 如果你使用 webpack v4+ 版本，你还需要安装 CLI。
	* 如果 webpack.config.js 存在，则 webpack 命令将默认选择使用它。我们在这里使用 --config 选项只是向你表明，可以传递任何名称的配置文件。这对于需要拆分成多个文件的复杂配置是非常有用
	*  webpack 这样的工具，将动态打包所有依赖（创建所谓的 依赖图(dependency graph)）。这是极好的创举，因为现在每个模块都可以明确表述它自身的依赖，可以避免打包未使用的模块。
	* 在 JavaScript 模块中 import 一个 CSS 文件，你需要安装 style-loader 和 css-loader;在使用 css-loader 时，import MyImage from './my-image.png'，url('./my-image.png')，而 html-loader 以相同的方式处理 `<img src="./my-image.png" />`
	* 清理 dist：在每次构建前清理 /dist 文件夹，这样只会生成用到的文件。clean-webpack-plugin；
	* webpack 通过 manifest，可以追踪所有模块到输出 bundle 之间的映射。WebpackManifestPlugin；

* webpack-dev-server 
	* webpack-dev-server 在编译之后不会写入到任何输出文件。而是将 bundle 文件保留在内存中，然后将它们 serve 到 server 中，就好像它们是挂载在 server 根路径上的真实文件一样。如果你的页面希望在其他不同路径中找到 bundle 文件，则可以通过 dev server 配置中的 publicPath 选项进行修改。
	* webpack-dev-middleware 是一个封装器(wrapper)，它可以把 webpack 处理过的文件发送到一个 server。
	* 如果你在技术选型中使用了 webpack-dev-middleware 而没有使用 webpack-dev-server，请使用 webpack-hot-middleware package，以在你的自定义 server 或应用程序上启用 HMR。

* tree shaking
	* tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块语法的 静态结构 特性;通过 package.json 的 "sideEffects" 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 "pure(纯的 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。;

* 保留一个 "common(通用)" 配置，webpack-merge ；

* 构建性能
	 * 对最少数量的必要模块使用 loader；而是使用 include 字段仅将 loader 应用在实际需要将其转换的模块所处路径；
	 * 引导时间(bootstrap) ；每个额外的 loader/plugin 都有其启动时间。尽量少使用工具。
	 * 解析；
	 * 减少编译结果的整体大小，以提高构建性能。尽量保持 chunk 体积小；
	 * thread-loader 可以将非常消耗资源的 loader 分流给一个 worker pool；
	 * 使用 cache-loader 启用持久化缓存。使用 package.json 中的 "postinstall" 清除缓存目录。

	* webpack 只能理解 JavaScript 和 JSON 文件