import Step from "@/components/Step"
import { Space } from "antd"
import Formstatus from "../components/Formstatus"


const View = () => {
    return (
        <div className="home">
            
            <div className="home" style={{ fontSize: 30, textAlign: 'left', padding: 10, lineHeight: '48px', color: 'grey' }}>
                <p>Form Status Page</p>
            </div>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Step />
            <Formstatus />
            <hr />
            <Step />
            <Formstatus />
            <hr />
            <Step />
                <Formstatus />
            </Space>
            
        </div>

        
    )
}

export default View