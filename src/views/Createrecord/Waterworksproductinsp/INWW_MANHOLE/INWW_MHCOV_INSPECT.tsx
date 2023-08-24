import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const View = () => {
      const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

    return (
        <div>
            <div className="home" style={{ fontSize: 30, textAlign: 'left', padding: 10, lineHeight: '48px', color: 'grey' }}>
                <p>INWW_MHCOV_INSPECT template</p>
            </div>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
            >
                <Form.Item label="Visual Appearance Check">
                    <Radio.Group>
                        <Radio value="apple"> Satisfied </Radio>
                        <Radio value="pear"> Defect </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Frame External Length">
                    <Input />
                </Form.Item>
                <Form.Item label="Frame External Width">
                    <Input />
                </Form.Item>
                <Form.Item label="Frame Internal Length">
                    <Input />
                </Form.Item>
                <Form.Item label="Frame Internal Width">
                    <Input />
                </Form.Item>
                <Form.Item label="Frame Height">
                    <Input />
                </Form.Item>
                <Form.Item label="Cover Length">
                    <Input />
                </Form.Item>
                <Form.Item label="Cover Width">
                    <Input />
                </Form.Item>
                <Form.Item label="Cover Height">
                    <Input />
                </Form.Item>
                <Form.Item label="Protective Coating Thickness">
                    <Input />
                </Form.Item>
                <Form.Item label="Loading Test">
                    <Radio.Group>
                        <Radio value="apple"> Pass </Radio>
                        <Radio value="pear"> Fail </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Weighing Test">
                    <Input />
                </Form.Item>
                <Form.Item label="Other Tests">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item label=" ">
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default View