import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Select, Upload, Modal, message, } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Componentnuminput from '@/components/Componentnuminput/index'
import { FormSubmissionAPI, FormSaveAPI, fetchFormDataFromDB } from '../../../request/api';
import jwtDecode from 'jwt-decode';

const { TextArea } = Input;

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const View = () => {
    const navigateTo = useNavigate();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const formname = "WaterworksInspectionSurfaceBoxInspection"
    const token = localStorage.getItem('formsubmission-token');
    let decodedToken: { department: string, userName: string } | null = null;
    if (token) {
        decodedToken = jwtDecode(token);
    }

    useEffect(() => {
        const requestData = {
            formName: formname,
            userName: decodedToken?.userName
        };
        // 在组件挂载时获取数据
        fetchFormDataFromDB(requestData)
            .then((FetchFormDataRes) => {
                console.log(FetchFormDataRes.message)
                if (FetchFormDataRes.success) {
                    // 使用获取的数据设置表单字段的值
                    form.setFieldsValue(FetchFormDataRes.otherData);
                }
            })
            .catch((error) => {
                // 处理获取数据时的错误
                console.error('Failed to fetch form data:', error);
            });
    }, []);  // 空依赖数组意味着这个效果只在组件挂载时运行

    const showModal = () => {
        setOpen(true);
    };

    const handleSaveButtonClick = () => {
        setModalText('Are you sure to save this test result?');
        showModal();
    }

    const handleOk = async () => {

        let frontEndData = {
            formName: formname,
            userName: decodedToken ? decodedToken.userName : '',
            department: decodedToken ? decodedToken.department : '',
            OtherData: {}
        };

        if (modalText === 'Are you sure to submit this test result?') {
            const values = await form.validateFields();

            for (let key in values) {
                frontEndData.OtherData[key] = values[key];
            }

            setModalText('Submitting the test result now,please wait...');
            setConfirmLoading(true);

            try {
                console.log('Submitting:', values);
                let FormAPIRes = await FormSubmissionAPI(frontEndData);

                if (FormAPIRes) {
                    console.log(FormAPIRes)
                    setOpen(false);
                    setConfirmLoading(false);
                    navigateTo("/Successpage");
                }
            } catch (error) {
                console.error(error);
                setOpen(false);
                setConfirmLoading(false);
                messageApi.open({
                    type: 'error',
                    content: 'Submission failed',
                });
            }
        }

        else {

            const values = await form.getFieldsValue();

            for (let key in values) {
                frontEndData.OtherData[key] = values[key];
            }
            setModalText('Saving the test result now,please wait...');
            setConfirmLoading(true);

            try {
                console.log('Saving:', values);
                let FormAPIRes = await FormSaveAPI(frontEndData);
                if (FormAPIRes) {
                    console.log(FormAPIRes)
                    setOpen(false);
                    setConfirmLoading(false);
                    messageApi.open({
                        type: 'success',
                        content: 'Successfully saved',
                    });
                }
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

    const formatFormName = (formname: string) => {
        const regex = /([A-Z])/g;
        return formname.replace(regex, ' $1').trim();
    };

    return (

        <div>
            <div className="home" style={{ fontSize: 30, textAlign: 'left', padding: 10, lineHeight: '48px', color: 'grey' }}>
                <p>{formatFormName(formname)}</p>
            </div>
            {contextHolder}
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
                <Form.Item
                    label="Visual Appearance Check"
                    name="Visual Appearance Check"
                    rules={[{ required: true, message: 'Please choose the value' }]}
                >
                    <Radio.Group>
                        <Radio value="satisfied"> Satisfied </Radio>
                        <Radio value="defect"> Defect </Radio>
                    </Radio.Group>
                </Form.Item>
                <Componentnuminput label={"Frame External Length"} rules={[{ required: true }]} />
                <Componentnuminput label={"Frame External Width"} rules={[{ required: true }]} />
                <Componentnuminput label={"Frame Internal Length"} rules={[{ required: true }]} />
                <Componentnuminput label={"Frame Internal Width"} rules={[{ required: true }]} />
                <Componentnuminput label={"Frame Height"} rules={[{ required: true }]} />
                <Componentnuminput label={"Cover Length"} rules={[{ required: true }]} />
                <Componentnuminput label={"Cover Width"} rules={[{ required: true }]} />
                <Componentnuminput label={"Cover Height"} rules={[{ required: true }]} />
                <Componentnuminput label={"Protective Coating Thickness"} rules={[{ required: true }]} />

                <Form.Item
                    label="Loading Test"
                    name="Loading Test"
                    rules={[{ required: true, message: 'Please choose the value' }]}
                >
                    <Radio.Group>
                        <Radio value="pass"> Pass </Radio>
                        <Radio value="fail"> Fail </Radio>
                    </Radio.Group>
                </Form.Item>

                <Componentnuminput label={"Weighing Test"} rules={[{ required: true }]} />

                <Form.Item label="Other Tests" name="Other Tests">
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile} name="Upload">
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>

                <Form.Item label="Project Number">
                    <Form.Item
                        name="Project Number"
                        style={{ display: 'inline-block' }}
                    >
                        <Input />
                    </Form.Item>
                </Form.Item>

                <Form.Item className="templatebuttons">
                    <Button type="primary" htmlType="submit" style={{ marginRight: '16px' }}>
                        Submit
                    </Button>
                    <Modal
                        title="Title"
                        open={open}
                        onOk={handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                    >
                        <p>{modalText}</p>
                    </Modal>
                    <Button onClick={handleSaveButtonClick}>
                        Save
                    </Button>
                </Form.Item>


            </Form>
        </div>
    )
}

export default View