## 运行环境
依赖于nodejs环境，和jest框架结合使用

## 运行
npm test(配置了运行脚本)

jest action.test.js(运行某个测试文件)

## 采用的框架或者工具
jest 

miniprogram-automator

## 优点
小程序自动化SDK

与任意Node.js测试框架结合使用（node环境）

可代码启动开发者工具运行测试脚本

借用开发者工具使用selector定位元素

可调用小程序wx对象上的方法

可模拟小程序wx对象上的方法

支持自定义组件事件触发

支持真机调试

## 注意点
需要被测试项目&开发者权限（开发者工具）

开启开发工具的安全端口

自定义组件通过callMethod方法触发事件

真机上不支持截图

页面跳转后等待时，使用上一页面的参数，非新页面的

跳转到tabbar页面只能用switchTab方法