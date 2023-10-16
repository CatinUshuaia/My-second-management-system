import { useEffect, useState } from 'react';
import { Input, Button, Table, Space, DatePickerProps, Select, DatePicker, Form, message, Modal } from 'antd';
import { testData } from '../../Formproperties/testdata';
import { labData}  from '../../Formproperties/labdata';
import { formDeleteAPI, formSearchAPI } from '../../request/api';
import { useNavigate } from "react-router-dom";
import { format } from 'path';
import jwtDecode from 'jwt-decode';
import axios from 'axios';


interface Record {
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
    const [form] = Form.useForm();
    const navigateTo = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState<any | null>(null);
    const [labDat, setLabData] = useState<LabDataItem[]>([]);
    const [testdat, setTestdata] = useState<{ [key: string]: string[] }>({});
    const token = localStorage.getItem('formsubmission-token');
    let decodedToken: { department: string, userName: string, userType: string, staffCode: string } | null = null;
    if (token) {
        decodedToken = jwtDecode(token);
    }

    useEffect(() => {
        const fetchLabData = async () => {
            try {
                const response = await axios.get(`http://localhost:5223/Test/getSearchIndex`);
                console.log(response.data);
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
                console.log(labDat);
                console.log(testdat);
            } catch (error) {
                console.error('Error fetching lab data:', error);
            }
        };

        fetchLabData();
    }, []);


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

    console.log(labDat);
    console.log(testdat);
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
                    case '2':
                        return 'Submitted';
                    case '3':
                        return 'Approved';
                    case '4':
                        return 'Disapproved';
                    default:
                        return 'Editing';
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
                            {record.userName === decodedToken?.userName && ( // Add this condition
                                <>
                                    <Button
                                        style={{ width: '80px' }}
                                        onClick={() => {
                                            navigateTo(`/Createrecord/Templates/${record.formName}`);
                                        }}
                                        disabled={record.status !== '1' && record.status !== '0'}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        style={{ width: '80px' }}
                                        onClick={() => handleDelete(record)}
                                        disabled={record.status !== '1' && record.status !== '0'}
                                    >
                                        Delete
                                    </Button>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            {record.userName === decodedToken?.userName && ( // Add this condition
                                <>
                                    <Button
                                        style={{ width: '80px' }}
                                        onClick={() => {
                                            navigateTo(`/Createrecord/Templates/${record.formName}`);
                                        }}
                                        disabled={record.status !== '1' && record.status !== '0'}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        style={{ width: '80px' }}
                                        onClick={() => handleDelete(record)}
                                        disabled={record.status !== '1' && record.status !== '0'}
                                    >
                                        Delete
                                    </Button>
                                </>
                            )}
                        </>
                    )}
                </Space>
            ),
        },
    ];

    type TestName = keyof typeof testData;

    const [labs, setLabs] = useState(testData[labData[0].key as TestName]);
    const [test, setTest] = useState(testData[labData[0].key as TestName][0]);


    const handleLabChange = (value: TestName) => {
        setLabs(testData[value]);
        form.setFieldsValue({ test: undefined });
    };

    const handleDelete = async (record: Record) => {
        const deleteData: FormDeleteAPIReq = {
            formId:record.formId,
            formName: record.formName,
            staffCode: record.staffCode,
            createTime: record.createTime,
            department: record.department
        };

        console.log('Delete record:', deleteData);

        try {
            const response: FormDeleteAPIRes = await formDeleteAPI(deleteData);
            console.log('Response:', response);
            // Display success notification
            message.success('Record deleted successfully.');
            form.submit();
        } catch (error) {
            console.log('Error:', error);
            message.error('Failed to delete the record.');
        }
    };

    const ontestChange = (value: TestName) => {
        setTest(value);
    };

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    const onFinish = async (values: any) => {
        // Extract dateFrom and dateTo from values
        const { dateFrom, dateTo, ...rest } = values;

        // Format dateFrom and dateTo as strings
        const formattedValues: FormSearchAPIReq = {
            ...rest,
            userType: decodedToken ? decodedToken.userType : '',
            staffCode: decodedToken ? decodedToken.staffCode:'',
            dateFrom: dateFrom ? dateFrom.format('YYYY-MM-DD') : undefined,
            dateTo: dateTo ? dateTo.format('YYYY-MM-DD') : undefined
        };

        console.log('Search values:', formattedValues);

        // Call the API
        try {
            const response = await formSearchAPI(formattedValues);
            console.log('Response:', response);
            setData(response.records);

            if (response.records.length === 0) {
                message.info('No records found.');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };


    return (
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
    );
};

export default Searchtest;