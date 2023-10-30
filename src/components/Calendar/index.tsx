import React, { useEffect, useState } from 'react';
import type { Dayjs } from 'dayjs';
import type { BadgeProps, CalendarProps } from 'antd';
import { Badge, Calendar, Modal } from 'antd';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import dayjs from 'dayjs';

interface HistoryRecord {
    createTime: string;
    status: string;
    formName: string;
}

const App: React.FC = () => {
    const [historyRecords, setHistoryRecords] = useState<HistoryRecord[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDateData, setSelectedDateData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('formsubmission-token');

        let decodedToken: { staffCode: string } | null = null;
        if (token) {
            decodedToken = jwtDecode(token);
        }

        const fetchHistoryRecords = async () => {
            try {
                const response = await axios.get(`http://192.168.2.73:5223/api/User/getHistory/${decodedToken?.staffCode}`);
                const data: HistoryRecord[] = response.data;
                if (response.status === 200) {
                    setHistoryRecords(data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchHistoryRecords();
    }, []);

    const getListData = (value: Dayjs) => {
        const formattedDate = value.format('YYYY-MM-DD');
        const filteredRecords = historyRecords.filter((record) => record.createTime.includes(formattedDate));

        return filteredRecords.map((record, index) => {
            let content;
            let color;

            switch (record.status) {
                case '0':
                    content = `Saved an ${record.formName} sample`;
                    color = 'yellow';
                    break;
                case '1':
                    content = `Submitted an ${record.formName} sample`;
                    color = 'green';
                    break;
                case '2':
                    content = `${record.formName} has been approved`;
                    color = 'green';
                    break;
                case '3':
                    content = `${record.formName} has been disapproved`;
                    color = 'red';
                    break;
                case '4':
                    content = `Deleted an ${record.formName} sample`;
                    color = 'red';
                    break;
                default:
                    content = '';
                    color = 'default';
                    break;
            }
            const formattedTime = dayjs(record.createTime).format('HH:mm:ss');

            return {
                type: 'success',
                content: `${index + 1}. ${content}`,
                time: `Time: ${formattedTime}`,
                color,
            };
        });
    };

    const handleClick = (value: Dayjs) => {
        const listData = getListData(value);
        setSelectedDateData(listData as any);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        const listData = getListData(current);
        if (info.type === 'date') return (
            <div onClick={() => handleClick(current)}>
                {listData.length > 0 && (
                    <div>
                        <div>{listData[0].content}</div>
                        <div>{listData[0].time}</div>
                    </div>

                )}
                {listData.length > 1 && <div>...</div>}
            </div>
        );
        return info.originNode;
    };
    return (
        <>
            <Calendar cellRender={cellRender} />
            <Modal title="Activities" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <ul>
                    {selectedDateData.map((item:any, index) => (
                        <li key={index}>
                            <Badge color={item.color} text={item.content} />
                            <div style={{ textAlign: 'right' }}>{item.time}</div>
                        </li>
                    ))}
                </ul>
            </Modal>
        </>
    );
};

export default App;