import Searchbuttons from "@/components/Searchbuttons"
import { Button, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const View = () => {
    const { labName } = useParams();
    const [templateData, setTemplateData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigateTo = useNavigate();

    const handleClick = (projectName: string) => {
        navigateTo(`/Createnewproject/Templates/${projectName}/-1`);
    };

    useEffect(() => {
        fetchTemplate();
    }, []);

    const fetchTemplate = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5223/Test/getProjectTemplate", { params: { labName } }
            );
            setTemplateData(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const generateButtons = () => {
        return templateData.map((template: any) => (
            <Button
                type="primary"
                block
                className="myCustomButton"
                key={template.analysisDisplayName}
                onClick={() => handleClick(template.analysisTemplate)}
            >
                {template.analysisDisplayName}
            </Button>
        ));
    };

    return (
        <>
            <div style={{ fontSize: 30, paddingLeft: 20, lineHeight: '48px', color: 'grey' }}>
                Create Project
            </div>
            <div className="formsearch">
                {isLoading ? <Spin /> : <Searchbuttons allButtons={generateButtons()} />}
            </div>
        </>
    );
}

export default View