//就是来管理数据的

const defaultState = {
   num:404
}
let reducer = (state = defaultState, action: {
    val: any;type:string
}) => {
    //深拷贝？
    //调用dispatch执行这里的代码

    let newState = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case "add1":
            newState.num++
            break;
        case "add2":
            newState.num += action.val
            break;
        default:
            break;
    }

    return newState;
}

export default reducer