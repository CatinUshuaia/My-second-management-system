
//该文件用于解决报错
//[重点]类型生命文件里面不要直接使用引入import...from... 而是使用import("@/store")这种语法

//TS中提供了returntype用来获取函数类型的返回值
type RootState = ReturnType<typeof import("@/store").getState>

interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: function;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: function;
}