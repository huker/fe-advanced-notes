// 状态树 state
// 这样不好 appState对象还是可以被修改 那我们就要把它藏起来
// let appState = {
//     title: { text: '标题', color: 'red' },
//     content: { text: '内容', color: 'blue' }
// }

// 四个动作 修改颜色和文字
const UPDATE_TITLE_COLOR = 'UPDATE_TITLE_COLOR';
const UPDATE_TITLE_TEXT = 'UPDATE_TITLE_TEXT';
const UPDATE_CONTENT_COLOR = 'UPDATE_CONTENT_COLOR';
const UPDATE_CONTENT_TEXT = 'UPDATE_CONTENT_TEXT';

// 让getState 和 dispatch变成仓库里的方法 并且通过reducer这个管理员来操作
function createStore(reducer) {
    // 两个函数引用了state变量 就在作用域里不会被销毁 形成了闭包
    let state;
    let listeners = [];
    function getState() {
        return state
    }
    // 派发 action 是有格式要求的 
    // 1.是个纯对象 2.type属性-要做的动作 3.payload属性-传的值
    function dispatch(action) {
        state = reducer(state, action);
        listeners.map(item => item());
    }
    // 发布订阅模式 订阅render方法 派发动作的时候触发
    function subscribe(listener) {
        listeners.push(listener);
        // 返回值是一个取消订阅的函数
        return function () {
            // 过滤 把自己从订阅者里面删掉
            listeners = listeners.filter((item) => item !== listener)
        }
    }
    // 上面state是空 getstate拿到的也是空
    // 所以 创建仓库的时候先派发一个动作 初始一下state
    // @@REDUX/INIT非用户自己定义的 所以会走default 初次进去state没有值 就会赋予initstate的值 就初始化成功了
    dispatch({ type: '@@REDUX/INIT' });
    return {
        getState,
        dispatch,
        subscribe
    }
}
let initState = {
    title: { text: '标题', color: 'red' },
    content: { text: '内容', color: 'blue' }
}
// 接收老状态和动作 返回新状态
// 把操作开放给用户 而不是写在create里面写死
let reducer = (state = initState, action) => {
    switch (action.type) {
        case UPDATE_TITLE_COLOR:
            return {
                ...state,
                title: {
                    ...state.title,
                    color: action.payload
                }
            }
            break
        case UPDATE_TITLE_TEXT:
            return {
                ...state,
                title: {
                    ...state.title,
                    text: action.payload
                }
            }
            break
        case UPDATE_CONTENT_COLOR:
            return {
                ...state,
                content: {
                    ...state.title,
                    color: action.payload
                }
            }
            break
        case UPDATE_CONTENT_TEXT:
            return {
                ...state,
                content: {
                    ...state.title,
                    text: action.payload
                }
            }
            break
        default:
            return state
            break
    }
}

// 相当于 render 重新渲染
function renderApp() {
    // 相当于 两个组件
    let state = store.getState();
    renderTitle(state.title);
    renderContent(state.content);
}

function renderTitle(state) {
    let ele = document.getElementById('title');
    ele.style.color = state.color;
    ele.innerHTML = state.text;
}

function renderContent(state) {
    let ele = document.getElementById('content');
    ele.style.color = state.color;
    ele.innerHTML = state.text;
}

// 实例化仓库
let store = createStore(reducer);

renderApp()

// 通知修改 这样子不好 状态可以被任意改变 
// appState.title.color = 'green';
// 所以要派发动作 规定好动作 就产生了dispatch action

// 订阅 派发后会自动触发render
unsubscribe = store.subscribe(renderApp);

setTimeout(() => {
    store.dispatch({
        type: UPDATE_TITLE_COLOR,
        payload: 'green'
    })
    // 取消订阅了 下面就不会触发render了
    unsubscribe()
    store.dispatch({
        type: UPDATE_TITLE_COLOR,
        payload: 'yellow'
    })
}, 1500)
