import Searchbuttons from "@/components/Searchbuttons";
import { Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from "react";
import axios from "axios";

const View = () => {
    const navigateTo = useNavigate();
    const [labData, setLabData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleClick = (labName: string) => {
        navigateTo("/Createrecord/" + labName);
    };

    const token = localStorage.getItem('formsubmission-token');

    // 解码 JWT 令牌
    let decodedToken: {
        department: string,
        Type: string, staffCode: string
    } | null = null;
    if (token) {
        decodedToken = jwtDecode(token);
    }

    useEffect(() => {
        fetchLabStructure();
    }, []);

    const fetchLabStructure = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5223/Test/getLab?staffCode=${decodedToken?.staffCode}`
            );
            setLabData(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const generateButtons = () => {
        return labData.map((lab: any) => (
            <Button
                type="primary"
                block
                className="myCustomButton"
                key={lab.labKey}
                onClick={() => handleClick(lab.labFullName)}
            >
                {lab.labFullName}
            </Button>
        ));
    };

    return (
        <>
            <div style={{ fontSize: 30, paddingLeft: 20, lineHeight: '48px', color: 'grey' }}>
                Create Record
            </div>
            <div className="formsearch">
                {isLoading ? <Spin /> : <Searchbuttons allButtons={generateButtons()} />}
            </div>
        </>
    );
};

export default View;