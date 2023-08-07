import {legacy_createStore } from "redux"
import reducer from "./reducer.ts"

//创建数据仓库
// window.__REDUX_DEVTOOLS_EXTENSION__ &&window.__REDUX_DEVTOOLS_EXTENSION__())是为了让浏览器正常使用redux-dev-tools插件

const store = legacy_createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;