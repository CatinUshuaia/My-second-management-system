import React,{lazy} from "react"
import Home from "../views/Home"
import Login from "../views/Login"
import {
    LoadingOutlined,
} from '@ant-design/icons';
const Homepage = lazy(() => import("../views/Homepage"))
const Settings = lazy(() => import("../views/Settings"))
const Calendar = lazy(() => import("../views/Calendar"))
const Members = lazy(() => import("../views/Members"))
const FormsinTeam = lazy(() => import("../views/FormsinTeam"))
const Exit = lazy(() => import("../views/Exit"))
const Successpage = lazy(() => import("../views/Successpage"))
const Createrecord = lazy(() => import("../views/Createrecord"))
const Formsearch = lazy(() => import("../views/Formsearch"))
const Templates = lazy(() => import("../views/Createrecord/Templates"))
const Dynamicforms = lazy(() => import("../views/Createrecord/Templates/Dynamicforms"))


// Navigate 重定向组件
import { Navigate } from "react-router-dom"


//懒加载模式组件的写法，外面需要套一层Loading的提示加载组件

function withLoadingComponent(comp:JSX.Element) {
    return (<React.Suspense fallback={<LoadingOutlined  />} >
        {comp}
    </React.Suspense >);
}

const routes = [
    {
        path: "/", //重定向到home
        element: <Navigate to="/Login" />
    },

    //嵌套路由
    {
        path: "/", //重定向到home
        element: <Home />,
        children: [
            {
               path: "/Homepage",
               element: withLoadingComponent(<Homepage />)
            },{
                path: "/Settings",
                element: withLoadingComponent(<Settings />)
            }, {
                path: "/Calendar",
                element: withLoadingComponent(<Calendar />)
            }, {
                path: "/Members",
                element: withLoadingComponent(<Members />)
            }, {
                path: "/FormsinTeam",
                element: withLoadingComponent(<FormsinTeam />)
            }, {
                path: "/Exit",
                element: withLoadingComponent(<Exit />)
            }, , {
                path: "/Successpage",
                element: withLoadingComponent(<Successpage />)
            },{
                path: "/Formsearch",
                element: withLoadingComponent(<Formsearch />)
            }, {
                path: "/Createrecord",
                element: withLoadingComponent(<Createrecord />),  
            }, {
                path: "/Createrecord/:labName",
                element: withLoadingComponent(<Templates />)
            }, {
                path: "/Createrecord/Templates/:formName",
                element: withLoadingComponent(<Dynamicforms />)
            },
        ]
    },

    {
        path: "/Login",
        element: <Login  />
    },

    //访问其余路径的时候直接跳到首页
    {
        path: "*",
        element: <Navigate to="/Homepage" />
    }

]
export default routes
