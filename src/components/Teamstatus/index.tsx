import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
    key: string;
    name: string;
    age: number;
    email: string;
    tags: string[];
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'MIT' || tag === 'MTR') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>View</a>
                <a>Contact</a>
            </Space>
        ),
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'Leslie',
        age: 30,
        email: 'Leslie@castco.com',
        tags: ['nice', 'leader'],
    },
    {
        key: '2',
        name: 'Hugo',
        age: 22,
        email: 'Hugo@castco.com',
        tags: ['MIT','intern'],
    },
    {
        key: '3',
        name: 'Jason',
        age: 21,
        email: 'Jason@castco.com',
        tags: ['MTR', 'intern'],
    },
];

const Teamstatus: React.FC = () => <Table columns={columns} dataSource={data} />;

export default Teamstatus;