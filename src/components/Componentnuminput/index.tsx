import React, { useState } from 'react';
import { Form, Input, Select } from 'antd';
import { units } from '@/Formproperties/units'

interface ComponentnuminputProps {
    label: string;
    rules?: Array<object>;
    max: string | null;
    min: string | null;
}

const Componentnuminput: React.FC<ComponentnuminputProps> = ({ label, rules = [], max, min }) => {

    const [inputValue, setInputValue] = useState('');
    const [inputError, setInputError] = useState('');
    const mergedValueRules = rules.map(rule => ({ ...rule, message: 'Please input the value' }));
    const mergedUnitRules = rules.map(rule => ({ ...rule, message: 'Please input the unit' }));

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        const minValue = min !== null ? parseInt(min, 10) : null;
        const maxValue = max !== null ? parseInt(max, 10) : null;

        if (!isNaN(value)) {
            if (maxValue !== null && value > maxValue) {
                setInputError(`Value cannot be greater than ${maxValue}`);
            } else if (minValue !== null && value < minValue) {
                setInputError(`Value cannot be less than ${minValue}`);
            } else {
                setInputError('');
            }
        } else {
            setInputError('');
        }

        setInputValue(e.target.value);
    };


     
    return(
        <Form.Item label={`${label}`} required validateStatus={inputError ? 'error' : undefined} help={inputError}>
        <Form.Item
            style={{ display: 'inline-block',width: '250px', margin: '0 0px' }}
            rules={mergedValueRules}
            name={`${label} Value`}
        >
                <Input value={inputValue}  onChange={handleInputChange}/>
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
            disabled
            listHeight={280}

            />

        </Form.Item>

     </Form.Item>
);
}

export default Componentnuminput;