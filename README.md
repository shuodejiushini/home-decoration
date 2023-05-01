## 目录介绍

**1. build**
build目录是自动生成的目录，所有项目使用的代码都会在这个目录下，也是开发获取静态页面等的唯一目录。

**2. html**
html目录是自动生成的目录，且不需要提交，格式化页面时使用。

**3. static**
static用于存放项目中的静态资源，且不是静态页面转动态页面时的必须素材，如：活动图片、视频等。

**4. target**
target目录为开发目录，如：html、css、js

	# 存放页面的公共模板
	./_includes

	# 模块结构
	./_includes/modules

	# 页面的样式
	./css

	# 公用(spice组件、字体、icon等样式)
	./css/common

	# 模块样式
	./css/modules

	#icon 目录，存放icon，icon变量、方法等生成所需
	./sprites

	#存放单个icon
	./sprites/icon


	# 页面的字体
	./fonts

	# 页面guideline
	./guideline

	# 页面公共图片，如：图标
	./images

	# 页面脚本
	./js

	# 插件库
	./libs

	# 邮件模板
	./mailtemplate

	# 所有页面
	./*.html

## 如何使用

**1. 安装nodejs环境**

**2. 安装淘宝NPM镜像**
	npm install -g cnpm --registry=https://registry.npm.taobao.org
	官网：https://npm.taobao.org/
	安装完成之后，npm 换成 cnpm

**3. 分别安装Grunt，已安装过的可以忽略**
	cnpm install gulp-cli -g

**4. 初始化项目依赖**
	cnpm install

**5. 运行项目**
	* 开发项目执行命令：gulp
	* 生成icon执行命令：gulp icon


## 项目实际使用

**1.提交前操作**
	1.先退出gulp
	2.检查build目录


**2.icon**
	注意：icon 必须存放两个(一倍图和两倍图)
	1.存放单个icon 于 sprites/icon  (必须是png格式 并且 文件名不能大写)
	2.运行grunt icon 生成 icon.png && icon@2x.png 于 images/
	3.在 css/common/icon.less 中引用 icon 变量和方法  @import "../../sprites/style/sprites.less";


**3.libs**
	注意：libs 只能由主开发进行更新、维护
	./libs 修改更新
	1.执行 gulp libs
	2.执行 gulp
	3.退出 gulp 模式
	4.检查build 目录，提交代码
