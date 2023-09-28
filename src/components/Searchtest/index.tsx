import { useState } from 'react';
import { Input, Button, Table, Space, DatePickerProps, Select, DatePicker, Form, message } from 'antd';
import { testData } from '../../Formproperties/testdata';
import { labData } from '../../Formproperties/labdata';
import { formDeleteAPI, formSearchAPI } from '../../request/api';
import { useNavigate } from "react-router-dom";
import { format } from 'path';
import jwtDecode from 'jwt-decode';


interface Record {
    status: string;
    formName: string;
    userName: string;
    createTime: string;
    department: string;
}


const Searchtest: React.FC = () => {
    const [data, setData] = useState<Record[]>([]);
    const [form] = Form.useForm();
    const navigateTo = useNavigate();
    const token = localStorage.getItem('formsubmission-token');
    let decodedToken: { department: string, userName: string, userType: number, staffCode: string } | null = null;
    if (token) {
        decodedToken = jwtDecode(token);
    }

    const columns = [
        {
            title: 'formName',
            dataIndex: 'formName',
            key: 'formName',
            sorter: (a: Record, b: Record) => a.formName.localeCompare(b.formName),
            render: (formName: string) => {
                return formatted(formName);
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
                    case '1':
                        return 'Submitted';
                    case '2':
                        return 'Approved';
                    case '3':
                        return 'Disapproved';
                    default:
                        return 'Editable';
                }
            },
            sorter: (a: Record, b: Record) => a.status.localeCompare(b.status),
        },
        {
            title: 'action',
            key: 'action',
            render: (text: string, record: Record) => (
                <Space>
                    <Button style={{ width: '80px' }} onClick={() => { console.log(`/Createrecord/${record.department}/${record.formName}`); navigateTo(`/Createrecord/${record.department}/${record.formName}`) }} disabled={record.status !== "0"}>Edit</Button>

                    <Button style={{ width: '80px' }} onClick={() => handleDelete(record)} disabled={record.status !== "0"} >Delete</Button>
                </Space>
            ),
        }
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
            formName: record.formName,
            userName: record.userName,
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
            department: decodedToken ? decodedToken.department:'',
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

    const formatted = (words: string) => {
        const regex = /([A-Z])/g;
        return words.replace(regex, ' $1').trim();
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
                        options={(labs).map((test: any) => ({ label: formatted(test), value: test }))}
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
        </Form>
    );
};

export default Searchtest;