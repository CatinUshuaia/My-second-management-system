import React, { useState } from 'react';

import { Layout,theme } from 'antd';
import { Outlet } from "react-router-dom"
import Mainmenu from "@/components/Mainmenu" 
import Avator from "@/components/Avatar"


const { Header, Content, Footer, Sider } = Layout;


const View: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();




    return (
        <Layout style={{ minHeight: '100vh' }}>

            {/*左侧侧边栏*/}
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>      
                < div className="brand" >
                    <Avator /> 
                </div>
                <Mainmenu />
            </Sider>
            {/*右侧内容*/}

            <Layout>
                {/*右侧头部*/}
                <Header style={{ paddingLeft: '16px', background: colorBgContainer }} >
                    <div className="homeimg">
                        {/*水平居中写法待修改*/}
                        <img src="/src/img/logo.png" style={{marginLeft:706 , height:60}} alt="img" />
                    </div>
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