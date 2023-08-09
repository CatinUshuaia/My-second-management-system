import { useState,useEffect } from 'react'
import { useRoutes,useLocation,useNavigate} from "react-router-dom"
import router from "./router"

//去往首页
function ToFormsubmit() {
    //加载完组件之后实现跳转
    const navigateTo = useNavigate()
    useEffect(() => {
        //加载完组件之后执行这里的代码
        navigateTo("/formsubmit")
    }, [])
    return <div></div>
}

//去往登录页
function ToLogin() {
    const navigateTo=useNavigate()
    useEffect(() => {
     //加载完组件之后执行这里的代码
        navigateTo("/login")
    },[])
    return <div></div>
}


function BeforeRouterEnter() {
    const outlet = useRoutes(router)

    /*后台管理系统两种经典的跳转情况
    1.如果访问的是登录界面，且有token，跳转到首页
    2.如果访问的不是登陆页面，并且没有token，跳转到登录页
    3.其余的都可以正常放行
    */
    const location = useLocation()
    let token = localStorage.getItem("formsubmission-token");

    if (location.pathname === "/login" && token) { 
        //这里不能直接用useNavigate来实现跳转，因为需要BeforeRouterEnter是一个正常的JSX组件
        return <ToFormsubmit />
    }

    if (location.pathname !== "/login" && !token) {
        return <ToLogin />
    }

        return outlet
}



function App() {
    const [count, setCount] = useState(0);
   

  return (
      <div className="App">

          {/*<Link to="/home">Home|</Link>
          <Link to="/about">About|</Link>
          <Link to="/other">Other</Link>*/}

          {/*占位符组件，类似于窗口，用于展示组件。*/}
          {/* {outlet}*/}
          <BeforeRouterEnter />
    </div>
  )
}

export default App
