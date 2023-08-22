import React from 'react';
import { Button, Space } from 'antd';
import { FormOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';



const Homebuttons: React.FC = () => {
    const navigateTo = useNavigate();

    const handleRecordClick = (e:any) => {

        navigateTo("/templates");

    }

    const handleSearchClick = (e: any) => {

        navigateTo("/formsearch");

    }

    const handleCalendarClick = (e: any) => {

        navigateTo("/homepage");

    }


    return (

        <Space size={150} direction="vertical" style={{ width: '100%' }}>
            <Button className="homepageBtn" type="primary" shape="round"  icon={<FormOutlined />} onClick={handleRecordClick}>
                Create Record
            </Button>

            <Button className="homepageBtn" type="primary" shape="round"  icon={<SearchOutlined />} onClick={handleSearchClick}>
                Search Record
            </Button>

            <Button className="homepageBtn" type="primary" shape="round"  icon={<SearchOutlined />} onClick={handleCalendarClick}>
                Calendar
            </Button>

        </Space>
    );
}
export default Homebuttons;