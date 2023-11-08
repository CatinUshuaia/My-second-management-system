import { FormOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, List, Modal } from "antd";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";
import { useNavigate } from "react-router-dom";

const View = () => {
    const navigateTo = useNavigate();
    const token = localStorage.getItem('formsubmission-token');
    let decodedToken: { department: string, userName: string, userType: number, staffCode: string } | null = null;
    if (token) {
        decodedToken = jwtDecode(token);
    }

    const handleCreateClick = (e: any) => {
        navigateTo("/Createnewproject");
    }

    const handleProjectSelect = (projectId: number, projectName:string) => {
        navigateTo(`/Createnewproject/Templates/${projectName}/${projectId}`);
        Modal.destroyAll();
    }

    const handleSelectClick = async () => {
        try {
            const response = await axios.get(`http://localhost:5223/Test/GetProjectRecords?staffCode=${decodedToken?.staffCode}`)
            console.log(response);
            const projectsData = response.data;
            Modal.info({
                title: 'Select Created Project',
                content: (
                    <List
                        itemLayout="horizontal"
                        dataSource={projectsData}
                        pagination={{
                            pageSize: 10,
                        }}
                        renderItem={(project: { projectId: number; projectName: string }) => (
                            <List.Item className="project-item" onClick={() => handleProjectSelect(project.projectId, project.projectName)}>
                                <List.Item.Meta
                                    title={`Project Name: ${project.projectName}`}
                                    description={`Project ID: ${project.projectId}`}
                                />
                            </List.Item>
                        )}
                    />
                ),
                onOk() { },
                okText: 'Back',
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="home" >
                <p>Welcome, {decodedToken ? decodedToken.userName : "Sir/Madam"}</p>
            </div>
            <div className="button-container">
                <Button className="square-button" icon={<FormOutlined />} onClick={handleCreateClick} style={{ fontWeight: 'bold', fontSize: '20px' }}>Create New Project</Button>
                <Button className="square-button" icon={<SearchOutlined />} onClick={handleSelectClick} style={{ fontWeight: 'bold', fontSize: '20px' }}>Select Created Project</Button>
            </div>
        </div>
    )
}

export default View;