import React,{lazy} from "react"
import Home from "../views/Home"
import Login from "../views/Login"

import {
    LoadingOutlined,
} from '@ant-design/icons';
const Homepage = lazy(() => import("../views/Homepage"))
const Formsubmit = lazy(() => import("../views/Formsubmit"))
const Settings = lazy(() => import("../views/Settings"))
const Password = lazy(() => import("../views/Password"))
const Remarks = lazy(() => import("../views/Remarks"))
const IOT = lazy(() => import("../views/IOT"))
const MIT = lazy(() => import("../views/MIT"))
const Exit = lazy(() => import("../views/Exit"))
const Successpage = lazy(() => import("../views/Successpage"))
const Createrecord = lazy(() => import("../views/Createrecord"))
const Formsearch = lazy(() => import("../views/Formsearch"))
const Bitumen = lazy(() => import("../views/Createrecord/Bitumen"))
const Buildingcomponent = lazy(() => import("../views/Createrecord/Buildingcomponent"))
const Buildingcomponentrock = lazy(() => import("../views/Createrecord/Buildingcomponentrock"))
const Buildingdiagnostic = lazy(() => import("../views/Createrecord/Buildingdiagnostic"))
const Cement = lazy(() => import("../views/Createrecord/Cement"))
const Chemical = lazy(() => import("../views/Createrecord/Chemical"))
const Chinesemedicine = lazy(() => import("../views/Createrecord/Chinesemedicine"))
const Concretecore = lazy(() => import("../views/Createrecord/Concretecore"))
const Concretecube = lazy(() => import("../views/Createrecord/Concretecube"))
const Drainagepipe = lazy(() => import("../views/Createrecord/Drainagepipe"))
const Environmental = lazy(() => import("../views/Createrecord/Environmental"))
const Food = lazy(() => import("../views/Createrecord/Food"))
const Generaloffice = lazy(() => import("../views/Createrecord/Generaloffice"))
const Geotechnicinvestigation = lazy(() => import("../views/Createrecord/Geotechnicinvestigation"))
const Microbiological = lazy(() => import("../views/Createrecord/Microbiological"))
const NDTwelding = lazy(() => import("../views/Createrecord/NDTwelding"))
const Paint = lazy(() => import("../views/Createrecord/Paint"))
const Piling = lazy(() => import("../views/Createrecord/Piling"))
const Site = lazy(() => import("../views/Createrecord/Site"))
const SoilandaggregatephaseI = lazy(() => import("../views/Createrecord/SoilandaggregatephaseI"))
const SoilPh2 = lazy(() => import("../views/Createrecord/SoilPh2"))
const Steel = lazy(() => import("../views/Createrecord/Steel"))
const Zhongshan2013 = lazy(() => import("../views/Createrecord/Zhongshan2013"))
const Calibration = lazy(() => import("../views/Createrecord/Calibration"))
const Fire = lazy(() => import("../views/Createrecord/Fire"))
const Deepcementmaterialtestinglab = lazy(() => import("../views/Createrecord/Deepcementmaterialtestinglab"))
const Waterworksproductinsp = lazy(() => import("../views/Createrecord/Waterworksproductinsp"))
const WaterWorksInspectionManholeCoverInspection = lazy(() => import("../views/Createrecord/Waterworksproductinsp/WaterWorksInspectionManholeCoverInspection"))
const WaterWorksInspectionDuctileIronFittingInspection = lazy(() => import("../views/Createrecord/Waterworksproductinsp/WaterWorksInspectionDuctileIronFittingInspection"))
const WaterWorksInspectionSurfaceBoxInspection = lazy(() => import("../views/Createrecord/Waterworksproductinsp/WaterWorksInspectionSurfaceBoxInspection"))
const WaterWorksInspectionValveInspection = lazy(() => import("../views/Createrecord/Waterworksproductinsp/WaterWorksInspectionValveInspection"))
    


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
            }, {
                path: "/Formsubmit",
                element: withLoadingComponent(<Formsubmit />)
            }, {
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
                path: "/Createrecord/Bitumen",
                element: withLoadingComponent(<Bitumen />)
            }, {
                path: "/Createrecord/Buildingcomponent",
                element: withLoadingComponent(<Buildingcomponent />)
            }, {
                path: "/Createrecord/Buildingcomponentrock",
                element: withLoadingComponent(<Buildingcomponentrock />)
            }, {
                path: "/Createrecord/Buildingdiagnostic",
                element: withLoadingComponent(<Buildingdiagnostic />)
            }, {
                path: "/Createrecord/Cement",
                element: withLoadingComponent(<Cement />)
            }, {
                path: "/Createrecord/Chemical",
                element: withLoadingComponent(<Chemical />)
            }, {
                path: "/Createrecord/Chinesemedicine",
                element: withLoadingComponent(<Chinesemedicine />)
            }, {
                path: "/Createrecord/Concretecore",
                element: withLoadingComponent(<Concretecore />)
            }, {
                path: "/Createrecord/Concretecube",
                element: withLoadingComponent(<Concretecube />)
            }, {
                path: "/Createrecord/Drainagepipe",
                element: withLoadingComponent(<Drainagepipe />)
            }, {
                path: "/Createrecord/Environmental",
                element: withLoadingComponent(<Environmental />)
            }, {
                path: "/Createrecord/Food",
                element: withLoadingComponent(<Food />)
            }, {
                path: "/Createrecord/Generaloffice",
                element: withLoadingComponent(<Generaloffice />)
            }, {
                path: "/Createrecord/Geotechnicinvestigation",
                element: withLoadingComponent(<Geotechnicinvestigation />)
            }, {
                path: "/Createrecord/Microbiological",
                element: withLoadingComponent(<Microbiological />)
            }, {
                path: "/Createrecord/NDTwelding",
                element: withLoadingComponent(<NDTwelding />)
            }, {
                path: "/Createrecord/Paint",
                element: withLoadingComponent(<Paint />)
            }, {
                path: "/Createrecord/Piling",
                element: withLoadingComponent(<Piling />)
            }, {
                path: "/Createrecord/Site",
                element: withLoadingComponent(<Site />)
            }, {
                path: "/Createrecord/SoilandaggregatephaseI",
                element: withLoadingComponent(<SoilandaggregatephaseI />)
            }, {
                path: "/Createrecord/SoilPh2",
                element: withLoadingComponent(<SoilPh2 />)
            }, {
                path: "/Createrecord/Steel",
                element: withLoadingComponent(<Steel />)
            }, {
                path: "/Createrecord/Zhongshan2013",
                element: withLoadingComponent(<Zhongshan2013 />)
            }, {
                path: "/Createrecord/Calibration",
                element: withLoadingComponent(<Calibration />)
            }, {
                path: "/Createrecord/Fire",
                element: withLoadingComponent(<Fire />)
            }, {
                path: "/Createrecord/Deepcementmaterialtestinglab",
                element: withLoadingComponent(<Deepcementmaterialtestinglab />)
            }, {
                path: "/Createrecord/Waterworksproductinsp",
                element: withLoadingComponent(<Waterworksproductinsp />)
            }, {
                path: "/Createrecord/Waterworksproductinsp/WaterWorksInspectionManholeCoverInspection",
                element: withLoadingComponent(<WaterWorksInspectionManholeCoverInspection />)
            },{
                path: "/Createrecord/Waterworksproductinsp/WaterWorksInspectionDuctileIronFittingInspection",
                element: withLoadingComponent(<WaterWorksInspectionDuctileIronFittingInspection />)
            },{
                path: "/Createrecord/Waterworksproductinsp/WaterWorksInspectionSurfaceBoxInspection",
                element: withLoadingComponent(<WaterWorksInspectionSurfaceBoxInspection />)
            },{
                path: "/Createrecord/Waterworksproductinsp/WaterWorksInspectionValveInspection",
                element: withLoadingComponent(<WaterWorksInspectionValveInspection />)
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
