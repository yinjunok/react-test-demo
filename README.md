# 前端自动化测试案例
![前端自动化测试](./react-test-demo.gif)

## 所用工具

### [jest](https://jestjs.io/zh-Hans/)

jest 是 FB 出的一个测试框架.  
```js
// 入门案例
function add(a, b) {
  return a + b;
}

expect(add(1 + 2)).toBe(3);
```

### [enzyme](https://airbnb.io/enzyme/)

enzyme 是 airbnb 出的测试 React 应用的库. React 本身就搭配了测试工具: http://react.html.cn/docs/test-utils.html   
但是提供的工具还是太少, 而且使用起来没有 enzyme 方便. jest + enzyme 搭配用来测试 React 更方便.

### [Puppeteer](https://zhaoqize.github.io/puppeteer-api-zh_CN/#/)

Puppeteer 是一个 Node 库，它提供了一个高级 API 来通过 DevTools 协议控制 Chromium 或 Chrome。
主要用来模拟用户的操作. 有了 jest 和 enzyme. 为什么还需要使用 Puppeteer 呢.

1. 实际界面测试. enzyme 没有渲染界面的能力. 所以一些重交互的界面很难测试完全.
2. 完整的测试用户的操作. 可以模拟用户的所有操作, 比如页面跳转, 表单填写. 这些能力都是 enzyme 不具备的.

用来模拟用户操作还有其他库, 比如 [phantomjs](https://github.com/ariya/phantomjs) [selenium]https://github.com/SeleniumHQ/selenium 

phantomjs 已经不再维护, 所以不用考虑.  
selenium 是一个驱动各个浏览器的框架, chrome, firefox IE Edge, safari 主流的浏览器都可以用它来驱动, 而且可以支持多种语言比如 java, python, js.
要更全面的测试各个浏览器兼容性, selenium 无疑是不二之选. 但是我没有使用它的原因是因为, 它的文档有点不大友好.


