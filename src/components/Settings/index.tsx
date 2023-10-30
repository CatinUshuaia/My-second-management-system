import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Row, Col, Card, Upload, message, Typography } from 'antd';
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
};

const Settings: React.FC<UploadComponentProps> = ({staffCode, images, setImages }) => {
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();

    useEffect(() => {
        const requestData = {
            staffCode: staffCode
        };
        UserSettingsFetch(requestData)
                .then((UserSettingsFetchRes) => {
                    if (UserSettingsFetchRes) {
                        form.setFieldsValue(UserSettingsFetchRes);
                }
            })
            .catch((error) => {
                console.error('Failed to fetch form data:', error);
            });
    }, []); 

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
            message.success(info.file.response);
            setLoading(false);
        } else if (info.file.status === 'error') {
            setLoading(false);
            message.error(`Image upload failed: ${info.file.response.message}`);
        }
    };


    const onFinish = async () => {

        let frontEndData = {
            OtherData: {},
            imgURLs: [] as string[]
        };
        const values = await form.getFieldsValue();

        for (let key in values) {
            const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
            frontEndData.OtherData[capitalizedKey] = values[key];
        }



            frontEndData.imgURLs = images.map(image => image.url);  

            try {
                let UserSettingsRes = await UserSettingsAPI(frontEndData);

                if (UserSettingsRes) {
                    message.success('Save successful');
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
                        borderRadius: '4px',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'
                    }}
                >
                    <Row justify="center">
                        <Col span={24}>
                            <Typography.Title level={2} style={{ textAlign: 'center' }}>
                                Personal Profile
                            </Typography.Title>
                        </Col>
                        <Row justify="center" style={{ marginBottom: '20px' }}>
                            <Col span={22}>
                                <Upload
                                    name="file"
                                    listType="picture-card"
                                    action={`${uploadUserImgURL}?staffCode=${staffCode}`}
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
                            <Input style={{ width: '80%' }} disabled />
                        </Form.Item>
                        <Form.Item name="staffCode" label="StaffCode" >
                            <Input style={{ width: '80%' }} disabled />
                        </Form.Item>
                        <Form.Item name="department" label="Department"> 
                            <Input style={{ width: '80%' }} disabled/>
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