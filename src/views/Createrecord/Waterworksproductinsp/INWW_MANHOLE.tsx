import Searchbuttons from "@/components/Searchbuttons"
import { Button } from "antd";
import { useNavigate } from "react-router-dom";


const View = () => {

    const navigateTo = useNavigate();

    const handleClick = (key: String) => {
        navigateTo("/Createrecord/Waterworksproductinsp/INWW_MANHOLE/" + key);
    }

    const allButtons: React.ReactNode[] = [
        <Button type="primary" block key='INWW_MHCOV_INSPECT' onClick={() => handleClick('INWW_MHCOV_INSPECT')} >
            INWW_MHCOV_INSPECT
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