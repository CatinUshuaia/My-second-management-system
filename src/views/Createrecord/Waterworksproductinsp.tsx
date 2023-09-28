import Searchbuttons from "@/components/Searchbuttons"
import { Button } from "antd";
import { useNavigate } from "react-router-dom";


const View = () => {

    const navigateTo = useNavigate();

    const handleClick = (formName: String) => {
        navigateTo("/Createrecord/Waterworksproductinsp/" + formName);
    }

    const allButtons: React.ReactNode[] = [
        <Button type="primary" block className="myCustomButton" key='WaterworksInspectionDuctileIronFittingInspection' onClick={() => handleClick('WaterworksInspectionDuctileIronFittingInspection')} >
            Water Works Inspection - Ductile Iron Fitting Inspection
        </Button>, 
        <Button type="primary" block className="myCustomButton" key='INWW_MHCOV_INSPECT' onClick={() => handleClick('INWW_MHCOV_INSPECT')} >
            Water Works Inspection - Manhole Cover Inspection
        </Button>,
        <Button type="primary" block className="myCustomButton" key='WaterworksInspectionSurfaceBoxInspection' onClick={() => handleClick('WaterworksInspectionSurfaceBoxInspection')} >
            Water Works Inspection - Surface Box Inspection
        </Button>, 
        <Button type="primary" block className="myCustomButton" key='WaterworksInspectionValveInspection' onClick={() => handleClick('WaterworksInspectionValveInspection')} >
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