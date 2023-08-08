const store= {
    state: {
        num: 30
    },
    actions: {//只放同步的方法

        add1(newState: { num: number }, action: { type: string }) {
                newState.num++
        },

        add2(newState:{ num: number }, action: { type: string ,val:number}) {
                newState.num += action.val
        },
    },

    actionNames: {}
}

let actionNames = {};

for (let key in store.actions) {
    actionNames[key] = key;
}

store.actionNames = actionNames;


export default store