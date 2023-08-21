import React from 'react';
import { Input, Space, DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';



const Formsearch: React.FC = () => {
    const { Search } = Input;


    const onSearch = (value: string) => console.log(value);

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    return (
        <Space direction="vertical" size="large">
            Lab:<Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 800 }} />
            Test:<Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 800 }} />
            Template:<Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 800 }} />
            Date From:<DatePicker onChange={onChange} />
                Date To:<DatePicker onChange={onChange} />      
         </Space>
                
    )
}


export default Formsearch;