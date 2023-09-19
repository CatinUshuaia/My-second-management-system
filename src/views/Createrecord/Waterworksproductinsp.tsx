import Searchbuttons from "@/components/Searchbuttons"
import { Button } from "antd";
import { useNavigate } from "react-router-dom";


const View = () => {

    const navigateTo = useNavigate();

    const handleClick = (key: String) => {
        navigateTo("/Createrecord/Waterworksproductinsp/" + key);
    }

    const allButtons: React.ReactNode[] = [
        <Button type="primary" block key='WaterworksInspectionDuctileIronFittingInspection' onClick={() => handleClick('WaterworksInspectionDuctileIronFittingInspection')} >
            Water Works Inspection - Ductile Iron Fitting Inspection
        </Button>, 
        <Button type="primary" block key='WaterworksInspectionManholeCoverInspection' onClick={() => handleClick('WaterworksInspectionManholeCoverInspection')} >
            Water Works Inspection - Manhole Cover Inspection
        </Button>,
        <Button type="primary" block key='WaterworksInspectionSurfaceBoxInspection' onClick={() => handleClick('WaterworksInspectionSurfaceBoxInspection')} >
            Water Works Inspection - Surface Box Inspection
        </Button>, 
        <Button type="primary" block key='WaterworksInspectionValveInspection' onClick={() => handleClick('WaterworksInspectionValveInspection')} >
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