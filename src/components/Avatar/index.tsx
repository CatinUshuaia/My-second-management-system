import React, { useEffect, useState } from 'react';
import { Avatar, message, Space } from 'antd';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const App: React.FC = () => {
    const token = localStorage.getItem('formsubmission-token');
    let decodedToken: { department: string, userName: string, userType: number, staffCode: string } | null = null;
    if (token) {
        decodedToken = jwtDecode(token);
    }
    const defaultAvatar = "/src/img/avatar.png";
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                // Replace with your API endpoint
                const response = await axios.get(`http://localhost:5223/api/User/getAvatar/${decodedToken?.staffCode}`);
                if (response.data && response.data.avatarUrl) {
                    setAvatar(response.data.avatarUrl);
                } else {
                    setAvatar(defaultAvatar as any);
                }
            } catch (error: any) {
                setAvatar(defaultAvatar as any);
            }
        }
        fetchAvatar();
    }, []);


        return (
            <Space direction="vertical" size={16}>
                <Space wrap size={16}>
                    <Avatar size={64} src={avatar} alt="logo" />
                </Space>
            </Space>
        )
};

export default App;