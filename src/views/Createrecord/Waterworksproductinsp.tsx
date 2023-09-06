import Searchbuttons from "@/components/Searchbuttons"
import { Button } from "antd";
import { useNavigate } from "react-router-dom";


const View = () => {

    const navigateTo = useNavigate();

    const handleClick = (key: String) => {
        navigateTo("/Createrecord/Waterworksproductinsp/" + key);
    }

    const allButtons: React.ReactNode[] = [
        <Button type="primary" block key='WaterWorksInspectionDuctileIronFittingInspection' onClick={() => handleClick('WaterWorksInspectionDuctileIronFittingInspection')} >
            Water Works Inspection - Ductile Iron Fitting Inspection
        </Button>, 
        <Button type="primary" block key='WaterWorksInspectionManholeCoverInspection' onClick={() => handleClick('WaterWorksInspectionManholeCoverInspection')} >
            Water Works Inspection - Manhole Cover Inspection
        </Button>,
        <Button type="primary" block key='WaterWorksInspectionSurfaceBoxInspection' onClick={() => handleClick('WaterWorksInspectionSurfaceBoxInspection')} >
            Water Works Inspection - Surface Box Inspection
        </Button>, 
        <Button type="primary" block key='WaterWorksInspectionValveInspection' onClick={() => handleClick('WaterWorksInspectionValveInspection')} >
            Water Works Inspection - Valve Inspection
        </Button>, 
    ];


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
}

export default View