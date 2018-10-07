### 用[create-react-app](https://github.com/facebook/create-react-app)创建项目
```
npx create-react-app todomvc
```

### 使用todomvc模板和样式
+ 使用[todomvc-app-template](https://github.com/tastejs/todomvc-app-template/blob/master/index.html)中的section，注意JSX语法：1.注释，2.input自封闭，3.class=>className，4.autofocus=>autoFocus={true}，5.for=>htmlFor，6.checked=>defaultChecked，7.value=>defaultValue
+ 安装并引入[todomvc-app-css](https://github.com/tastejs/todomvc-app-css)

```javascript
// App.js
import "todomvc-app-css/index.css";
class App extends Component {
  render() {
    <section class="todoapp">
      ...
    </section>
  }
}
```

### 实现功能