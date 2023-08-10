import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const FormComponent = () => {
    const onFinish = (values: any) => {
        // 发送表单数据到后端 API
        axios.post('/api/submit-form', values)
            .then(response => {
                console.log('Form submitted successfully');
            })
            .catch(error => {
                console.error('Error submitting form: ', error);
            });
    };

    return (
        <Form onFinish={onFinish}>
            <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please enter your name' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Please enter your email' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="message"
                label="Message"
                rules={[{ required: true, message: 'Please enter your message' }]}
            >
                <TextArea rows={4} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormComponent;