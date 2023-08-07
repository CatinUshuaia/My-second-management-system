import React,{lazy} from "react"
import Home from "../views/Home"

const About = lazy(() => import("../views/About"))
const Other = lazy(() => import("../views/Other"))
//懒加载模式

// Navigate 重定向组件
import { Navigate } from "react-router-dom"


//懒加载模式组件的写法，外面需要套一层Loading的提示加载组件

function withLoadingComponent(comp:JSX.Element) {
    return (<React.Suspense fallback={<div>Loading...</div>} >
        {comp}
    </React.Suspense >);
}

const routes = [
    {
        path: "/", //重定向到home
        element: <Navigate to="/home" />
    },

    {
        path: "/home",
        element: <Home />
    },

    {
        path: "/about",
        element: withLoadingComponent(<About />)
    },

    {
        path: "/other",
        element: withLoadingComponent(<Other />)
    },
]
export default routes
