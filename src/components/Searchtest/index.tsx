import { useState } from 'react';
import { Input, Button, Table, Space, DatePickerProps, Select, DatePicker,Form } from 'antd';
import { testData } from '../../Formproperties/testdata';
import { labData } from '../../Formproperties/labdata';
import { formSearchAPI } from '../../request/api';
import { FormSearchAPIReq } from '../../types/api';
import { useNavigate } from "react-router-dom";


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

    const columns = [
        { title: 'formName', dataIndex: 'formName', key: 'formName' },
        { title: 'userName', dataIndex: 'userName', key: 'userName' },
        { title: 'createTime', dataIndex: 'createTime', key: 'createTime' },
        { title: 'department', dataIndex: 'department', key: 'department' },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (status === '1' ? 'Submitted' : 'Editable'),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: Record) => (
                <Space>
                    <Button style={{ width: '80px' }} onClick={() => { console.log(`/Createrecord/${record.department}/${record.formName}`); navigateTo(`/Createrecord/${record.department}/${record.formName}`) }} disabled={record.status === "1"}>Edit</Button>

                    <Button style={{ width: '80px' }} disabled={record.status === "1"} >Delete</Button>
                </Space>
            ),
        }
    ];

    type TestName = keyof typeof testData;

    const [labs, setLabs] = useState(testData[labData[0].key as TestName]);
    const [test, setTest] = useState(testData[labData[0].key as TestName][0]);


    const handleLabChange = (value: TestName) => {
            setLabs(testData[value]);
            form.setFieldsValue({test: testData[value][0] });
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
            dateFrom: dateFrom ? dateFrom.format('YYYY-MM-DD') : undefined,
            dateTo: dateTo ? dateTo.format('YYYY-MM-DD') : undefined
        };

        console.log('Search values:', formattedValues);

        // Call the API
        try {
            const response = await formSearchAPI(formattedValues);
            console.log('Response:', response);
            setData(response.records);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <Form onFinish={onFinish} form={form}>
            <Space direction="vertical" size="small">
                Lab:
                <Form.Item name="lab" rules={[{ required: true }]}>
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
                        value={test}
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
        </Form>
    );
};

export default Searchtest;