import { FormOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const View = () => {
    const navigateTo = useNavigate();
    const token = localStorage.getItem('formsubmission-token');
    let decodedToken: { userName: string } | null = null;
    if (token) {
        decodedToken = jwtDecode(token);
    }

    const handleCreateClick = (e: any) => {
        navigateTo("/Createnewsample");
    }

    const handleSelectClick = () => {
        Modal.info({
            title: 'Select Created Sample',
            content: (
                <div>
                    {/* 在这里放置选择项目的界面内容 */}
                    <p>sample 1</p>
                    <p>sample 2</p>
                    <p>sample 3</p>
                </div>
            ),
            onOk() { },
        });
    }

    return (
        <div>
            <div className="home" >
                <p>Welcome, {decodedToken ? decodedToken.userName : "Sir/Madam"}</p>
            </div>
            <div className="button-container">
                <Button className="square-button" icon={<FormOutlined />} onClick={handleCreateClick} style={{ fontWeight: 'bold', fontSize: '20px' }}>Create New Sample</Button>
                <Button className="square-button" icon={<SearchOutlined />} onClick={handleSelectClick} style={{ fontWeight: 'bold', fontSize: '20px' }}>Select Created Sample</Button>
            </div>
        </div>
    )
}

export default View;