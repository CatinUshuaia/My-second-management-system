﻿import React,{lazy} from "react"
import Home from "../views/Home"
import Login from "../views/Login"

import {
    LoadingOutlined,
} from '@ant-design/icons';
const Homepage = lazy(() => import("../views/Homepage"))
const Formsubmit = lazy(() => import("../views/Formsubmit"))
const Formstatus = lazy(() => import("../views/Formstatus"))

const Settings = lazy(() => import("../views/Settings"))
const Password = lazy(() => import("../views/Password"))
const Remarks = lazy(() => import("../views/Remarks"))
const IOT = lazy(() => import("../views/IOT"))
const MIT = lazy(() => import("../views/MIT"))
const Exit = lazy(() => import("../views/Exit"))
const Templates = lazy(() => import("../views/Templates"))
const Formsearch = lazy(() => import("../views/Formsearch"))



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
            path: "/Formsubmit",
            element: withLoadingComponent(<Formsubmit />)
            },{
                path: "/Formstatus",
                element: withLoadingComponent(<Formstatus />)
            },{
                path: "/Settings",
                element: withLoadingComponent(<Settings />)
            }, {
                path: "/Password",
                element: withLoadingComponent(<Password />)
            }, {
                path: "/Remarks",
                element: withLoadingComponent(<Remarks />)
            }, {
                path: "/IOT",
                element: withLoadingComponent(<IOT />)
            }, {
                path: "/MIT",
                element: withLoadingComponent(<MIT />)
            }, {
                path: "/Exit",
                element: withLoadingComponent(<Exit />)
            }, {
                path: "/Templates",
                element: withLoadingComponent(<Templates />)
            }, {
                path: "/Formsearch",
                element: withLoadingComponent(<Formsearch />)
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
