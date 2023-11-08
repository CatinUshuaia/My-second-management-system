import { useEffect, useState } from 'react';
import { Input, Button, Table, Space, DatePickerProps, Select, DatePicker, Form, message, Modal, Popconfirm } from 'antd';
import { formDeleteAPI, formSearchAPI } from '../../request/api';
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import axios from 'axios';


interface Record {
    showDeleteConfirm: boolean | undefined;
    status: string;
    formName: string;
    staffCode: string;
    userName: string;
    createTime: string;
    department: string;
    formId: string;
}

interface ResponseData {
    labFullName: string;
    analysisTemplates: string[];
}


interface LabDataItem {
    key: string;
    title: string;
}


const Searchtest: React.FC = () => {
    const [data, setData] = useState<Record[]>([]);
    const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
    const [deletingRecord, setDeletingRecord] = useState<Record | null>(null);
    const [form] = Form.useForm();
    const navigateTo = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isOk, setIsOk] = useState<boolean>(false);
    const [formData, setFormData] = useState<any | null>(null);
    const [labData, setLabData] = useState<LabDataItem[]>([]);
    const [testData, setTestdata] = useState<{ [key: string]: string[] }>({});
    const [labs, setLabs] = useState([]);
    const [test, setTest] = useState('');
    const token = localStorage.getItem('formsubmission-token');
    let decodedToken: { department: string, userName: string, userType: string, staffCode: string } | null = null;
    if (token) {
        decodedToken = jwtDecode(token);
    }

    useEffect(() => {
        const fetchLabData = async () => {
            try {
                const response = await axios.get(`http://localhost:5223/Test/getSearchIndex`);
                const uniqueLabFullNames = [...new Set(response.data.map((data: any) => data.labFullName))];

                const updatedLabData = uniqueLabFullNames.map((labFullName: any) => {
                    const key = labFullName.replace(/[.\s-]/g, '').toUpperCase();
                    return {
                        key,
                        title: labFullName.trim(),
                    } as LabDataItem;
                });

                const testData: { [key: string]: string[] } = {};

                response.data.forEach((lab: ResponseData) => {
                    const key = lab.labFullName.replace(/[.\s-]/g, '').toUpperCase();
                    testData[key] = lab.analysisTemplates;
                });
                setLabData(updatedLabData);
                setTestdata(testData);
                setIsOk(true);
            } catch (error) {
                console.error('Error fetching lab data:', error);
            }
        };

        fetchLabData();
    }, []);


    useEffect(() => {
        if (labData.length > 0) {
            setLabs(testData[labData[0]?.key] as any);
            setTest(testData[labData[0]?.key][0]);
        }
    }, [labData, testData]);


    const handleView = async (formId: string) => {
        try {
            const response = await axios.get(`http://localhost:5223/api/User/ViewForm/${formId}`);
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
        } catch (error) {
            console.error(`Error fetching form ${formId}:`, error);
        }

        setIsModalOpen(true);
    };

    const handleCancel = (record:Record) => {
        setDeleteConfirmVisible(false);
    };

    const handleOk = async (record: Record) => {
        setDeleteConfirmVisible(false);

        const deleteData: FormDeleteAPIReq = {
            formId: record.formId,
            formName: record.formName,
            staffCode: record.staffCode,
            createTime: record.createTime,
            department: record.department
        };

        try {
            const response: FormDeleteAPIRes = await formDeleteAPI(deleteData);
            message.success('Record deleted successfully.');
            form.submit();
        } catch (error) {
            console.log('Error:', error);
            message.error('Failed to delete the record.');
        }
    };

    const columns = [
        {
            title: 'formId',
            dataIndex: 'formId',
            key: 'formId',
            sorter: (a: Record, b: Record) => a.userName.localeCompare(b.formId),
        },
        {
            title: 'formName',
            dataIndex: 'formName',
            key: 'formName',
            sorter: (a: Record, b: Record) => a.formName.localeCompare(b.formName),
            render: (formName: string) => {
                return formName;
            },
        },
        {
            title: 'userName',
            dataIndex: 'userName',
            key: 'userName',
            sorter: (a: Record, b: Record) => a.userName.localeCompare(b.userName),
        },
        {
            title: 'createTime',
            dataIndex: 'createTime',
            key: 'createTime',
            sorter: (a: Record, b: Record) => new Date(a.createTime).getTime() - new Date(b.createTime).getTime(),
            render: (createTime: string) => {
                const dateTime = new Date(createTime);
                const formattedDateTime = dateTime.toLocaleString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                });
                return formattedDateTime;
            },
        },
        {
            title: 'department',
            dataIndex: 'department',
            key: 'department',
            sorter: (a: Record, b: Record) => a.department.localeCompare(b.department),
        },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                switch (status) {
                    case '0':
                        return 'Editing';
                    case '1':
                        return 'Editing';
                    case '2':
                        return 'Submitted';
                    case '3':
                        return 'Approved';
                    case '4':
                        return 'Disapproved';
                    default:
                        return 'unknown';
                    
                }
            },
            sorter: (a: Record, b: Record) => a.status.localeCompare(b.status),
        },
        {
            title: 'action',
            key: 'action',
            render: (text: string, record: Record) => (
                <Space>
                    {decodedToken?.userType === "1" ? (
                        <>
                            <Button
                                style={{ width: '80px' }}
                                onClick={() => handleView(record.formId)}
                                disabled={record.status === '1' || record.status === '0'}
                            >
                                View
                            </Button>
                            {record.userName === decodedToken?.userName && (
                                <>
                                    <Button
                                        style={{ width: '80px' }}
                                        onClick={() => {
                                            navigateTo(`/Createrecord/Templates/${record.formName}/${record.formId}`);
                                        }}
                                        disabled={record.status !== '1' && record.status !== '0'}
                                    >
                                        Edit
                                    </Button>

                                    <Popconfirm
                                        title="Are you sure to delete this record?"
                                        onConfirm={() => handleOk(record)}
                                        onCancel={() => handleCancel(record)}
                                        open={record.showDeleteConfirm}
                                    >
                                    <Button
                                        style={{ width: '80px' }}
                                        onClick={() => handleDelete(record)}
                                        disabled={record.status !== '1' && record.status !== '0'}
                                    >
                                        Delete
                                        </Button>
                                    </Popconfirm>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            {record.userName === decodedToken?.userName && ( 
                                <>
                                        <Button
                                            style={{ width: '80px' }}
                                            onClick={() => {
                                                navigateTo(`/Createrecord/Templates/${record.formName}/${record.formId}`);
                                            }}
                                            disabled={record.status !== '1' && record.status !== '0'}
                                        >
                                            Edit
                                        </Button>
                                       
                                        <Popconfirm
                                            title="Are you sure to delete this record?"
                                            onConfirm={() => handleOk(record)}
                                            onCancel={() => handleCancel(record)}
                                            open={deleteConfirmVisible && deletingRecord?.formId === record.formId}
                                        >
                                    <Button
                                        style={{ width: '80px' }}
                                        onClick={() => handleDelete(record)}
                                        disabled={record.status !== '1' && record.status !== '0'}
                                    >
                                        Delete
                                    </Button>
                                    </Popconfirm>
                                </>
                            )}
                        </>
                    )}
                </Space>
            ),
        },
    ];



    const handleLabChange = (value: any) => {
        setLabs(testData[value] as any);
        form.setFieldsValue({ test: undefined });
    };

    const handleDelete = (record: Record) => {
        setDeletingRecord(record as any);
        setDeleteConfirmVisible(true);
    };

    const ontestChange = (value: any) => {
        setTest(value);
    };

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    const onFinish = async (values: any) => {
        const { dateFrom, dateTo, ...rest } = values;

        const formattedValues: FormSearchAPIReq = {
            ...rest,
            userType: decodedToken ? decodedToken.userType : '',
            staffCode: decodedToken ? decodedToken.staffCode:'',
            dateFrom: dateFrom ? dateFrom.format('YYYY-MM-DD') : undefined,
            dateTo: dateTo ? dateTo.format('YYYY-MM-DD') : undefined
        };

        console.log('Searching');

        try {
            const response = await formSearchAPI(formattedValues);
            setData(response.records);

            if (response.records.length === 0) {
                message.info('No records found.');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };


    return (
        <>
                <Form onFinish={onFinish} form={form}>
                    <Space direction="vertical" size="small">
                        Lab:
                        <Form.Item name="lab">
                            <Select
                                key={"lab"}
                                style={{ width: 480 }}  
                                onChange={handleLabChange}
                                options={labData.map((lab: any) => ({ label: lab.title, value: lab.key }))}
                            />
                        </Form.Item>

                        Test:
                        <Form.Item name="test">
                            <Select
                                style={{ width: 480 }}
                                value={test as any}
                                onChange={ontestChange}
                                options={(labs).map((test: any) => ({ label: test, value: test }))}
                            />
                        </Form.Item>

                        Date From:
                        <Form.Item name="dateFrom">
                            <DatePicker style={{ width: 480 }} onChange={onChange} />
                        </Form.Item>
                        Date To:
                        <Form.Item name="dateTo">
                            <DatePicker style={{ width: 480 }} onChange={onChange} />
                        </Form.Item>

                        <Button type="primary" htmlType="submit" block style={{ marginBottom: '16px' }}>
                            Search
                        </Button>
                    </Space>
                    <Table columns={columns} dataSource={data.map((item, index) => ({ ...item, key: index }))} pagination={{ pageSize: 10 }} />
                    <Modal
                        open={isModalOpen}
                        title="Form Details"
                        onCancel={() => {
                            setIsModalOpen(false);
                            setFormData(null); 
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
                                {formData.components.map((component: any, index: any) => (
                                    <div key={index}>
                                        <p>{component.component}: {component.value}</p>
                                    </div>
                                ))}
                                <h4>Form images:</h4>
                                {formData.imageUrls ? (
                                    formData.imageUrls.map((url: any, index: any) => (
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
                </Form>
        </>
    );
};

export default Searchtest;