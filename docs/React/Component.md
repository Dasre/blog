---
id: React Component
---

# Component

在 react 的 component 中，大致上可以分為 Class Component、Functional Component 兩種。

- Class Component 是使用 ES6 Class 的寫法宣告他，同時也可以使用 state 和自定義的 method。
- Functional Component 則是使用 function 的方式宣告他，但他沒有 state 且無法自定義 method，也就是只有 render 的狀況使用。而其 props 則是透過函數傳遞進來。

```javascript
//Class Component
class App extends Component{
    state = {
        width: 0,
    }

    addWidth = () => {
        ...
    }

    render(){
        const { width } = this.props;
        return(
            <div>
                <div style={{width: `${width}`}}>
            </div>
        )
    }
}
```

```javascript
//Functional Component
const App = (props) => {
    render(){
        const { width } = this.props;
        return(
            <div>
                <div style={{width: `${width}`}}>
            </div>
        )
    }
}
```

另外還有一種叫做 PureComponent，其寫法與 Class Component 相似，只要把 extends 後面改成 PureComponent 即可。

```javascript
//PureComponent
class App extends PureComponent{
    state = {
        width: 0,
    }

    addWidth = () => {
        ...
    }

    render(){
        const { width } = this.props;
        return(
            <div>
                <div style={{width: `${width}`}}>
            </div>
        )
    }
}
```

而 PureComponent 和 Class Component 主要是在效能上會有差異。

## 簡單來說如果傳入的 props 值不變或 state 值不變，PureComponent 就不會重新 render。但在 Class 和 Functional Component 都會重新 render。

至於 props 和 state 是否改變，是透過 shallow compare。
他只會比較 props 和 state 的第一層。

```javascript
class App extends Component{

    //state裡的width和border是第一層，color是第二層。
    state = {
        width: 0,
        border: {
            borderWidth: 1,
        }
    }

    //此add function在Class Component會重新render，在PureComponent則不會
    const add = () => {
        const {border} = this.state;
        border.borderWidth += 1;
        this.setState({
            border: border,
        })
    }
    render(){
        const { width } = this.props;
        return(
            <div>
                <div style={{width: `${width}`}}>
            </div>
        )
    }
}
```

## 小結

- 若 Component 內不會使用到 state 和自定義 method，可改用 Functional Component。
- PureComponet 可以解決重複 render 之問題，但前提要確認 state 或 props 的值改變只會在第一層。
