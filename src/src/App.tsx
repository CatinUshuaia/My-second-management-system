import { useState } from 'react'
import { useRoutes,Link } from "react-router-dom"
import router from "./router"

function App() {
    const [count, setCount] = useState(0);
    const outlet = useRoutes(router)

  return (
      <div className="App">

          {/*<Link to="/home">Home|</Link>
          <Link to="/about">About|</Link>
          <Link to="/other">Other</Link>*/}

          {/*占位符组件，类似于窗口，用于展示组件。*/}
          {outlet}
    </div>
  )
}

export default App
