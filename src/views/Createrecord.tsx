import Searchbuttons from "@/components/Searchbuttons"
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';


const View = () => {

    const navigateTo = useNavigate();

    const handleClick = (key: String) => {
        navigateTo("/Createrecord/" + key);
    }
    const token = localStorage.getItem('formsubmission-token');

    // 解码 JWT 令牌
    let decodedToken: { department: string } | null = null;
    if (token) {
        decodedToken = jwtDecode(token);
    }
        
        let allButtons: React.ReactNode[] = [
        <Button type="primary" block key='Bitumen' onClick={() => handleClick('Bitumen')} >
            Bitumen
        </Button>,
        <Button type="primary" block key='Buildingcomponent' onClick={() => handleClick('Buildingcomponent')} >
            Building Component
        </Button>,
        <Button type="primary" block key='Buildingcomponentrock' onClick={() => handleClick('Buildingcomponentrock')} >
            Building Component-ROCK
        </Button>,
        <Button type="primary" block key='Buildingdiagnostic' onClick={() => handleClick('Buildingdiagnostic')} >
            Building Diagnostic
        </Button>,
        <Button type="primary" block key='Calibration' onClick={() => handleClick('Calibration')} >
            Calibration
        </Button>,
        <Button type="primary" block key='Cement' onClick={() => handleClick('Cement')} >
            Cement
        </Button>,
        <Button type="primary" block key='Chemical' onClick={() => handleClick('Chemical')} >
            Chemical
        </Button>,
        <Button type="primary" block key='Chinesemedicine' onClick={() => handleClick('Chinesemedicine')} >
            Chinese Medicine
        </Button>,
        <Button type="primary" block key='Concretecore' onClick={() => handleClick('Concretecore')} >
            Concrete Core
        </Button>,
        <Button type="primary" block key='Concretecube' onClick={() => handleClick('Concretecube')} >
            Concrete Cube
        </Button>,
        <Button type="primary" block key='Deepcementmaterialtestinglab' onClick={() => handleClick('Deepcementmaterialtestinglab')} >
            Deep Cement Material Testing Lab
        </Button>,
        <Button type="primary" block key='Drainagepipe' onClick={() => handleClick('Drainagepipe')} >
            Drainage Pipe
        </Button>,
        <Button type="primary" block key='Environmental' onClick={() => handleClick('Environmental')} >
            Environmental
        </Button>,
        <Button type="primary" block key='Fire' onClick={() => handleClick('Fire')} >
            Fire
        </Button>,
        <Button type="primary" block key='Food' onClick={() => handleClick('Food')} >
            Food
        </Button>,
        <Button type="primary" block key='Generaloffice' onClick={() => handleClick('Generaloffice')} >
            General Office
        </Button>,
        <Button type="primary" block key='Geotechnicinvestigation' onClick={() => handleClick('Geotechnicinvestigation')} >
            Geotechnic Investigation
        </Button>,
        <Button type="primary" block key='Microbiological' onClick={() => handleClick('Microbiological')} >
            Microbiological
        </Button>,
        <Button type="primary" block key='NDTwelding' onClick={() => handleClick('NDTwelding')} >
            NDT Welding
        </Button>,
        <Button type="primary" block key='Paint' onClick={() => handleClick('Paint')} >
            Paint
        </Button>,
        <Button type="primary" block key='Piling' onClick={() => handleClick('Piling')} >
            Piling
        </Button>,
        <Button type="primary" block key='Site' onClick={() => handleClick('Site')} >
            Site
        </Button>,
        <Button type="primary" block key='SoilandaggregatephaseI' onClick={() => handleClick('SoilandaggregatephaseI')} >
            Soil and Aggregate phase I
        </Button>,
        <Button type="primary" block key='SoilPh2' onClick={() => handleClick('SoilPh2')} >
            Soil Ph.2
        </Button>,
        <Button type="primary" block key='Steel' onClick={() => handleClick('Steel')} >
            Steel
        </Button>,
        <Button type="primary" block key='Waterworksproductinsp' onClick={() => handleClick('Waterworksproductinsp')} >
            Water Works ProductInsp.
        </Button>,
        <Button type="primary" block key='Zhongshan2013' onClick={() => handleClick('Zhongshan2013')} >
            Zhong Shan 2013
        </Button>
    ];

    if (decodedToken && decodedToken.department === "Water Works ProductInsp.") {
        allButtons = [<Button type="primary" block key='Waterworksproductinsp' onClick={() => handleClick('Waterworksproductinsp')} >
            Water Works ProductInsp.
        </Button>,]
    }

    if (decodedToken && decodedToken.department === "Zhong Shan 2013") {
        allButtons = [<Button type="primary" block key='Zhongshan2013' onClick={() => handleClick('Zhongshan2013')} >
            Zhong Shan 2013
        </Button>,]
    }     

        return (
            <>
                <div style={{ fontSize: 30, paddingLeft: 10, lineHeight: '48px', color: 'grey' }}>
                    Create Record
                </div>
                <div className="formsearch">
                    <Searchbuttons allButtons={allButtons} />
                </div>
            </>
        )
};


export default View