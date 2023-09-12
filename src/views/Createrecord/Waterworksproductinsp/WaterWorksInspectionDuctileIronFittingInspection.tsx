import { PlusOutlined } from '@ant-design/icons';
import {Button,Form,Input,Radio,Select,Upload,Modal,message,} from 'antd';
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
    const formname ="Water Works Inspection - Ductile Iron Fitting Inspection template"

    useEffect(() => {
        // 在组件挂载时获取数据
        fetchFormDataFromDB()
            .then((formData) => {
                // 使用获取的数据设置表单字段的值
                form.setFieldsValue(formData);
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

    const token = localStorage.getItem('formsubmission-token');
    let decodedToken: { department: string, userName: string} | null = null;
    if (token) {
        decodedToken = jwtDecode(token);
    }

    const handleOk = async () => {
        const values = await form.validateFields();
        

        let frontEndData = {
            formName: formname,
            userName: decodedToken?decodedToken.department:'',
            department: decodedToken?decodedToken.userName:'',
            OtherData: {}
        };

        for (let key in values) {
           frontEndData.OtherData[key] = values[key];
        }

        if (modalText === 'Are you sure to submit this test result?') {
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

    return (

        <div>
            <div className="home" style={{ fontSize: 30, textAlign: 'left', padding: 10, lineHeight: '48px', color: 'grey' }}>
                <p>{formname}</p>
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

                <Componentnuminput label={"Dia. of bolt circle"} rules={[{required: true}]} />
                <Componentnuminput label={"External diameter"} rules={[{ required: true }]} />
                <Componentnuminput label={"Effective length"} rules={[{ required: true }]} />
                <Componentnuminput label={"Iron thickness"} rules={[{ required: true }]} />
                <Componentnuminput label={"Cement lining thickness"} rules={[{ required: true }]} />
                <Componentnuminput label={"Epoxy coating thickness"} rules={[{ required: true }]} />
                <Componentnuminput label={"Bitumen Coating thickness"} rules={[{ required: true }]} />
                <Componentnuminput label={"Cover Height"} rules={[{ required: true }]} />
                <Componentnuminput label={"hydrostatic pressure test duration"} rules={[{ required: true }]} />

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
                        style={{ display: 'inline-block' }}
                        name="Project Number"
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