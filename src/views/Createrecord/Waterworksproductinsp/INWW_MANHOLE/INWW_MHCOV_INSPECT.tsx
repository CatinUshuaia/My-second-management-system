import { PlusOutlined } from '@ant-design/icons';
import {Button,Form,Input,Radio,Select,Upload,Modal,message,} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const { TextArea } = Input;
const units = [
    { value: '-', label: '-' },
    { value: 'mm', label: 'mm' },
    { value: 'cm', label: 'cm' },
    { value: 'µm', label: 'µm' },
    { value: 'kg', label: 'kg' },
]

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
                <p>INWW_MHCOV_INSPECT template</p>
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
                <Form.Item
                    label="Visual Appearance Check">
                    <Radio.Group defaultValue="satisfied">
                        <Radio value="satisfied"> Satisfied </Radio>
                        <Radio value="defect"> Defect </Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="*Frame External Length"
                    >
                    
                    <Form.Item
                        name="*Frame External Length Value"
                        style={{ display: 'inline-block' }}
                        rules={[{ required: true, message: 'Please input the value' }]}
                    >
                        <Input  />
                    </Form.Item>
                    <Form.Item
                        name="*Frame External Length unit"
                        style={{ display: 'inline-block', width: '100px', margin: '0 8px' }}
                    >
                        <Select
                            onChange={handleChange}
                            options={units}
                            defaultValue="-"
                        />
                    </Form.Item>
                </Form.Item>

                <Form.Item label="*Frame External Width">
                    <Form.Item
                        name="*Frame External Width Value"
                        style={{ display: 'inline-block' }}
                        rules={[{ required: true, message: 'Please input the value' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="*Frame External Width Unit"
                        style={{ display: 'inline-block', width: '100px', margin: '0 8px' }}
                    >
                        <Select
                            onChange={handleChange}
                            options={units}
                            defaultValue="-"
                        />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="*Frame Internal Length">
                    <Form.Item
                        name="*Frame Internal Length Value"
                        style={{ display: 'inline-block' }}
                        rules={[{ required: true, message: 'Please input the value' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="*Frame Internal Length Unit"
                        style={{ display: 'inline-block', width: '100px', margin: '0 8px' }}
                    >
                        <Select
                            onChange={handleChange}
                            options={units}
                            defaultValue="-"
                        />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="*Frame Internal Width">
                    <Form.Item
                        name="*Frame Internal Width Value"
                        style={{ display: 'inline-block' }}
                        rules={[{ required: true, message: 'Please input the value' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="*Frame Internal Width Unit"
                        style={{ display: 'inline-block', width: '100px', margin: '0 8px' }}
                    >
                        <Select
                            onChange={handleChange}
                            options={units}
                            defaultValue="-"
                        />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="*Frame Height">
                    <Form.Item
                        name="*Frame Height Value"
                        style={{ display: 'inline-block' }}
                        rules={[{ required: true, message: 'Please input the value' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="*Frame Height Unit"
                        style={{ display: 'inline-block', width: '100px', margin: '0 8px' }}
                    >
                        <Select
                            onChange={handleChange}
                            options={units}
                            defaultValue="-"
                        />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="*Cover Length">
                    <Form.Item
                        name="*Cover Length Value"
                        style={{ display: 'inline-block' }}
                        rules={[{ required: true, message: 'Please input the value' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="*Cover Length Unit"
                        style={{ display: 'inline-block', width: '100px', margin: '0 8px' }}
                    >
                        <Select
                            onChange={handleChange}
                            options={units}
                            defaultValue="-"
                        />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="*Cover Width">
                    <Form.Item
                        name="*Cover Width Value"
                        style={{ display: 'inline-block' }}
                        rules={[{ required: true, message: 'Please input the value' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="*Cover Width Unit"
                        style={{ display: 'inline-block', width: '100px', margin: '0 8px' }}
                    >
                        <Select
                            onChange={handleChange}
                            options={units}
                            defaultValue="-"
                        />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="*Cover Height">
                    <Form.Item
                        name="*Cover Height Value"
                        style={{ display: 'inline-block' }}
                        rules={[{ required: true, message: 'Please input the value' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="*Cover Height Unit"
                        style={{ display: 'inline-block', width: '100px', margin: '0 8px' }}
                    >
                        <Select
                            onChange={handleChange}
                            options={units}
                            defaultValue="-"
                        />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="*Protective Coating Thickness">
                    <Form.Item
                        name="*Protective Coating Thickness Value"
                        style={{ display: 'inline-block' }}
                        rules={[{ required: true, message: 'Please input the value' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="*Protective Coating Thickness Unit"
                        style={{ display: 'inline-block', width: '100px', margin: '0 8px' }}
                    >
                        <Select
                            onChange={handleChange}
                            options={units}
                            defaultValue="-"
                        />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="*Loading Test">
                    <Radio.Group defaultValue="pass">
                        <Radio value="pass"> Pass </Radio>
                        <Radio value="fail"> Fail </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="*Weighing Test">
                    <Form.Item
                        name="*Weighing Test Value"
                        style={{ display: 'inline-block' }}
                        rules={[{ required: true, message: 'Please input the value' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="*Weighing Test Unit"
                        style={{ display: 'inline-block', width: '100px', margin: '0 8px' }}
                    >
                        <Select
                            onChange={handleChange}
                            options={units}
                            defaultValue="-"
                        />
                    </Form.Item>
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