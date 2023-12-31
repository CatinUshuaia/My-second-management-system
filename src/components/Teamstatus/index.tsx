import React, { useState, useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

interface DataType {
    key: string;
    name: string;
    department: string;
    email: string;
    userType: string[];
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Department',
        dataIndex: 'department',
        key: 'department',
    },
    {
        title: 'UserType',
        key: 'userType',
        dataIndex: 'userType',
        render: (_, { userType }) => (
            <>
                {userType.map((userType) => {
                    let color = userType === 'ADMIN' ? 'red' : 'green';
                    return (
                        <Tag color={color} key={userType}>
                            {userType.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>View</a>
            </Space>
        ),
    },
];

const Teamstatus: React.FC = () => {
    const [data, setData] = useState<DataType[]>([]);
    const token = localStorage.getItem('formsubmission-token');
    let decodedToken: { department: string; userName: string; userType: number } | null = null;
    if (token) {
        decodedToken = jwtDecode(token);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Replace with your API endpoint
                const result = await axios.get<DataType[]>(`http://localhost:5223/api/User/getTeam/${decodedToken?.department}`);
                console.log(result);
                const transformedData = result.data.map((user: any, index: number) => ({
                    key: index.toString(),
                    name: user.name || 'N/A',
                    email: user.email || 'N/A',
                    department: user.department || 'N/A',
                    userType: user.userType === '1' ? ['ADMIN'] : ['USER'],
                }));
                setData(transformedData as any);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs once when component mounts

    return <Table columns={columns} dataSource={data} />;
};

export default Teamstatus;