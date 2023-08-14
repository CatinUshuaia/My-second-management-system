import React from 'react';
import { Avatar, Space } from 'antd';

const App: React.FC = () => (
    <Space direction="vertical" size={16}>
        <Space wrap size={16}>
            <Avatar size={64} src="/src/img/logo.png" alt="logo" />
        </Space>
    </Space>
);

export default App;