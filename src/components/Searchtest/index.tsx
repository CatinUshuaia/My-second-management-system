import { useState } from 'react';
import { Input, Button, Table, Space, DatePickerProps, Select, DatePicker } from 'antd';

interface User {
  id: number;
  formname: string;
  provider: number;
}


const provinceData = ['Zhejiang', 'Jiangsu'];

const cityData = {
    Zhejiang: ['Hangzhou' as any, 'Ningbo' as any, 'Wenzhou' as any],
    Jiangsu: ['Nanjing' as any, 'Suzhou' as any, 'Zhenjiang' as any],
};


const Searchtest: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState<User[]>([]);

  const handleSearch = () => {
    let filteredData = [];
    if (searchText) {
      filteredData = data.filter((user) => user.formname.toLowerCase().includes(searchText.toLowerCase()));
    } else {
      filteredData = data;
    }
    setData(filteredData);
  };

  const resetSearch = () => {
    setSearchText('');
    setData([]);
    };

    type CityName = keyof typeof cityData;

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
      { title: 'Formname', dataIndex: 'formname', key: 'formname' },
      { title: 'Provider', dataIndex: 'provider', key: 'provider' },
    ];

    //search³¡¤À
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


  return (
      <>
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


              Date From:<DatePicker style={{ width: 480 }} onChange={onChange} />
              Date To:<DatePicker style={{ width: 480 }} onChange={onChange} />

          </Space>
      <div style={{ marginBottom: '16px' ,marginTop:'16px'}}>
        <Button type="primary" onClick={handleSearch} style={{ marginRight: '16px' }} >
          Search
        </Button>
        <Button onClick={resetSearch}>Reset</Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default Searchtest;