import React from 'react';
import { Form, Input, Select } from 'antd';
import { units } from '@/Formproperties/units'

interface ComponentnuminputProps {
    label: string;
    rules?: Array<object>;
}



//This is for inputting the num components of the analysis
const Componentnuminput: React.FC<ComponentnuminputProps> = ({ label, rules = [] }) => {
    const mergedValueRules = rules.map(rule => ({ ...rule, message: 'Please input the value' }));
    const mergedUnitRules = rules.map(rule => ({ ...rule, message: 'Please input the unit' }));
     
    return(
        <Form.Item label={`${label}`} required>
        <Form.Item
            style={{ display: 'inline-block' }}
            rules={mergedValueRules}
            name={`${label} Value`}
        >
            <Input />
        </Form.Item>

            <Form.Item
                style={{ display: 'inline-block', width: '100px', margin: '0 8px' }}
                rules={mergedUnitRules}
                name={`${label} Unit`}
                initialValue={"-"}
    >

        <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={units}
            virtual
            listHeight={280}
            />

        </Form.Item>

     </Form.Item>
);
}

export default Componentnuminput;