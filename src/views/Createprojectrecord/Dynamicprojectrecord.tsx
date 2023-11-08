import { Button, Form, Input, Radio, Select, Modal, message, DatePicker, SelectProps, Row, Col} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import moment from 'moment';
import Sidebar from '../../components/Sidebar';

const { TextArea } = Input;

const View = () => {
    const {projectName,projectId} = useParams();
    const navigateTo = useNavigate();
    const [open, setOpen] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const token = localStorage.getItem('formsubmission-token');
    let decodedToken: { department: string, userName: string, userType: number, staffCode: string } | null = null;
    const [projectFields, setProjectFields] = useState([]);
    if (token) {
        decodedToken = jwtDecode(token);
    }

    useEffect(() => {
        fetchProjectStructure();
    }, [projectName]);

    //由于还没给示例，先暂代
    const fetchProjectStructure = async () => {
        try {
            const result = await axios.get(
                `http://localhost:5223/Test/FetchProjectStructure/CASTCO_INWW`);
            const projectFields = result.data.map((field: any) => ({
                key:field.key,
                label: field.label,
                type: field.type,
                required: field.required,
                userentry: field.userentry,
                grouptitle:field.grouptitle,
            }));
            setProjectFields(projectFields);

        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }

    useEffect(() => {
        const requestData = {
            projectId: projectId,
            projectName: projectName,
            staffCode: decodedToken?.staffCode,
            userName: decodedToken?.userName,
            department: decodedToken?.department,
        };

        axios.post("http://localhost:5223/Test/FetchSaveProjectData", requestData)
            .then(response => {
                const data = response.data.otherData;
                Object.keys(data).forEach(key => {
                    if (moment(data[key], 'YYYY-MM-DD', true).isValid()) {
                        data[key] = moment(data[key], 'YYYY-MM-DD');
                    }
                });
                form.setFieldsValue(data);

                if (response.data.status == 2) {
                    setIsDisabled(true);
                }
            })
            .catch(error => {
                console.error("Failed to fetch form data:", error);
            });
    }, []);


    const showModal = () => {
        setOpen(true);
    };

    const handleSaveButtonClick = () => {
        setModalText('Are you sure to save this test result?');
        showModal();
    }

    const handleOk = async () => {

        let frontEndData = {
            projectId: projectId,
            staffCode: decodedToken ? decodedToken.staffCode : '',
            projectName: projectName,
            userName: decodedToken ? decodedToken.userName : '',
            department: decodedToken ? decodedToken.department : '',
            OtherData: {},
        };


        if (modalText === 'Are you sure to submit this test result?') {
            const values = await form.validateFields();

            for (let key in values) {
                if (typeof values[key] === 'object' && values[key].format && values[key].isValid) {
                    frontEndData.OtherData[key] = values[key].format('YYYY-MM-DD');
                } else {
                    frontEndData.OtherData[key] = values[key];
                }
            }

            setModalText('Submitting the test result now,please wait...');
            setConfirmLoading(true);

            try {
                axios.post("http://localhost:5223/Test/SubmitProjectData", frontEndData)
                    .then(response => {
                        setOpen(false);
                        setConfirmLoading(false);
                        navigateTo(`/Createnewproject/Templates/${projectName}/${response.data.projectNumber}`);
                        window.location.reload();
                    })
            } catch (error) {
                console.error(error);
                setOpen(false);
                setConfirmLoading(false);
                messageApi.open({
                    type: 'error',
                    content: 'Save failed',
                });
            }
        }

        else {
            const values = await form.getFieldsValue();

            //使用ismoment无法正确检测，故采用检测moment的特定方法
            for (let key in values) {
                if (typeof values[key] === 'object' && values[key].format && values[key].isValid) { 
                    frontEndData.OtherData[key] = values[key].format('YYYY-MM-DD');
            } else {
                frontEndData.OtherData[key] = values[key];
            }
        }
            setModalText('Saving the test result now,please wait...');
            setConfirmLoading(true);

            try {
                axios.post("http://localhost:5223/Test/SaveProjectData", frontEndData)
                    .then(response => {
                        setOpen(false);
                        setConfirmLoading(false);
                        navigateTo(`/Createnewproject/Templates/${projectName}/${response.data.projectNumber}`);
                        window.location.reload();
                    })
            } catch (error) {
                console.error(error);
                setOpen(false);
                setConfirmLoading(false);
                messageApi.open({
                    type: 'error',
                    content: 'Save failed',
                });
            }
        }
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };


    const onFinish = (values: any) => {
        setModalText('Are you sure to submit this test result?');
        showModal();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onChange = (value: string) => {
    };

    const onSearch = (value: string) => {
    };

    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const options: SelectProps['options'] = [];

    for (let i = 10; i < 36; i++) {
        options.push({
            value: i.toString(36) + i,
            label: i.toString(36) + i,
        });
    }

    const handleChange = (value: string) => {
    };

    return (

        <div>
            <Row>
                <Col span={6}>
                    {/* Pass your list of projects to the Sidebar component */}
                    <Sidebar />
                </Col>
                <Col span={18}>
            <div className="home" >
                <p>{projectName as any}</p>
            </div>
            {contextHolder}
            {projectFields.length > 0 && (
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 28 }}
                    layout="horizontal"
                    style={{ maxWidth: 1200 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    onTouchStart={e => e.stopPropagation()}
                    form={form}
                >

                    <Form.Item label="Project Number" >
                        <Form.Item
                            style={{ display: 'inline-block' }}
                            name="Project Number"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Form.Item>

                    {projectFields.map((field: any, index) => {
                        if (field.type === 'Boolean') {
                            return (
                                <Form.Item
                                    key={index}
                                    label={field.label}
                                    name={field.key}
                                    rules={[{ required: field.required, message: 'Please choose the value' }]}
                                >
                                    <Radio.Group>
                                        <Radio value={"true"} disabled={isDisabled}>True</Radio>
                                        <Radio value={"false"} disabled={isDisabled}>False</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            );
                        } else if (field.type === 'Text') {
                            return (
                                <Form.Item
                                    key={index}
                                    label={field.label}
                                    name={field.key}
                                    rules={[{ required: field.required, message: 'Please input the value' }]}
                                >
                                    <Input disabled={isDisabled} />
                                </Form.Item>
                            );
                        } else if (field.type === 'Date') {
                            return (
                                <Form.Item key={index} label={field.label} name={field.key} rules={[{ required: field.required, message: 'Please input the value' }]} >
                                    <DatePicker disabled={isDisabled} />
                                </Form.Item>
                            );
                        } else if (field.type === 'HTML') {
                            return (
                                <Form.Item
                                    key={index}
                                    label={field.label}
                                    name={field.key}
                                    rules={[{ required: field.required, message: 'Please input the value' }]}
                                >
                                    <TextArea rows={4} disabled={isDisabled}/>
                                </Form.Item>
                            );
                        } else if (field.type === 'List') {
                            return (
                                <Form.Item key={index} label={field.label} name={field.key} rules={[{ required: field.required, message: 'Please input the value' }]} >
                                    <Select
                                        showSearch
                                        optionFilterProp="children"
                                        onChange={onChange}
                                        onSearch={onSearch}
                                        filterOption={filterOption}
                                        disabled={isDisabled}
                                        options={[
                                            {
                                                value: 'test1',
                                                label: 'test1',
                                            },
                                            {
                                                value: 'test2',
                                                label: 'test2',
                                            },
                                            {
                                                value: 'test3',
                                                label: 'test3',
                                            },
                                        ]}
                                    />
                                </Form.Item>
                            );
                        } else if (field.type === 'MultiList') {
                            return (
                                <Form.Item
                                    key={index}
                                    label={field.label}
                                    name={field.key}
                                    rules={[{ required: field.required, message: 'Please input the value' }]}
                                >
                                    <Select
                                        mode="tags"
                                        style={{ width: '100%' }}
                                        onChange={handleChange}
                                        tokenSeparators={[',']}
                                        options={options}
                                        disabled={isDisabled}
                                    />
                                </Form.Item>
                            );
                        } else {
                            return null;
                        }
                    })}

                    <Form.Item className="templatebuttons">
                        <Button type="primary" htmlType="submit" style={{ marginRight: '16px' }} disabled={isDisabled}>
                            Submit
                        </Button>
                        <Modal
                            title="Confirmation"
                            open={open}
                            onOk={handleOk}
                            confirmLoading={confirmLoading}
                            onCancel={handleCancel}
                        >
                            <p>{modalText}</p>
                        </Modal>
                        <Button onClick={handleSaveButtonClick} disabled={isDisabled}>
                            Save
                        </Button>
                    </Form.Item>

                </Form>

                    )}
                </Col>
            </Row>
        </div>
    )
}

export default View
