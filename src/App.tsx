import { useState,useEffect } from 'react'
import { useRoutes,useLocation,useNavigate} from "react-router-dom"
import router from "./router"

function ToFormsubmit() {
    const navigateTo = useNavigate()
    useEffect(() => {
        navigateTo("/formsubmit")
    }, [])
    return <div></div>
}

function ToLogin() {
    const navigateTo=useNavigate()
    useEffect(() => {
        navigateTo("/login")
    },[])
    return <div></div>
}


function BeforeRouterEnter() {
    const outlet = useRoutes(router as any)
    const location = useLocation()
    let token = localStorage.getItem("formsubmission-token");

    if (location.pathname === "/login" && token) { 
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
        <BeforeRouterEnter />
    </div>
  )
}

export default App
