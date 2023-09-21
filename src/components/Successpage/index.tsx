import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const Successpage: React.FC = () => {

    const navigateTo = useNavigate();

    const handleClick = () => {
        navigateTo("/Homepage");
    }

    return (
        <Result
            status="success"
            title="Successfully Submitted the Form!"
            subTitle="Please wait for approval"
            extra={[
                <Button type="primary" onClick={handleClick} key="ok">
                    OK
                </Button>
            ]}
            />
    );
}

export default Successpage;