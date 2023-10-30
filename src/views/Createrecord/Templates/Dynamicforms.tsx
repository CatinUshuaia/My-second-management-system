import { Button, Form, Input, Radio, Select, Modal, message, DatePicker, Upload, UploadFile, UploadProps, } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { FormSubmissionAPI, FormSaveAPI, fetchFormDataFromDB } from '../../../request/api';
import jwtDecode from 'jwt-decode';
import Componentnuminput from '../../../components/Componentnuminput';
import { uploadFormImgURL } from '../../../request';
import { PlusOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';
import axios from 'axios';


const { TextArea } = Input;

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const View = () => {
    const {formName,formId} = useParams();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const navigateTo = useNavigate();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const uploadAllowed = useRef(true);
    const token = localStorage.getItem('formsubmission-token');
    let decodedToken: { department: string, userName: string, userType: number, staffCode: string } | null = null;
    const [formFields, setFormFields] = useState([]);
    if (token) {
        decodedToken = jwtDecode(token);
    }


    useEffect(() => {
        fetchFormStructure();
    }, [formName]);

    const fetchFormStructure = async () => {
        try {
            const result = await axios.get(
                `http://192.168.2.73:5223/Test/FetchFormStructure/${formName}`);
            const formFields = result.data.map((field: any) => ({
                label: field.label,
                type: field.type,
                required: field.required,
                value: field.value,
                maximum: field.maximum,
                minimum: field.minimum,
            }));
            setFormFields(formFields);

            const labelFields = result.data.map((field: any) => ({
                label: field.label + " Unit",
                unit: field.unit,
            }));

            labelFields.forEach((field: any) => {
                form.setFieldsValue({
                    [field.label]: field.unit,
                });
            });

        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }

    useEffect(() => {
        const requestData = {
            formId: formId,
            formName: formName,
            staffCode: decodedToken?.staffCode,
            userName: decodedToken?.userName,
            department: decodedToken?.department,
        };
        fetchFormDataFromDB(requestData)
            .then((FetchFormDataRes) => {
                if (FetchFormDataRes.success) {
                    form.setFieldsValue(FetchFormDataRes.otherData);
                    if (FetchFormDataRes.imageUrls) {
                        const imageUrls = FetchFormDataRes.imageUrls.map((url: any, index:any) => ({
                            uid: -index - 1,
                            url: url,
                            status: 'done',
                        }));
                        setFileList(imageUrls as any)
                    }
                }
            })
            .catch((error) => {
                console.error('Failed to fetch form data:', error);
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
            formId:formId,
            staffCode: decodedToken ? decodedToken.staffCode : '',
            formName: formName,
            userName: decodedToken ? decodedToken.userName : '',
            department: decodedToken ? decodedToken.department : '',
            OtherData: {},
            imgURLs: [] as (string|undefined)[]
        };

        if (modalText === 'Are you sure to submit this test result?') {
            const values = await form.validateFields();
            delete values.Upload;

            for (let key in values) {
                frontEndData.OtherData[key] = values[key];
            }
            frontEndData.imgURLs = fileList.map(image => image.url ? image.url : image.response.url);

            setModalText('Submitting the test result now,please wait...');
            setConfirmLoading(true);

            try {
                let FormAPIRes = await FormSubmissionAPI(frontEndData);

                if (FormAPIRes) {
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
            frontEndData.imgURLs = fileList.map(image => image.url ? image.url : image.response.url);

            setModalText('Saving the test result now,please wait...');
            setConfirmLoading(true);

            try {
                let FormAPIRes = await FormSaveAPI(frontEndData);
                if (FormAPIRes.success) {
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


    const handlePreviewCancel = () => setPreviewOpen(false);

    const getBase64 = (file: RcFile): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    {
        if (uploadAllowed.current) {
            setFileList(newFileList);
        }
    };

    const handleRemove = (file: UploadFile<any>) => {
        const updatedFileList = fileList.filter(item => item.uid !== file.uid);
        setFileList(updatedFileList);
    };

    const beforeUpload = (file: File) => {
        const isJpgOrPng =
            file.type === 'image/jpeg' ||
            file.type === 'image/png' ||
            file.type === 'image/gif' ||
            file.type === 'image/webp';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG/GIF/WEBP file!');
            uploadAllowed.current = false;
        }
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
            message.error('Image must be smaller than 10MB!');
            uploadAllowed.current = false;
        }
        return isJpgOrPng && isLt10M;
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (

        <div>
            <div className="home" style={{ fontSize: 30, textAlign: 'left', padding: 10, lineHeight: '48px', color: 'grey' }}>
                <p>{formName as any}</p>
            </div>
            {contextHolder}
            {formFields.length > 0 && (
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

                    {formFields.map((field: any, index) => {
                        if (field.type === 'selectinput') {
                            return (
                                <Form.Item
                                    key={index}
                                    label={field.label}
                                    name={field.label}
                                    rules={[{ required: field.required, message: 'Please choose the value' }]}
                                >
                                    <Radio.Group>
                                        <Radio value={field.value ? field.value[0] : ''}>{field.value ? field.value[0] : ''}</Radio>
                                        <Radio value={field.value ? field.value[1] : ''}>{field.value ? field.value[1] : ''}</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            );
                        } else if (field.type === 'numpinput') {
                            return (
                                <Componentnuminput key={index} label={field.label} rules={[{ required: field.required }]} max={field.maximum} min={field.minimum} />
                            );
                        } else if (field.type === 'otherinput') {
                            return (
                                <Form.Item key={index} label={field.label} name={field.label}>
                                    <TextArea rows={4} />
                                </Form.Item>
                            );
                        } else if (field.type === 'dateinput') {
                            return (
                                <Form.Item key={index} label={field.label} name={field.label}>
                                    <DatePicker />
                                </Form.Item>
                            );
                        } else {
                            return null;
                        }
                    })}

                    <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile} name="Upload">
                        <Upload
                            action={`${uploadFormImgURL}?staffCode=${decodedToken?.staffCode}&projectNumber=${form.getFieldValue('Project Number')}`}
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            beforeUpload={beforeUpload}
                            onRemove={handleRemove}
                        >
                            {fileList.length >= 10 ? null : uploadButton}
                        </Upload>
                        <Modal open={previewOpen} footer={null} onCancel={handlePreviewCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
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
            )}</div>
    )
}

export default View
