import React, { useState } from 'react';
import {
    HomeOutlined,
    TeamOutlined,
    UserOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { MenuProps, message} from 'antd';
import { Menu } from 'antd';
import { useNavigate, useLocation } from "react-router-dom"

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [


    {
        label: 'Home',
        key: '/homepage',
        icon: < HomeOutlined />
    },

    {
        label: 'User',
        key: 'sub1',
        icon: <UserOutlined />,
        children:[
            {
                label: 'Settings',
                key: '/settings',
            },

            {
                label: 'Calendar',
                key: '/Calendar',
            }
        ]
    },

    {
        label: 'Team',
        key: 'sub2',
        icon: <TeamOutlined />,
        children: [
            {
                label: 'Members',
                key: '/Members',
            },

            {
                label: 'Forms',
                key: '/FormsinTeam',
            },
        ] 
    },

     {
        label: 'Exit',
         key: '/exit',
         icon: <LogoutOutlined />
    },

];


const Comp: React.FC = () => { 
    let firstOpenKey: string = "";
    const navigateTo = useNavigate();
    const currentRoute = useLocation();

    function findKey(obj:{key:string}) {
        return obj.key === currentRoute.pathname;
    }

    for (let i = 0; i < items.length; i++)
    {
        if (items[i]!['children'] && items[i]!['children'].length>1 && items[i]!['children'].find(findKey)) {
            firstOpenKey= items[i]!.key as string;
            break;
        }
    }
    

    const [openKeys, setOpenKeys] = useState([firstOpenKey]);
    const handleOpenChange = (keys: string[]) => {
        setOpenKeys([keys[keys.length-1]]);
    }

    const menuClick = (e: { key: string }) => {
        if (e.key === "/exit") {
            localStorage.removeItem("formsubmission-token");
            localStorage.removeItem("formsubmission-token-refresh");
            message.info("Exit successfully");
            navigateTo("/login");
        }

        navigateTo(e.key);
     
    }

        return (
            <Menu theme="dark"
                defaultSelectedKeys={[currentRoute.pathname]}
                mode="inline"
                items={items}
                onClick={menuClick}
                onOpenChange={handleOpenChange}
                openKeys={openKeys}
            />
        )
}

export default Comp;