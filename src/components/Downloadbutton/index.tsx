import React, { useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Radio, Space, Divider } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';

const App: React.FC = () => {
    const [size, setSize] = useState<SizeType>('large'); // default is 'middle'

    return (
        <>
            <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size}>
                Download
            </Button>
        </>
    );
};

export default App;