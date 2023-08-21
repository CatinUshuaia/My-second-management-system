import React from 'react';
import { Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const Templates: React.FC = () => {
    const navigateTo = useNavigate();

    const handleClick = (e: any) => {
        navigateTo("/formsubmit");
    }

    return (
        <>
            <Button type="primary" block onClick={handleClick} >
                Primary
            </Button>
            <Button type="primary" block onClick={handleClick} >
                Primary
            </Button>
            <Button type="primary" block onClick={handleClick} >
                Primary
            </Button>
            <Button type="primary" block onClick={handleClick} >
                Primary
            </Button>
            <Button type="primary" block onClick={handleClick} >
                Primary
            </Button>
            <Button type="primary" block onClick={handleClick} >
                Primary
            </Button>
            <Button type="primary" block onClick={handleClick} >
                Primary
            </Button>
            <Button type="primary" block onClick={handleClick} >
                Primary
            </Button>
            <Button type="primary" block onClick={handleClick} >
                Primary
            </Button>
            <Button type="primary" block onClick={handleClick} >
                Primary
            </Button>
            <Button type="primary" block onClick={handleClick} >
                Primary
            </Button>
            <Button type="primary" block onClick={handleClick} >
                Primary
            </Button>
            <Button type="primary" block onClick={handleClick} >
                Primary
            </Button>
            <Button type="primary" block onClick={handleClick} >
                Primary
            </Button>
            <Button type="primary" block onClick={handleClick} >
                Primary
            </Button>
            <Button type="primary" block onClick={handleClick} >
                Primary
            </Button>
            <Button type="primary" block onClick={handleClick} >
                Primary
            </Button>
            <Button type="primary" block onClick={handleClick} >
                Primary
            </Button>
        </>
    )
};

export default Templates;