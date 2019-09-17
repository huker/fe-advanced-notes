// 状态树 state
let appState = {
    title: { text: '标题', color: 'red' },
    content: { text: '内容', color: 'blue' }
}

// 相当于 render 重新渲染
function renderApp(appState) {
    // 相当于 两个组件
    renderTitle(appState.title);
    renderContent(appState.content);
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

renderApp(appState)

// 通知修改 这样子不好 状态可以被任意改变 
// appState.title.color = 'green';

// 所以要派发动作 规定好动作
// 四个动作 修改颜色和文字
const UPDATE_TITLE_COLOR = 'UPDATE_TITLE_COLOR';
const UPDATE_TITLE_TEXT = 'UPDATE_TITLE_TEXT';
const UPDATE_CONTENT_COLOR = 'UPDATE_CONTENT_COLOR';
const UPDATE_CONTENT_TEXT = 'UPDATE_CONTENT_TEXT';
// 派发 action 是有格式要求的 
// 1.是个纯对象 2.type属性-要做的动作 3.payload属性-传的值
function dispatch(action) {
    switch (action.type) {
        case UPDATE_TITLE_COLOR:
            appState.title.color = action.payload
            break
        case UPDATE_TITLE_TEXT:
            appState.title.text = action.payload
            break
        case UPDATE_CONTENT_COLOR:
            appState.content.color = action.payload
            break
        case UPDATE_CONTENT_TEXT:
            appState.content.text = action.payload
            break
        default:
            break
    }
}

renderApp(appState)

setTimeout(() => {
    dispatch({
        type: UPDATE_TITLE_COLOR,
        payload: 'green'
    })
    renderApp(appState)
}, 1500)
