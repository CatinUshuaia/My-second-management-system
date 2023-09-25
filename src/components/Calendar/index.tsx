import React, { useEffect, useState } from 'react';
import type { Dayjs } from 'dayjs';
import type { BadgeProps, CalendarProps } from 'antd';
import { Badge, Calendar, Tooltip } from 'antd';
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

    useEffect(() => {
        const token = localStorage.getItem('formsubmission-token');

        let decodedToken: { userName: string } | null = null;
        if (token) {
            decodedToken = jwtDecode(token);
        }

        const fetchHistoryRecords = async () => {
            try {
                const response = await axios.get(`http://localhost:5223/api/User/getHistory/${decodedToken?.userName}`);
                const data: HistoryRecord[] = response.data;
                console.log(data);

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
                content: `${index + 1}. ${content} at ${formattedTime}`, 
                color,
            };
        });
    };

    const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value);

        return (
            <Tooltip title={<ul>{listData.map((item, index) => <li key={index}>{item.content}</li>)}</ul>}>
                <ul className="events">
                    {listData.map((item, index) => (
                        <li key={index}>
                            <Badge color={item.color} text={item.content} />
                        </li>
                    ))}
                </ul>
            </Tooltip>
        );
    };

    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        return info.originNode;
    };

    return <Calendar cellRender={cellRender} />;
};

export default App;