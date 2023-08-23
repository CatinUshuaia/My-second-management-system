import React from 'react';
import { Button, Select, Space, DatePicker } from 'antd';
import { useState } from 'react';
import type { DatePickerProps } from 'antd';

const provinceData = ['Zhejiang', 'Jiangsu'];

const cityData = {
    Zhejiang: ['Hangzhou' as any, 'Ningbo' as any, 'Wenzhou' as any],
    Jiangsu: ['Nanjing' as any, 'Suzhou' as any, 'Zhenjiang' as any],
};

type CityName = keyof typeof cityData;


const Formsearch: React.FC = () => {

    const [cities, setCities] = useState(cityData[provinceData[0] as CityName]);
    const [secondCity, setSecondCity] = useState(cityData[provinceData[0] as CityName][0]);

    const handleProvinceChange = (value: CityName) => {
        setCities(cityData[value]);
        setSecondCity(cityData[value][0]);
    };

    const onSecondCityChange = (value: CityName) => {
        setSecondCity(value);
    };


    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    //serach待写
    const handleSearch = () => {
    };

    return (
        <Space direction="vertical" size="large">
            Lab:<Select
                style={{ width: 480 }}
                onChange={handleProvinceChange}
                options={provinceData.map((province) => ({ label: province, value: province }))}
            />


            Test:<Select
                style={{ width: 480 }}
                value={secondCity}
                onChange={onSecondCityChange}
                options={cities.map((city) => ({ label: city, value: city }))}
            />


            Date From:<DatePicker style={{ width: 480 }}  onChange={onChange} />
            Date To:<DatePicker style={{ width: 480 }}  onChange={onChange} />   
            
            <Button type="primary" style={{ width: 480,height:40 }}  onClick={handleSearch}>Search</Button>
         </Space>
                
    )
}


export default Formsearch;