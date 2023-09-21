import React, { useState } from 'react';
import axios from 'axios';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Card, Row, Col, Typography, Space, Input, Button, message } from 'antd';
import jwtDecode from 'jwt-decode';

const { Title, Paragraph } = Typography;

const Passwordreset: React.FC = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const token = localStorage.getItem('formsubmission-token');
    let decodedToken: { department: string, userName: string, userType: number } | null = null;
    if (token) {
        decodedToken = jwtDecode(token);
    }

    const handleReset = async () => {
        if (newPassword !== confirmPassword) {
            message.warning("New passwords do not match.");
            return;
        }

        if (newPassword.length < 6) {
            message.warning("Password must be at least 6 characters long.");
            return;
        }

        try {
            // Replace with your API endpoint
            const response = await axios.post("http://localhost:5223/api/User/ChangePassword", {
                name: decodedToken?.userName,
                oldPassword: oldPassword,
                newPassword: newPassword,
            });
            message.success(response.data);
        } catch (error:any) {
            message.error(error.response?.data || "An error occurred.");
        }
    };

    return (
        <Row justify="center" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center' }}>
            <Col span={12}>
                <Card style={{ marginTop: '16px', border: '1px solid #888'}}>
                    <Title level={3}>Change Password</Title>
                    <Paragraph>Enter your old password, then your new password twice for confirmation.</Paragraph>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Input.Password
                            placeholder="Old password"
                            style={{ borderRadius: '5px' }}
                            value={oldPassword}
                            onChange={e => setOldPassword(e.target.value)}
                        />
                        <Input.Password
                            placeholder="New password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            style={{ borderRadius: '5px' }}
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                        />
                        <Input.Password
                            placeholder="Re-enter new password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            style={{ borderRadius: '5px' }}
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                        <Button type="primary" block style={{ borderRadius: '5px' }} onClick={handleReset}>Reset</Button>
                    </Space>
                </Card>
            </Col>
        </Row>
    );
};

export default Passwordreset;