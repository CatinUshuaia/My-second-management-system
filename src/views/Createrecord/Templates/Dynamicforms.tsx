import { Button, Form, Input, Radio, Select, Modal, message, DatePicker, Upload, UploadFile, UploadProps, } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { FormSubmissionAPI, FormSaveAPI, fetchFormDataFromDB } from '../../../request/api';
import jwtDecode from 'jwt-decode';
import Componentnuminput from '../../../components/Componentnuminput';
import axios from 'axios';
import { uploadFormImgURL } from '../../../request';
import { PlusOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';


const { TextArea } = Input;

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const View = () => {
    const { formName } = useParams();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
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
                `http://localhost:5223/Test/FetchFormStructure/${formName}`);
            const formFields = result.data.map((field: any) => ({
                label: field.label,
                type: field.type,
                required: field.required,
                value: field.value,
            }));
            setFormFields(formFields);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }


    useEffect(() => {
        const requestData = {
            formName: formName,
            staffCode: decodedToken?.staffCode,
            userName: decodedToken?.userName,
            department: decodedToken?.department
        };
        console.log(formName)
        // 在组件挂载时获取数据
        fetchFormDataFromDB(requestData)
            .then((FetchFormDataRes) => {
                if (FetchFormDataRes.success) {
                    console.log(fetchFormDataFromDB(requestData));
                    // 使用获取的数据设置表单字段的值
                    form.setFieldsValue(FetchFormDataRes.otherData);
                     //如果存在图片 URL，直接设置 images 状态
                    if (FetchFormDataRes.imageUrls) {
                        const imageUrls = FetchFormDataRes.imageUrls.map((url: any, index:any) => ({
                            uid: -index - 1, // 需要保证每个 uid 唯一，且不与上传的图片冲突，因此使用负索引
                            url: url,
                            status: 'done', // 用于告诉 antd 这个图片已经上传完成
                        }));
                        console.log(imageUrls);
                        setFileList(imageUrls as any)
                    }
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
            frontEndData.imgURLs = fileList.map(image => image.url ? image.url : image.response.url);

            setModalText('Saving the test result now,please wait...');
            setConfirmLoading(true);

            try {
                console.log('Saving:', fileList);
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
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
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
        console.log(fileList)
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
                                <Componentnuminput key={index} label={field.label} rules={[{ required: field.required }]} />
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
