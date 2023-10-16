import { useState } from 'react';
import { Upload, message, Form } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';
import { uploadFormImgURL } from '../../request';

const UploadComponent: React.FC<UploadComponentProps> = ({ userName, images, setImages }) => {
    const [loading, setLoading] = useState(false);

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

    const handleChange = (info:any) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }

        if (info.file.status === 'done') {
            setImages(prevState => [
                ...prevState,
                { uid: info.file.uid, url: info.file.response.url, status: 'done' },
            ]);
            message.success(info.file.response.message);
            setLoading(false);
        } else if (info.file.status === 'error') {
            setLoading(false);
            message.error(`Image upload failed: ${info.file.response.message}`);
        }
        console.log(images);
    };



    return (
            <Upload
                name="file"
                listType="picture-card"
                action={`${uploadFormImgURL}?userName=${userName}`}
                beforeUpload={beforeUpload}
                onChange={handleChange}
                onRemove={handleRemove as any}
            >
            <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>{loading ? <LoadingOutlined /> : 'Upload'}</div>
                </div>
            </Upload>
    );
};

export default UploadComponent;