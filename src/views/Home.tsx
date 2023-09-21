import React, { useEffect, useState } from 'react';

import { BackTop, FloatButton, Layout, theme, Typography } from 'antd';
import { Outlet } from "react-router-dom"
import Mainmenu from "@/components/Mainmenu"
import Avator from "@/components/Avatar"
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;


const View: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>

            {/*左侧侧边栏*/}
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="brand" >
                    <Avator />
                </div>
                <Mainmenu />
            </Sider>
            {/*右侧内容*/}

            <Layout>
                {/*右侧头部*/}
                <Header style={{ paddingLeft: '16px', background: '#F0F8FF' }} >
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src="/src/img/logo.jpg" style={{ height: 60, marginLeft: '40px' }} alt="img" />
                    </div>
                </Header>
                {/*右侧大空白*/}
                <Content style={{ position: 'relative', margin: '16px 16px 0', background: "#F0F8FF", border: '4px solid white' }} >
                    <Typography.Title level={5} style={{ position: 'absolute', top: 20, right: 10, fontWeight: 'normal', color: 'grey' }}>
                        {date.toLocaleDateString()} {date.toLocaleTimeString()}
                    </Typography.Title>
                    {/*此处放窗口*/}
                    <Outlet />
                </Content>

                <Footer style={{ textAlign: 'center', padding: 0, lineHeight: '48px', }}>Ant Design ©2023 Created by Ant UED</Footer>

                <BackTop style={{ bottom: 60, right: 110 }} />
                <FloatButton icon={<QuestionCircleOutlined />} type="default" style={{bottom: 60, right: 50}} />
            </Layout>
        </Layout>
    );
};

export default View;