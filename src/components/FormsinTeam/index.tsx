import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Modal, message, DatePicker } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

interface DataType {
    status: any;
    key: string;
    userName: string;
    department: string;
    formId: string;
    formName: string;
    submitTime: string;
}

const ExampleComponent: React.FC = () => {
    const [data, setData] = useState<DataType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const token = localStorage.getItem('formsubmission-token');
    const [formData, setFormData] = useState<any | null>(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    let decodedToken: { department: string; userName: string; userType: string,staffCode:string} | null = null;
    if (token) {
        decodedToken = jwtDecode(token);
    }

    const handleView = async (formId: string) => {
        try {
            const response = await axios.get(`http://localhost:5223/api/User/ViewForm/${formId}`);
            // Assuming the response contains the form data you want to display
            response.data.formName = response.data.formName;
            response.data.submitTime = new Date(response.data.submitTime).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
            setFormData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(`Error fetching form ${formId}:`, error);
        }

        setIsModalOpen(true);
    };

    const handleStartChange = (value: any) => {
        if (endDate && value && value.isAfter(endDate)) {
            message.error("Start date cannot be after end date.");
            setStartDate(null);
        } else {
            setStartDate(value);
        }
    };

    const handleEndChange = (value: any) => {
        if (startDate && value && value.isBefore(startDate)) {
            message.error("End date cannot be before start date.");
            setEndDate(null);
        } else {
            setEndDate(value);
        }
    };

    useEffect(() => {
        fetchData();
    }, [startDate, endDate,statusFilter]);

    const fetchData = async () => {
        try {
            const result = await axios.get<DataType[]>(
                'http://localhost:5223/api/User/GetSubmittedForms',
                {
                    params: {
                        userType: decodedToken?.userType,
                        department: decodedToken?.department,
                        staffCode:decodedToken?.staffCode,
                        userName: decodedToken?.userName,
                        startDate: startDate ? startDate : undefined,
                        endDate: endDate ? endDate : undefined,
                        status: statusFilter,
                    },
                }
            );
            console.log(result);
            const transformedData = result.data.map((item: any, index: number) => ({
                key: index.toString(),
                formId: item.formId,
                formName: item.formName,
                userName: item.userName,
                department: item.department,
                status: item.status,
                submitTime: new Date(item.modifyTime).toLocaleString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                }),
            }));

            const filteredData = transformedData.filter((item: DataType) => {
                if (decodedToken?.userType === '1') {
                    return item.status !== '0' && item.status !== '1';
                } else if (decodedToken?.userType === '2') {
                    return item.status !== '0';
                }
                return true;
            });

            setData(filteredData as DataType[]);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const handleApprove = async (formId: string) => {
        Modal.confirm({
            title: 'Confirm Approval',
            content: 'Are you sure you want to approve this form?',
            onOk: async () => {
                try {
                    const response = await axios.put(
                        `http://localhost:5223/api/User/ApproveForm/${formId}`,
                        null, // 将请求主体设置为null
                        {
                            headers: {
                                'Content-Type': 'application/json', // 设置请求头的Content-Type
                            },
                        }
                    );
                    console.log(`Form ${formId} approved successfully.`);
                    message.success(`Form ${formId} approved successfully.`); // 添加成功提示
                    fetchData(); 
                } catch (error) {
                    console.error(`Error approving form ${formId}:`, error);
                }
            },
        });
    };

    const handleDisapprove = async (formId: string) => {
        Modal.confirm({
            title: 'Confirm Disapproval',
            content: 'Are you sure you want to disapprove this form?',
            onOk: async () => {
                try {
                    const response = await axios.put(
                        `http://localhost:5223/api/User/DisapproveForm/${formId}`,
                        null, // 将请求主体设置为null
                        {
                            headers: {
                                'Content-Type': 'application/json', // 设置请求头的Content-Type
                            },
                        }
                    );
                    console.log(`Form ${formId} disapproved successfully.`);
                    message.success(`Form ${formId} disapproved successfully.`); // 添加成功提示
                    fetchData(); 
                } catch (error) {
                    console.error(`Error disapproving form ${formId}:`, error);
                }
            },
        });
    };

    const renderActions = (_: any, record: DataType) => {
        if (decodedToken?.userType === '1') {
            return (
                <Space size="middle">
                    <a onClick={() => handleView(record.formId)}>View</a>
                    <a onClick={() => handleApprove(record.formId)}>Approve</a>
                    <a onClick={() => handleDisapprove(record.formId)}>Disapprove</a>
                </Space>
            );
        } else if (decodedToken?.userType === '2') {
            return (
                <Space size="middle">
                    <a onClick={() => handleView(record.formId)}>View</a>
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
            filters: [
                { text: 'Saved', value: '1' },
                { text: 'To be approved', value: '2' },
                { text: 'Approved', value: '3' },
                { text: 'Disapproved', value: '4' },
            ],
            onFilter: (value, record) => record.status.toString() === value,
            render: (status) => {
                let statusText = '';
                if (status === 1) {
                    statusText = 'Saved';
                } else if (status === 2) {
                    statusText = 'To be approved';
                } else if (status === 3) {
                    statusText = 'Approved';
                } else if (status === 4) {
                    statusText = 'Disapproved';
                } else if (status === 0) {
                    statusText = 'Editing';
                }
                return <Tag color={status === 1 ? 'blue' : status === 2 ? 'orange' : status === 3 ? 'green' : status === 4 ?'red':'grey'}>{statusText}</Tag>;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: renderActions,
        },
    ];

    return (
        <>
            <div>
                <DatePicker
                    format="YYYY-MM-DD"
                    value={startDate}
                    onChange={handleStartChange}
                />
                <DatePicker
                    format="YYYY-MM-DD"
                    value={endDate}
                    onChange={handleEndChange}
                />
            </div>
            <Table columns={columns} dataSource={data} onChange={(pagination, filters, sorter) => {
                setStatusFilter(filters.status ? filters.status[0] as any : null);
            }} />
            <Modal
                open={isModalOpen}
                title="Form Details"
                onCancel={() => {
                    setIsModalOpen(false);
                    setFormData(null); // Clear form data when closing the modal
                }}
                footer={null}
            >
                {formData ? (
                    <div>
                        <p>FormID: {formData.formId}</p>
                        <p>FormName: {formData.formName}</p>
                        <p>UserName: {formData.userName}</p>
                        <p>Department: {formData.department}</p>
                        <p>SubmitTime: {formData.submitTime}</p>
                        <h4>Components:</h4>
                        {formData.components.map((component:any, index:any) => (
                            <div key={index}>
                                <p>{component.component}: {component.value}</p>
                            </div>
                        ))}
                        <h4>Form images:</h4>
                        {formData.imageUrls ? (
                            formData.imageUrls.map((url:any, index:any) => (
                                <div key={index}>
                                    <img src={url} alt={`Form image ${index + 1}`} style={{ maxWidth: '100%', maxHeight: '400px' }} />
                                </div>
                            ))
                        ) : (
                            <p>No uploaded form images available</p>
                        )}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </Modal>
        </>
    );
};


export default ExampleComponent;