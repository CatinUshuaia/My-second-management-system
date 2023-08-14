import React from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button,Input, Space } from 'antd';

const Passwordreset: React.FC = () => {

    return (
        <Space direction="vertical">
            <Input.Password placeholder="old password" />
            <Input.Password
                placeholder="new password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
            <Space direction="horizontal">
                <Input.Password
                    placeholder="Re-enter new password"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
            </Space>
            <Button type="primary">Reset</Button>
        </Space>

    );
};

export default Passwordreset;