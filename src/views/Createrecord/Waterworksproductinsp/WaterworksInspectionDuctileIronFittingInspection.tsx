﻿import {Button,Form,Input,Radio,Select,Modal,message,} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FormSubmissionAPI, FormSaveAPI, fetchFormDataFromDB } from '../../../request/api';
import jwtDecode from 'jwt-decode';
import UploadComponent from '../../../components/Upload';
import Componentnuminput from '../../../components/Componentnuminput';


const { TextArea } = Input;
const formname = "WaterworksInspectionDuctileIronFittingInspection"

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const View = () => {
    const { formType } = useParams();
    const [images, setImages] = useState<Image[]>([]);
    const navigateTo = useNavigate();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const token = localStorage.getItem('formsubmission-token');
    let decodedToken: { department: string, userName: string, userType:number,staffCode:string} | null = null;
    if (token) {
        decodedToken = jwtDecode(token);
    }
    console.log(decodedToken);

    useEffect(() => {
        const requestData = {
            formName: formname,
            userName: decodedToken?.userName
        };
        console.log(formType)
        // 在组件挂载时获取数据
        fetchFormDataFromDB(requestData)
            .then((FetchFormDataRes) => {
                if (FetchFormDataRes.success) {
                    console.log(fetchFormDataFromDB(requestData));
                    // 使用获取的数据设置表单字段的值
                    form.setFieldsValue(FetchFormDataRes.otherData);
                    // 如果存在图片 URL，直接设置 images 状态
                    //if (FetchFormDataRes.imageUrls) {
                    //    const imageUrls = FetchFormDataRes.imageUrls.map((url: any, index:any) => ({
                    //        uid: -index - 1, // 需要保证每个 uid 唯一，且不与上传的图片冲突，因此使用负索引
                    //        url: url,
                    //        status: 'done', // 用于告诉 antd 这个图片已经上传完成
                    //    }));
                    //    console.log(imageUrls);
                    //    setImages(imageUrls as any);
                    //}
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
            staffCode: decodedToken ? decodedToken.staffCode : '',
            formName: formname,
            userName: decodedToken ? decodedToken.userName : '',
            department: decodedToken ? decodedToken.department : '',
            OtherData: {},
            imgURLs: [] as string[]
        };

        if (modalText === 'Are you sure to submit this test result?') {
            const values = await form.validateFields();
            delete values.Upload;

            for (let key in values) {
                frontEndData.OtherData[key] = values[key];
            }

            frontEndData.imgURLs = images.map(image => image.url);  // 添加imgURLs

            setModalText('Submitting the test result now,please wait...');
            setConfirmLoading(true);

            try {
                console.log('Submitting:', frontEndData);
                let FormAPIRes = await FormSubmissionAPI(frontEndData);

                if (FormAPIRes) {
                    console.log(FormAPIRes.success)
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
            delete values.Upload;

            for (let key in values) {
                frontEndData.OtherData[key] = values[key];
            }
            frontEndData.imgURLs = images.map(image => image.url);  // 添加imgURLs

            setModalText('Saving the test result now,please wait...');
            setConfirmLoading(true);

            try {
                console.log('Saving:', values);
                let FormAPIRes = await FormSaveAPI(frontEndData);
                if (FormAPIRes.success) {
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

    const formatFormName = (formname:string) => {
        const regex = /([A-Z])/g;
        return formname.replace(regex, ' $1').trim();
    };

    const formFields = [
        { label: "Dia. of bolt circle", type: "numpinput", required: true },
        { label: "External diameter", type: "numpinput", required: true },
        { label: "Effective length", type: "numpinput", required: true },
        { label: "Iron thickness", type: "numpinput", required: true },
        { label: "Cement lining thickness", type: "numpinput", required: true },
        { label: "Epoxy coating thickness", type: "numpinput", required: true },
        { label: "Bitumen Coating thickness", type: "numpinput", required: true },
        { label: "Cover Height", type: "numpinput", required: true },
        { label: "hydrostatic pressure test duration", type: "selectinput", value: ["satisfied","defect"],required: true },
    ];


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

                <Form.Item label="Project Number" >
                    <Form.Item
                        style={{ display: 'inline-block' }}
                        name="Project Number"
                    >
                        <Input disabled/>
                    </Form.Item>
                </Form.Item>

                {formFields.map(field => {
                    if (field.type === 'selectinput') {
                        return (
                            <Form.Item
                                label={field.label}
                                name={field.label}
                                rules={[{ required: field.required, message: 'Please choose the value' }]}
                            >
                                <Radio.Group>
                                    <Radio value={field.value ? field.value[0] : ""}> {field.value ? field.value[0] : ""} </Radio>
                                    <Radio value={field.value ? field.value[1] : ""}> {field.value ? field.value[1] : ""} </Radio>
                                </Radio.Group>
                            </Form.Item>
                        );
                    }

                    else if (field.type === 'numpinput') {
                        return (
                            <Componentnuminput label={field.label} rules={[{ required: field.required }]} />
                        );
                    }
                })}

                <Form.Item label="Other Tests" name="Other Tests">
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}  name="Upload">
                    <UploadComponent userName={decodedToken ? decodedToken.userName : ''} images={images} setImages={setImages} />
                </Form.Item>

                <Form.Item className="templatebuttons">
                    <Button type="primary" htmlType="submit" style={{ marginRight: '16px' }}>
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
                    <Button onClick={handleSaveButtonClick}>
                        Save
                    </Button>
                </Form.Item>
                
            </Form>
        </div>
    )
}

export default View
