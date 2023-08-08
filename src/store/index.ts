import { legacy_createStore, combineReducers, applyMiddleware, compose } from "redux"
import reduxThunk from "redux-thunk"
import handleNum from "./NumStatus/reducer"
import handleArr from "./ArrStatus/reducer"


//组合各个模块的reducer
const reducers = combineReducers({
    handleNum,
    handleArr
})


let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose 

// 把仓库数据，浏览器redux-dev-tools，还有reduxThunk插件关联在store中
const store =
    legacy_createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));


////创建数据仓库
//// window.__REDUX_DEVTOOLS_EXTENSION__ &&window.__REDUX_DEVTOOLS_EXTENSION__())是为了让浏览器正常使用redux-dev-tools插件

//const store = legacy_createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ &&
//    window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;