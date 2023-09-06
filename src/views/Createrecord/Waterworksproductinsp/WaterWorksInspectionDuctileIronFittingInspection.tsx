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
    { value: 'Bar', label: 'Bar' },
    { value: 'min', label: 'min' },
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
                <p>Water Works Inspection - Manhole Cover Inspection template</p>
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
                    label="*Dia. of bolt circle"
                    >
                    <Form.Item
                        name="*Dia. of bolt circle Value"
                        style={{ display: 'inline-block' }}
                        rules={[{ required: true, message: 'Please input the value' }]}
                    >
                        <Input  />
                    </Form.Item>
                    <Form.Item
                        name="*Dia. of bolt circle Unit"
                        style={{ display: 'inline-block', width: '100px', margin: '0 8px' }}
                        initialValue="-"
                    >
                        <Select
                            onChange={handleChange}
                            options={units}
                        />
                    </Form.Item>
                </Form.Item>

                <Form.Item label="*External diameter">
                    <Form.Item
                        name="*External diameter Value"
                        style={{ display: 'inline-block' }}
                        rules={[{ required: true, message: 'Please input the value' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="*External diameter Unit"
                        style={{ display: 'inline-block', width: '100px', margin: '0 8px' }}
                        initialValue="-"
                    >
                        <Select
                            onChange={handleChange}
                            options={units}                            
                        />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="*Effective length">
                    <Form.Item
                        name="*Effective length Value"
                        style={{ display: 'inline-block' }}
                        rules={[{ required: true, message: 'Please input the value' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="*Effective length Unit"
                        style={{ display: 'inline-block', width: '100px', margin: '0 8px' }}
                        initialValue="-"
                    >
                        <Select
                            onChange={handleChange}
                            options={units}                         
                        />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="*Iron thickness">
                    <Form.Item
                        name="*Iron thickness Value"
                        style={{ display: 'inline-block' }}
                        rules={[{ required: true, message: 'Please input the value' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="*Iron thickness Unit"
                        style={{ display: 'inline-block', width: '100px', margin: '0 8px' }}
                        initialValue="-"
                    >
                        <Select
                            onChange={handleChange}
                            options={units}                           
                        />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="*Cement lining thickness">
                    <Form.Item
                        name="*Cement lining thickness Value"
                        style={{ display: 'inline-block' }}
                        rules={[{ required: true, message: 'Please input the value' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="*Cement lining thickness Unit"
                        style={{ display: 'inline-block', width: '100px', margin: '0 8px' }}
                        initialValue="-"
                    >
                        <Select
                            onChange={handleChange}
                            options={units}                            
                        />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="*Epoxy coating thickness">
                    <Form.Item
                        name="*Epoxy coating thickness Value"
                        style={{ display: 'inline-block' }}
                        rules={[{ required: true, message: 'Please input the value' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="*Epoxy coating thickness Unit"
                        style={{ display: 'inline-block', width: '100px', margin: '0 8px' }}
                        initialValue="-"
                    >
                        <Select
                            onChange={handleChange}
                            options={units}                         
                        />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="*Bitumen Coating thickness">
                    <Form.Item
                        name="*Bitumen Coating thickness Value"
                        style={{ display: 'inline-block' }}
                        rules={[{ required: true, message: 'Please input the value' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="*Bitumen Coating thickness Unit"
                        style={{ display: 'inline-block', width: '100px', margin: '0 8px' }}
                        initialValue="-"
                    >
                        <Select
                            onChange={handleChange}
                            options={units}                          
                        />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="*Cover Height">
                    <Form.Item
                        name="*hydrostatic pressure test bar Value" 
                        style={{ display: 'inline-block' }}
                        rules={[{ required: true, message: 'Please input the value' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="*hydrostatic pressure test bar Unit"
                        style={{ display: 'inline-block', width: '100px', margin: '0 8px' }}
                        initialValue="-"
                    >
                        <Select
                            onChange={handleChange}
                            options={units}                           
                        />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="*hydrostatic pressure test duration">
                    <Form.Item
                        name="*hydrostatic pressure test duration Value"
                        style={{ display: 'inline-block' }}
                        rules={[{ required: true, message: 'Please input the value' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="*hydrostatic pressure test duration Unit"
                        style={{ display: 'inline-block', width: '100px', margin: '0 8px' }}
                        initialValue="-"
                    >
                        <Select
                            onChange={handleChange}
                            options={units}                            
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