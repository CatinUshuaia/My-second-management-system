import { AudioOutlined } from '@ant-design/icons';
import React from 'react';
import { Input } from 'antd';
import Templates from "@/components/Templates"

const { Search } = Input;

const onSearch = (value: string) => console.log(value);


const View = () => {
    return (
        <div className="home">
            <div className="home" style={{ fontSize: 30, paddingLeft: 10, lineHeight: '48px', color: 'grey' }}>
                    Create Record
                <div className="search">
                    <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width:  800}} />
                </div>
            </div>
            <div>
                <Templates />
            </div>
           
            
        </div>

        
    )
}

export default View