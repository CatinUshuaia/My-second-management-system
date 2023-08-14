import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

const App: React.FC = () => (
    <>
        <FloatButton icon={<QuestionCircleOutlined />} type="primary" style={{ right: 24 }} />
    </>
);

export default App;