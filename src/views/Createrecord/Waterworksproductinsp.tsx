import Searchbuttons from "@/components/Searchbuttons"
import { Button } from "antd";
import { useNavigate } from "react-router-dom";


const View = () => {

    const navigateTo = useNavigate();

    const handleClick = (key: String) => {
        navigateTo("/Createrecord/Waterworksproductinsp/" + key);
    }

    const allButtons: React.ReactNode[] = [
        <Button type="primary" block key='INWW_MANHOLE' onClick={() => handleClick('INWW_MANHOLE')} >
            INWW_MANHOLE
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