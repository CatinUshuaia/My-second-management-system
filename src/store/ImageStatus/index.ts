const store = {
    state: {
        fileStrings: [], 
    },
    actions: {
        addFile(state: any, action: { type: string, payload: { fileStr: string, uid: string } }) {
            state.fileStrings.push(action.payload); 
        },
        deleteFile(state: any, action: { type: string, payload: number }) {
            if (action.payload >= 0 && action.payload < state.fileStrings.length) {
                state.fileStrings.splice(action.payload, 1);
            }
        },
    },
    asyncActions: {},
    actionNames: {},
};

let actionNames = {};

for (let key in store.actions) {
    actionNames[key] = key;
}

store.actionNames = actionNames;

export default store;