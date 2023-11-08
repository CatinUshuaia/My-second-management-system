import React from 'react';
import { Button, Space } from 'antd';
import { FormOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';



const Homebuttons: React.FC = () => {
    const navigateTo = useNavigate();

    const handleRecordClick = (e:any) => {

        navigateTo("/Createrecord");

    }

    const handleSearchClick = (e: any) => {

        navigateTo("/Formsearch");

    }


    return (

        <Space size={150} direction="vertical" style={{ width: '100%' }}>
            <Button className="homepageBtn" type="primary" shape="round" icon={<FormOutlined />} onClick={handleRecordClick} style={{ fontWeight: 'bold', fontSize: '20px' }}>
                Create Record
            </Button>

            <Button className="homepageBtn" type="primary" shape="round" icon={<SearchOutlined />} onClick={handleSearchClick} style={{ fontWeight: 'bold', fontSize: '20px' }}>
                Search Record
            </Button>

        </Space>
    );
}
export default Homebuttons;