import React from 'react';
import { Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const Createrecord: React.FC = () => {
    const navigateTo = useNavigate();

    const handleClick = (key:String) => {
        navigateTo("/Createrecord/" + key);
    }

    return (
        <>
            <Button type="primary" block onClick={() => handleClick('Bitumen')} >
                Bitumen
            </Button>
            <Button type="primary" block onClick={() => handleClick('Buildingcomponent')} >
                Building Component
            </Button>
            <Button type="primary" block onClick={() => handleClick('Buildingcomponentrock')} >
                Building Component-ROCK
            </Button>
            <Button type="primary" block onClick={() => handleClick('Buildingdiagnostic')} >
                Building Diagnostic
            </Button>
            <Button type="primary" block onClick={() => handleClick('Cement')} >
                Cement
            </Button>
            <Button type="primary" block onClick={() => handleClick('Chemical')} >
                Chemical
            </Button>
            <Button type="primary" block onClick={() => handleClick('Chinesemedicine')} >
                Chinese Medicine
            </Button>
            <Button type="primary" block onClick={() => handleClick('Concretecore')} >
                Concrete Core
            </Button>
            <Button type="primary" block onClick={() => handleClick('Concretecube')} >
                Concrete Cube
            </Button>
            <Button type="primary" block onClick={() => handleClick('Drainagepipe')} >
                Drainage Pipe
            </Button>
            <Button type="primary" block onClick={() => handleClick('Environmental')} >
                Environmental
            </Button>
            <Button type="primary" block onClick={() => handleClick('Food')} >
                Food
            </Button>
            <Button type="primary" block onClick={() => handleClick('Generaloffice')} >
                General Office
            </Button>
            <Button type="primary" block onClick={() => handleClick('Geotechnicinvestigation')} >
                Geotechnic Investigation
            </Button>
            <Button type="primary" block onClick={() => handleClick('Microbiological')} >
                Microbiological
            </Button>
            <Button type="primary" block onClick={() => handleClick('NDTwelding')} >
                NDT Welding
            </Button>
            <Button type="primary" block onClick={() => handleClick('Paint')} >
                Paint
            </Button>
            <Button type="primary" block onClick={() => handleClick('Piling')} >
                Piling
            </Button>
            <Button type="primary" block onClick={() => handleClick('Site')} >
                Site
            </Button>
            <Button type="primary" block onClick={() => handleClick('SoilandaggregatephaseI')} >
                Soil and Aggregate phase I
            </Button>
            <Button type="primary" block onClick={() => handleClick('SoilPh2')} >
                Soil Ph.2
            </Button>
            <Button type="primary" block onClick={() => handleClick('Steel')} >
                Steel
            </Button>
            <Button type="primary" block onClick={() => handleClick('Zhongshan2013')} >
                Zhong Shan 2013
            </Button>
        </>
    )
};

export default Createrecord;