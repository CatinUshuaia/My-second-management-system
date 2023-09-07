import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Select, Upload, Modal, message, } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Componentnuminput from '../../../components/Componentnuminput';

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

    const showModal = () => {
        setOpen(true);
    };

    const handleSaveButtonClick = () => {
        setModalText('Are you sure to save this test result?');
        showModal();
    }


    const handleOk = () => {
        if (modalText === 'Are you sure to submit this test result?') {
            setModalText('Submitting the test result now,please wait...');
            setConfirmLoading(true);
            setTimeout(() => {
                setOpen(false);
                setConfirmLoading(false);
                navigateTo("/Successpage");
            }, 2000);
        }
        else {
            setModalText('Saving the test result now,please wait...');
            setConfirmLoading(true);
            setTimeout(() => {
                setOpen(false);
                setConfirmLoading(false);
                messageApi.open({
                    type: 'success',
                    content: 'Successfully saved',
                });
            }, 2000);
        }
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };


    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const onFinish = (values: any) => {
        console.log('Success:', values);
        setModalText('Are you sure to submit this test result?');
        showModal();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (

        <div>
            <div className="home" style={{ fontSize: 30, textAlign: 'left', padding: 10, lineHeight: '48px', color: 'grey' }}>
                <p>Water Works Inspection - Valve Inspection template</p>
            </div>
            {contextHolder}
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 28 }}
                layout="horizontal"
                style={{ maxWidth: 1200 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Componentnuminput label={"*Outside dia. of flange"} rules={[{ required: true }]} />
                <Componentnuminput label={"*Dia. of bolt circle"} rules={[{ required: true }]} />
                <Componentnuminput label={"*Flange thickness"} rules={[{ required: true }]} />
                <Componentnuminput label={"*Flange facing"} rules={[{ required: true }]} />
                <Componentnuminput label={"*No. ~bolt hole dia"} rules={[{ required: true }]} />
                <Componentnuminput label={"*Face-to-face dimension"} rules={[{ required: true }]} />
                <Componentnuminput label={"*Max. overall height"} rules={[{ required: true }]} />
                <Componentnuminput label={"*Coating thickness"} rules={[{ required: true }]} />
                <Componentnuminput label={"*Shell bar"} rules={[{ required: true }]} />
                <Componentnuminput label={"*Shell sec"} rules={[{ required: true }]} />

                <Form.Item label="*Shell pass/fail">
                    <Radio.Group defaultValue="pass">
                        <Radio value="pass"> Pass </Radio>
                        <Radio value="fail"> Fail </Radio>
                    </Radio.Group>
                </Form.Item>

                <Componentnuminput label={"*Seat MOT"} rules={[{ required: true }]} />
                <Componentnuminput label={"*Seat bar"} rules={[{ required: true }]} />
                <Componentnuminput label={"*Seat sec"} rules={[{ required: true }]} />

                <Form.Item label="*Seat pass/fail">
                    <Radio.Group defaultValue="pass">
                        <Radio value="pass"> Pass </Radio>
                        <Radio value="fail"> Fail </Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="Other Tests">
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
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