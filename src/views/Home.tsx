import React, { useState } from 'react';


import { Layout,theme } from 'antd';
import { Outlet } from "react-router-dom"
import Mainmenu from "@/components/Mainmenu" 

const { Header, Content, Footer, Sider } = Layout;

import {
    DesktopOutlined,
    UploadOutlined,
    TeamOutlined,
    UserOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { Outlet,useNavigate } from "react-router-dom"
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Form submit', '/formsubmit', <UploadOutlined />),
    getItem('Form status', '/formstatus', <DesktopOutlined />),
    getItem('User', '1', <UserOutlined />, [
        getItem('Settings', '/settings',),
        getItem('Password', '/password',),
        getItem('Remarks', '/remarks',),
    ]),
    getItem('Team', '2', <TeamOutlined />, [getItem('IOT', '/iot'), getItem('MIT', '/mit')]),
    getItem('Exit', '/exit', <LogoutOutlined />)
];



const View: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);


    const navigateTo = useNavigate();

    const {
        token: { colorBgContainer },
    } = theme.useToken();




    const menuClick = (e: { key: string }) => {
        console.log("点击了菜单", e.key);
        
        //点击跳转到对应的路由(代码中跳转属于编程式导航跳转)
        navigateTo(e.key);
    }



    return (
        <Layout style={{ minHeight: '100vh' }}>

            {/*左侧侧边栏*/}
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>      

                < div className="brand" >
                    <img src="/src/img/logo.png" alt="logo" />
                </div>
                <Mainmenu />

                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={menuClick} />

            </Sider>
            {/*右侧内容*/}

            <Layout>
                {/*右侧头部*/}
                <Header style={{ paddingLeft: '16px', background: colorBgContainer }} >
                    
                </Header>
                {/*右侧大空白*/}
                <Content style={{ margin: '16px 16px 0', background: "white" }} >
                    {/*此处放窗口*/}
                    <Outlet />
                </Content>

                <Footer style={{ textAlign: 'center' ,padding:0,lineHeight:'48px'}}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};

export default View;