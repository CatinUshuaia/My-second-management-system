﻿import { ChangeEvent, useEffect, useState } from "react"
import {useNavigate } from "react-router-dom"
import {Input,Space,Button,message} from 'antd';
import styles from "./login.module.scss"
import initLoginBg from "./init.ts"
import './login.less'
import { CaptchaAPI, LoginAPI } from "@/request/api"

const view = () => {

    let navigateTo = useNavigate();
    //加载完这个组件之后,加载背景
    useEffect(() => {
        initLoginBg();
        window.onresize = function () { initLoginBg() };

        getCaptchaImg();
    }, [])


    //获取用户输入的信息
    const [usernameVal, setUsernameVal] = useState("");
    const [passwordVal, setPasswordVal] = useState("");
    const [captchaVal, setCaptchaVal] = useState("");
    //定义变量保存验证码图片信息
    const [captchaImg, setCaptchaImg] = useState("");

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
    const gotoLogin = async () => {
        //验证是否有空值
        if (!usernameVal.trim() || !passwordVal.trim() || !captchaVal.trim()) {
            message.warning("请输入完整信息！")
            return;
        }

        //发起登录请求
        let loginAPIRes = await LoginAPI({
            username: usernameVal,
            password: passwordVal,
            code: captchaVal,
            uuid: localStorage.getItem("uuid") as string
        })

        console.log(loginAPIRes);
        if (loginAPIRes.code === 200) {
        //1.提示登录成功
            message.success("登录成功！");
        //2.保存token
            localStorage.setItem("formsubmission-token", loginAPIRes.token);
        //3.跳转到/page1
            navigateTo("/formsubmit");
        //4.删除本地保存中的uuid
            localStorage.removeItem("uuid")
            return;
        }

        if (loginAPIRes.msg === "登录用户：" + usernameVal + " 不存在") {                     
            message.error("登录失败！请重新确认！")
            return;
        }

        if (loginAPIRes.msg === "验证码错误" || loginAPIRes.msg === "验证码已失效") {
            message.error("验证码错误或已失效！")
            getCaptchaImg();
            return;
        }
    }

    //点击验证码盒子的事件函数
    const getCaptchaImg = async() => {
        ////做验证码的请求
        //captchaAPI().then((res) => {
        //    console.log(res);
        //})

        let captchaAPIRes = await CaptchaAPI();
        console.log(captchaAPIRes);
        if (captchaAPIRes.code === 200) {
        //1.把图片数据显示在img上面
            setCaptchaImg("data:image/gif;base64," + captchaAPIRes.img)
        //2.本地保存uuid,给登录的时候用
            localStorage.setItem("uuid", captchaAPIRes.uuid);
        }

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
                            <div className="captchImg " onClick={getCaptchaImg} >
                            <img height="38"
                                    src={captchaImg}
                                alt="" />
                            </div>
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