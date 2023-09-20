import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Row, Col, Card, Upload, message } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';
import { uploadUserImgURL } from '../../request';
import { UserSettingsAPI, UserSettingsFetch } from '../../request/api';

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const onFinish = (values: any) => {
    console.log(values);
};

const Settings: React.FC<UploadComponentProps> = ({ userName, images, setImages }) => {
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();

    useEffect(() => {
        const requestData = {
            userName: userName
        };
        // 在组件挂载时获取数据
        UserSettingsFetch(requestData)
                .then((UserSettingsFetchRes) => {
                    if (UserSettingsFetchRes) {
                        console.log(UserSettingsFetchRes)
                    // 使用获取的数据设置表单字段的值
                        form.setFieldsValue(UserSettingsFetchRes);
                }
            })
            .catch((error) => {
                // 处理获取数据时的错误
                console.error('Failed to fetch form data:', error);
            });
    }, []);  // 空依赖数组意味着这个效果只在组件挂载时运行

    const beforeUpload = (file: File) => {
        const isJpgOrPng =
            file.type === 'image/jpeg' ||
            file.type === 'image/png' ||
            file.type === 'image/gif' ||
            file.type === 'image/webp';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG/GIF/WEBP file!');
        }
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
            message.error('Image must be smaller than 10MB!');
        }
        return isJpgOrPng && isLt10M;
    };

    const handleRemove = (file: RcFile) => {
        setImages(prevState => prevState.filter(image => image.uid !== file.uid));
    };

    const handleChange = (info: any) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }

        if (info.file.status === 'done') {
            setImages([
                { uid: info.file.uid, url: info.file.response.url, status: 'done' },
            ]);
            console.log(info.file.response);
            message.success(info.file.response);
            setLoading(false);
        } else if (info.file.status === 'error') {
            setLoading(false);
            message.error(`Image upload failed: ${info.file.response.message}`);
        }
        console.log(images);
    };


    const onFinish = async () => {

        let frontEndData = {
            OtherData: {},
            imgURLs: [] as string[]
        };
            const values = await form.getFieldsValue();

            for (let key in values) {
                frontEndData.OtherData[key] = values[key];
            }

            frontEndData.imgURLs = images.map(image => image.url);  // 添加imgURLs
            console.log(frontEndData);

            try {
                let UserSettingsRes = await UserSettingsAPI(frontEndData);

                if (UserSettingsRes) {
                    console.log(UserSettingsRes)
                }
            } catch (error) {
                console.error(error);
                messageApi.open({
                    type: 'error',
                    content: 'Save failed',
                });
            }
        }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row justify="center">
            <Col xs={24} sm={24} md={24} lg={24} xl={14}>
                <Card
                    style={{
                        marginTop: '1rem',
                        padding: '3rem',
                        border: '1px solid #888',
                        boxShadow: '30px 20px 10px rgba(0,0,0,0.1)',
                        backgroundColor: '#FFFAFA',
                        borderRadius: '4px'
                    }}
                >
                    <Row justify="center">
                        <Col span={22}>
                            <Upload
                                name="file"
                                listType="picture-card"
                                action={`${uploadUserImgURL}?userName=${userName}`}
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                                onRemove={handleRemove as any}
                                maxCount={1}
                            >
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>{loading ? <LoadingOutlined /> : 'Upload'}</div>
                                </div>
                            </Upload>
                        </Col>
                    </Row>
                    <Form
                        {...layout}
                        name="nest-messages"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        validateMessages={validateMessages}
                        onTouchStart={e => e.stopPropagation()}
                        form={form}
                    >
                        <Form.Item name="name" label="Name" >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item name="userType" label="UserType" >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item name="department" label="Department"> 
                            <Input disabled/>
                        </Form.Item>
                        <Form.Item name="email" label="Email" rules={[{ type: 'email' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 11, span: 18 }}>
                            <Button type="primary" htmlType="submit" >
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};

export default Settings;