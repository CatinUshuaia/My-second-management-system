import { ChangeEvent, useState } from "react"
import {useNavigate } from "react-router-dom"
import {Input,Space,Button,message} from 'antd';
import {LoginAPI } from "@/request/api"
import logo from "@/img/logo.jpg";



const view = () => {

    let navigateTo = useNavigate();

    //获取用户输入的信息
    const [usernameVal, setUsernameVal] = useState("");
    const [passwordVal, setPasswordVal] = useState("");

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


    //点击登录按钮事件
    const gotoLogin = async () => {
        //验证是否有空值
        if (!usernameVal.trim() || !passwordVal.trim()) {
            message.warning("请输入完整信息！")
            return;
        }
        try {
            // 发起登录请求
            let loginAPIRes = await LoginAPI({
                name: usernameVal,
                password: passwordVal,
            });

            console.log(loginAPIRes);

            if (loginAPIRes.success === true) {
                // 1.提示登录成功
                message.success("登录成功！");
                // 2.保存token
                localStorage.setItem("formsubmission-token", loginAPIRes.data.accesstoken);

                // 3.跳转到/page1
                navigateTo("/homepage");
                return;
            }

            if (loginAPIRes.success === false) {
                message.error("用户名或密码错误");
                return;
            }
        } catch (error) {
            message.error("网络连接失败，请稍后重试");
            console.error(error);
        }
    }

    const handleforgetPwd = () => {
        message.info('忘记密码，请联系IT部门');
    }

    return (
        <div className="login-container">
            <div className="pageHeader">
                <img src={logo} alt="logo" />
            </div>
            <div className="login-box">
                <div className="login-text">
                    <span>Login</span>
                </div>
                <div className="right-content">

                
                    <div className="input-box">
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <Input type="text"
                        className="input"
                        placeholder="Username"
                        onChange={usernameChange} />

                    <Input.Password
                        type="text"
                        className="input"
                        placeholder="Password"
                        onChange={passwordChange} />

                        </Space>
                    </div>
                
                    <Button className="loginBtn" type="primary" block onClick={gotoLogin}>
                        Staff Login
                    </Button>
                    <div className="option">
                        <span className="forget-pwd" onClick={handleforgetPwd}>Forgot Password?</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default view