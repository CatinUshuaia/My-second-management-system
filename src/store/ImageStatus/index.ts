const store = {
    state: {
        fileStrings: [], // 存放Base64字符串的数组
    },
    actions: {
        addFile(state: any, action: { type: string, payload: { fileStr: string, uid: string } }) {
            state.fileStrings.push(action.payload); // 添加新的对象到数组中
        },
        deleteFile(state: any, action: { type: string, payload: number }) {
            if (action.payload >= 0 && action.payload < state.fileStrings.length) {
                state.fileStrings.splice(action.payload, 1); // 从数组中删除指定文件
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