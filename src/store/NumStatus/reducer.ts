import handleNum from "./index"


let reducer = (state = { ...handleNum.state },  action: {
    val: number; type: string
}) => {

    let newState = JSON.parse(JSON.stringify(state));


    for (let key in handleNum.actionNames) {
        if (action.type === handleNum.actionNames[key]) {
            handleNum.actions[handleNum.actionNames[key]](newState, action);
            break;
        }
    }

    return newState;
}

export default reducer