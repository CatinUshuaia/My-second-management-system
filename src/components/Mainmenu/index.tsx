import React, { useState } from 'react';
import {
    DesktopOutlined,
    UploadOutlined,
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
        label: 'Form submit',
        key: '/formsubmit',
        icon: <UploadOutlined />
    },

    {
        label: 'Form status',
        key: '/formstatus',
        icon: <DesktopOutlined />
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
                label: 'Password',
                key: '/password',
            },

            {
                label: 'Remarks',
                key: '/remarks',
            }
        ]
    },

    {
        label: 'Team',
        key: 'sub2',
        icon: <TeamOutlined />,
        children: [
            {
                label: 'IOT',
                key: '/iot',
            },

            {
                label: 'MIT',
                key: '/mit',
            },
        ]
    },

     {
        label: 'Exit',
         key: '/exit',
         icon: <LogoutOutlined />
    },


];


//function getItem(
//    label: React.ReactNode,
//    key: React.Key,
//    icon?: React.ReactNode,
//    children?: MenuItem[],
//): MenuItem {
//    return {
//        key,
//        icon,
//        children,
//        label,
//    } as MenuItem;
//}

    //getItem('Form submit', '/formsubmit', <UploadOutlined />),
    //getItem('Form status', '/formstatus', <DesktopOutlined />),
    //getItem('User', 'sub1', <UserOutlined />, [
    //    getItem('Settings', '/settings',),
    //    getItem('Password', '/password',),
    //    getItem('Remarks', '/remarks',),
    //]),
    //getItem('Team', 'sub2', <TeamOutlined />, [getItem('IOT', '/iot'), getItem('MIT', '/mit')]),
    //getItem('Exit', '/exit', <LogoutOutlined />)



const Comp: React.FC = () => { 
    let firstOpenKey: string = "";
    const navigateTo = useNavigate();
    const currentRoute = useLocation();

    
    //此处可以优化
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


    //设置展开项的初始值
    

    const [openKeys, setOpenKeys] = useState([firstOpenKey]);
    const handleOpenChange = (keys: string[]) => {
        //将数组修改成最后一项
        setOpenKeys([keys[keys.length-1]]);
    }

    const menuClick = (e: { key: string }) => {
        
        //如果点击exit,则会从localstorage中删除token并导向到登录页面
        if (e.key === "/exit") {
            localStorage.removeItem("formsubmission-token");
            message.info("已退出当前用户");
            navigateTo("/login");
        }

        //点击跳转到对应的路由(代码中跳转属于编程式导航跳转)
        navigateTo(e.key);
     
    }

        return (
            <Menu theme="dark"
                //表示当前样式所在的选中项的key值
                defaultSelectedKeys={[currentRoute.pathname]}
                mode="inline"
                //菜单数据
                items={items}
                onClick={menuClick}
                //某项菜单展开和回收的事件
                onOpenChange={handleOpenChange}
                //当前菜单展开项的key数组
                openKeys={openKeys}
            />
        )
}

export default Comp;