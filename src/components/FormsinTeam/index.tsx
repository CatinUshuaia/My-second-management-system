import React, { useState, useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

interface DataType {
    key: string;
    userName: string;
    department: string;
    formId: string;
    formName: string;
    submitTime: string;
}

const ExampleComponent: React.FC = () => {
    const [data, setData] = useState<DataType[]>([]);
    const token = localStorage.getItem('formsubmission-token');
    let decodedToken: { department: string; userName: string; userType: string } | null = null;
    if (token) {
        decodedToken = jwtDecode(token);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get<DataType[]>(
                    'http://localhost:5223/api/User/GetSubmittedForms',
                    {
                        params: {
                            userType: decodedToken?.userType,
                            department: decodedToken?.department,
                            userName: decodedToken?.userName,
                        },
                    }
                );
                console.log(result);
                const transformedData = result.data.map((item: any, index: number) => ({
                    key: index.toString(),
                    formId: item.formId,
                    formName: item.formName.replace(/([A-Z])/g, " $1").trim(),
                    userName: item.userName,
                    department: item.department,
                    status:item.status,
                    submitTime: new Date(item.modifyTime).toLocaleString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    })
                }));
                setData(transformedData as DataType[]);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, [decodedToken?.userType, decodedToken?.department, decodedToken?.userName]);

    const renderActions = (_: any, record: any) => {

        if (decodedToken?.userType === '1') {
            return (
                <Space size="middle">
                    <a>View</a>
                    <a>Approve</a>
                    <a>Disapprove</a>
                </Space>
            );
        } else if (decodedToken?.userType === '2') {
            return (
                <Space size="middle">
                    <a>View</a>
                </Space>
            );
        }

        return null;
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'formId',
            dataIndex: 'formId',
            key: 'formId',
        },
        {
            title: 'formName',
            dataIndex: 'formName',
            key: 'formName',
        },
        {
            title: 'userName',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'department',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: 'submitTime',
            dataIndex: 'submitTime',
            key: 'submitTime',
        },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let statusText = '';
                if (status === 0) {
                    statusText = 'Saved';
                } else if (status === 1) {
                    statusText = 'To be approved';
                } else if (status === 2) {
                    statusText = 'Approved';
                } else if (status === 3) {
                    statusText = 'Disapproved';
                }
                return <Tag color={status === 0 ? 'blue' : status === 1 ? 'orange' : status === 2 ? 'green' : 'red'}>{statusText}</Tag>;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: renderActions,
        },
    ];

    return <Table columns={columns} dataSource={data} />;
};

export default ExampleComponent;