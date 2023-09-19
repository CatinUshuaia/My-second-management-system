import handleImg from "./index"


let reducer = (state = { ...handleImg.state }, action: {
    val: number; type: string
}) => {

    let newState = JSON.parse(JSON.stringify(state));


    for (let key in handleImg.actionNames) {
        if (action.type === handleImg.actionNames[key]) {
            handleImg.actions[handleImg.actionNames[key]](newState, action);
            break;
        }
    }

    return newState;
}

export default reducer