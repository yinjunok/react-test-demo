# 前端自动化测试案例

![前端自动化测试](./react-test-demo.gif)

## 自动化测试的作用

   符合 DRY(don't repeat yourself) 的原则.   
   不管是不是自动化测试, 测试这一项是不可避免的. 软件不可能一次编写就能完全按照预期运行. 大都是边写边测. 无非是自动和手动测试的区别.

   完全手动测试, 缺点很明显, 就是要人不断重复一样的测试项, 靠人去记忆功能的测试点, 有条理的测试人员会写文档记下哪些需要测的.
   就算是有测试文档, 也很容易有遗漏项. 而且重复干一件事, 会很磨人的耐性.
   自动化测试就就没有这些缺点, 因为功能测试点, 都写在测试代码里, 脚本自动运行. 测试用例编写完后只需要运行一条命令就能自动跑所有测试点. 还可以自动生成测试报告.

## 改怎么编写测试用例

写测试用例的时候只需要想着, 期待这段代码执行得到什么结果, 不应该得到什么结果.

```js
describe('indexOf', () => {
  it('值在数组里, 应该返回索引', () => {
    expect([1, 2, 3].indexOf(3)).toBe(2);
  });

  it('值不在数组里, 应该返回 -1', () => {
    expect([1, 2, 3].indexOf(4)).toBe(-1);
  });
});
```

## 所用工具

### [jest](https://jestjs.io/zh-Hans/)

jest 是 FB 出的一个测试框架.  

**断言**  

```js
function add(a, b) {
  return a + b;
}

expect(add(1 + 2)).toBe(3);
```

**函数模拟**  

可以用来测试函数运行时的各种状态, 比如被传入的参数是否符合预期.
```js
function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

const mockCallback = jest.fn(x => 42 + x);
forEach([0, 1], mockCallback);

expect(mockCallback.mock.calls.length).toBe(2);
```

### [enzyme](https://airbnb.io/enzyme/)

enzyme 是 airbnb 出的测试 React 应用的库. React 本身就搭配了测试工具: http://react.html.cn/docs/test-utils.html   
但是提供的工具还是太少, 而且使用起来没有 enzyme 方便. jest + enzyme 搭配用来测试 React 更方便.

**渲染测试**  

关于渲染, enzyme 提供了三个 API 帮助我们测试渲染:
* shallow 
* mount
* render
  
他们的区别:   
render 采用的是第三方库 Cheerio 的渲染，渲染结果是普通的 html 结构.  
shallow 和 mount 对组件的渲染结果不是 html 的 dom 树，而是 react 树.  
shallow 只渲染当前组件，只能能对当前组件做断言；mount会渲染当前组件以及所有子组件.  
shallow 也不会调用 componentDidMount 和 componentDidUpdate 方法. 如果需要使用这两个方法, 那么需要用 mount.  

测试渲染 Jest 里提供的案例用的 snapshot, 但是我觉得用 snapshot 在前端意义不是很大. 因为跟界面相关的东西改动实
在太频繁里, 无论是设计师, PM, 还是领导都能对界面 BB 两句. 只要有一个空格不同, 生成的 snapshot 就会跟之前不一样, 通不过断言. 我觉得应该测试渲染逻辑是否符合预期.

比如 ListPanel 这个组件, 当我们传入 5 个 todo 的时候, 它应该渲染出 5 个 ListItem 组件. 至于它内部的 dom 细节, 即使再怎么重构, 它也是要渲染 5 个 TodoItem.
```js
describe('渲染测试', () => {
  it('渲染测试', () => {
    const todoList = createTodoList(5);
    const panel = shallow(
      <ListPanel
        show='all'
        todoList={todoList}
        update={() => {}}
        deleted={() => {}}
      />
    );

    expect(panel.find(ListItem).length).toBe(5);
  });
});
```

**交互测试**  
enzyme 使用 simulate 来模拟用户操作. 这个需要配合我们使用 jest 提供的 mock 函数功能来检查, 相应回调是否正常调用.

```js
describe('功能测试', () => {
  it('addTodo 回调, 点击 button', () => {
    const addTodo = jest.fn(content => content);
    const input = mount(<Input addTodo={addTodo} />);

    input.setState({ content: '测试文字' });
    input.find('button').at(0).simulate('click');
    expect(input.state('content')).toBe('');

    // 判断传入回调的值是否符合预期
    expect(addTodo.mock.calls[0][0]).toBe('测试文字');
  });
});
```


### [Puppeteer](https://zhaoqize.github.io/puppeteer-api-zh_CN/#/)

Puppeteer 是一个 Node 库，它提供了一个高级 API 来通过 DevTools 协议控制 Chromium 或 Chrome。
主要用来模拟用户的操作. 有了 jest 和 enzyme. 为什么还需要使用 Puppeteer 呢.

1. 实际界面测试. enzyme 没有渲染样式的能力, window 和 document 上相关的交互(resize, scroll, mousemove 等事件)也很难测试(至少我谷歌了很久也没发现解决办法), 所以一些重交互的界面很难测试完全.
   
2. 完整的测试用户的操作. 可以模拟用户的所有操作, 比如页面跳转, 拖动鼠标, 这些能力都是 enzyme 不具备的.

用来模拟用户操作还有其他库, 比如:   
* [phantomjs](https://github.com/ariya/phantomjs)  
* [selenium](https://github.com/SeleniumHQ/selenium) 

phantomjs 已经不再维护, 所以不用考虑.  
selenium 是一个驱动各个浏览器的框架, chrome, firefox IE Edge, safari 主流的浏览器都可以用它来驱动, 而且可以支持多种语言比如 java, python, js.

要更全面的测试各个浏览器兼容性, selenium 无疑是不二之选. 但是我没有使用它的原因是因为, 1. 它 JS 的文档有点不大友好, 感觉很久没更新里, 照着文档走, 代码跑不起来. 2. selenium 虽然可以用其他语言, 但是我不想这么做. 

