const store = {
    state: {//存放数据

    },
    actions: {//只放同步的方法



    },



    asyncActions: {//只放异步的方法




    },
    actionNames: {}
}



let actionNames = {};

for (let key in store.actions) {
    actionNames[key] = key;
}

store.actionNames = actionNames;


export default store