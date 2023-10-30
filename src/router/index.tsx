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

import { Navigate } from "react-router-dom"

function withLoadingComponent(comp:JSX.Element) {
    return (<React.Suspense fallback={<LoadingOutlined  />} >
        {comp}
    </React.Suspense >);
}

const routes = [
    {
        path: "/", 
        element: <Navigate to="/Login" />
    },

    {
        path: "/", 
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
                path: "/Createrecord/Templates/:formName/:formId",
                element: withLoadingComponent(<Dynamicforms />)
            },
        ]
    },

    {
        path: "/Login",
        element: <Login  />
    },

    {
        path: "*",
        element: <Navigate to="/Homepage" />
    }

]
export default routes
