import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Radio, Select, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Searchbuttons from '../Searchbuttons';

interface Values {
    title: string;
    modifier: string;
}

interface CollectionCreateFormProps {
    open: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
}

interface NewformProps {
    onCreateProject: (project: Project) => void
}

type Project = {
    id: string;
    name: string;
};


const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    open,
    onCreate,
    onCancel,
}) => {
    const [form] = Form.useForm();
    const { labName } = useParams();
    const [templateData, setTemplateData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchTemplate();
    }, []);

    const fetchTemplate = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5223/Test/getTemplate", { params: { labName } }
            );
            setTemplateData(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const handleSubmit = () => {
        form
            .validateFields()
            .then((values) => {
                form.resetFields();
                onCreate(values);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };


    return (
        <Modal
            open={open}
            title="Create a new collection"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={handleSubmit}
        >
            <Form form={form}>
                <Form.Item
                    name="modifier"
                    label="Modifier"
                    rules={[
                        {
                            required: true,
                            message: 'Please select the type!'
                        }
                    ]}>
                    <Radio.Group>
                        <Radio value="a">Option A</Radio>
                        <Radio value="b">Option B</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                    {
                        required: true,
                        message: 'Please select an analysis!'
                    }
                ]}
                >
                    <Select placeholder="Select a title" loading={isLoading}>
                        {templateData.map((template: any) => (
                            <Select key={template.analysisTemplate} value={template.analysisTemplate}>
                                {template.analysisDisplayName}
                            </Select>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

const Newform: React.FC<NewformProps> = ({ onCreateProject }) => {
    const [open, setOpen] = useState(false);

    const onCreate = (values: Values) => {
        console.log('Received values of form: ', values);
        setOpen(false);
        // 创建一个新的 project，并调用 onCreateProject
        const newProject: Project = {
            id: Math.random().toString(), // 这里只是一个示例，你可能需要一个更好的方式来生成 id
            name: values.title,
        };
        console.log(newProject);
        onCreateProject(newProject);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                    setOpen(true);
                }}
            >
                New Analysis
            </Button>
            <CollectionCreateForm
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </div>
    );
};

export default Newform;
