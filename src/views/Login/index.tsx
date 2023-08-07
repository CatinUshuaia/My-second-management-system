import { ChangeEvent, useEffect, useState } from "react"
import {Input,Space,Button} from 'antd';
import styles from "./login.module.scss"
import initLoginBg from "./init.ts"
import './login.less'

const view = () => {

    //加载完这个组件之后,加载背景
    useEffect(() => {
        initLoginBg();
        window.onresize = function () { initLoginBg() };
    }, [])
    //获取用户输入的信息
    const [usernameVal, setUsernameVal] = useState("");
    const [passwordVal, setPasswordVal] = useState("");
    const [captchaVal, setCaptchaVal] = useState("");

    const usernameChange = (e:ChangeEvent<HTMLInputElement>) => {
    //获取用户输入的用户名

    //修改usernameVal这个变量为用户输入值，以后拿到这个变量相当于拿到用户输入信息。
        setUsernameVal(e.target.value);
    }

    const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
        //获取用户输入的密码
   
        //修改usernameVal这个变量为用户输入值，以后拿到这个变量相当于拿到用户输入信息。
        setPasswordVal(e.target.value);
    }

    const captchaChange = (e: ChangeEvent<HTMLInputElement>) => {
        //获取用户输入的验证码
  
        //修改usernameVal这个变量为用户输入值，以后拿到这个变量相当于拿到用户输入信息。
        setCaptchaVal(e.target.value);
    }

    //点击登录按钮事件
    const gotoLogin = () => {
        console.log("用户输入的用户名，密码，验证码分别是：",usernameVal,passwordVal,captchaVal)
    }

    return (
        <div className={styles.loginPage}>
            {/*存放背景*/ }
            <canvas id="canvas" style={{ display: "block" }}></canvas>
            {/*登录盒子*/ }
            <div className={styles.loginBox+" loginbox"}>
                {/*标题部分*/ }
                <div className={styles.title}>
                    <h1>Hugo&nbsp;·&nbsp;表单提交系统</h1>
                    <p>Castco Testing Center Ltd.</p>
                </div>
                {/*表单部分*/ }
                <div className="form">
                    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                        <Input placeholder="用户名" onChange={usernameChange} />
                        <Input.Password placeholder="密码" onChange={passwordChange} />
                        <div className="captchaBox">
                            <Input placeholder="验证码" onChange={captchaChange} />
                            <div className="captchaImg" />
                            <img height="38"
                                src="./src/img/logo.png"
                                alt="" />
                        </div>
                        <Button type="primary" className="loginBtn" block onClick={gotoLogin}>
                            登录
                        </Button>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default view