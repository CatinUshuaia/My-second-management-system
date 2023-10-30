import { ChangeEvent, useState } from "react"
import {useNavigate } from "react-router-dom"
import {Input,Space,Button,message} from 'antd';
import {LoginAPI } from "@/request/api"
import logo from "@/img/logo.jpg";
import backgroundimg from "@/img/loginbackground.png"



const view = () => {

    let navigateTo = useNavigate();
    const [staffcodeVal, setStaffcodeVal] = useState("");
    const [passwordVal, setPasswordVal] = useState("");

    const staffCodeChange = (e:ChangeEvent<HTMLInputElement>) => { 
        setStaffcodeVal(e.target.value);
    }

    const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordVal(e.target.value);
    }


    const gotoLogin = async () => {
        if (!staffcodeVal.trim() || !passwordVal.trim()) {
            message.warning("Please enter full information!")
            return;
        }
        try {
            let loginAPIRes = await LoginAPI({
                staffid: staffcodeVal,
                password: passwordVal,
            });

            if (loginAPIRes.success === true) {
                message.success(loginAPIRes.message);
                localStorage.setItem("formsubmission-token", loginAPIRes.data.accesstoken);
                localStorage.setItem("formsubmission-token-refresh", loginAPIRes.data.refreshToken);
                navigateTo("/homepage");
                return;
            }

            if (loginAPIRes.success === false) {
                message.error(loginAPIRes.message);
                return;
            }
        } catch (error) {
            message.error("Network connection failed, please try again later");
            console.error(error);
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            gotoLogin();
        }
    };

    const handleforgetPwd = () => {
        message.info('If you forgot your password, please contact IT department');
    }

    return (
        <div style={{
            backgroundImage: `url(${backgroundimg})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            position: 'fixed',
            width: '100%',
            height: '100%',
        }}>
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
                        placeholder="StaffCode"
                        onChange={staffCodeChange} />

                    <Input.Password
                        type="text"
                        className="input"
                        placeholder="Password"
                        onChange={passwordChange}
                        onKeyDown={handleKeyPress} />

                        </Space>
                    </div>
                
                    <Button className="loginBtn" type="primary" block onClick={gotoLogin} >
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