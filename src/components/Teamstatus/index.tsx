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
                <a>N/A</a>
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
                const result = await axios.get<DataType[]>(`http://192.168.2.73:5223/api/User/getTeam/${decodedToken?.department}`);
                const transformedData = result.data.map((user: any, index: number) => ({
                    key: index.toString(),
                    name: user.name || 'N/A',
                    department: user.department || 'N/A',
                    userType: user.userType === '1' ? ['ADMIN'] : ['USER'],
                }));
                setData(transformedData as any);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []); 

    return <Table columns={columns} dataSource={data} />;
};

export default Teamstatus;