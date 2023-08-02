import React,{lazy} from "react"
import Home from "../views/Home"

const About = lazy(() => import("../views/About"))
const Other = lazy(() => import("../views/Other"))

// Navigate 重定向组件
import { Navigate } from "react-router-dom"






const routes = [
    {
        path: "/", //重定向到home
        element: <Navigate to="/home" />,
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/about",
        element: <React.Suspense fallback={<div></div>} />,
    },
    // { path: "*", element: <Navigate to="/" /> },
    {
        path: "/other",
        element: <React.Suspense fallback={<div></div>} />,
    }
]
export default routes
