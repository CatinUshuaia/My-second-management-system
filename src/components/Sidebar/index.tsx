import React, { useEffect, useState } from 'react';
import { Button, Menu, Modal } from 'antd';
import Newform from '../Newform';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

// 定义 Project 类型
type Project = {
    id: string;
    name: string;
};

const Sidebar: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const token = localStorage.getItem('formsubmission-token');
    let decodedToken: { department: string, userName: string, userType: number, staffCode: string } | null = null;
    if (token) {
        decodedToken = jwtDecode(token);
    }


    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get(`http://localhost:5223/Test/GetProjectRecords?staffCode=${decodedToken?.staffCode}`);
                setProjects(res.data.map((projectRecord: { projectId: any; projectName: any; }) => ({
                    id: projectRecord.projectId,
                    name: projectRecord.projectName
                })));
                console.log(projects);
            } catch (error) {
                console.error("获取已创建项目失败: ", error);
            }
        };
        fetchProjects();
    }, []);

    const handleDeleteProject = (projectId: string) => {
        // 显示确认对话框
        Modal.confirm({
            title: 'Are you sure delete this project?',
            icon: <ExclamationCircleOutlined />,
            content: 'This operation cannot be undone.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                setProjects(projects.filter(project => project.id !== projectId));
            },
        });
    };


    const handleCreateProject = (newProject: Project) => {
        setProjects([...projects, newProject]);
    };

    return (
        <Menu mode="inline" className="my-custom-sidebar">
            {/* 添加标题 */}
            <Menu.Item key="title" className="sidebar-title">
                Project details
            </Menu.Item>

            {projects.map(project => (
                <Menu.Item key={project.id}>
                    {project.name}
                    <Button
                        type="link"
                        onClick={() => handleDeleteProject(project.id)}
                        style={{ color: 'red', float: 'right' }}
                    >
                        <DeleteOutlined />
                    </Button>
                </Menu.Item>
            ))}

            {/* 在底部添加 Newform */}
            <Menu.Item key="newform" className="newform-container">
                <Newform onCreateProject={handleCreateProject} />
            </Menu.Item>
        </Menu>
    );
};

export default Sidebar;