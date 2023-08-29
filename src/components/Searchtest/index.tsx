import { useState } from 'react';
import { Input, Button, Table, Space, DatePickerProps, Select, DatePicker } from 'antd';

interface User {
  id: number;
  formname: string;
  provider: number;
}

const labData = [
    'Bitumen',
    'Buildingcomponent',
    'Buildingcomponentrock',
    'Buildingdiagnostic',
    'Calibration',
    'Cement',
    'Chemical',
    'Chinesemedicine',
    'Concretecore',
    'Concretecube',
    'Deepcementmaterialtestinglab',
    'Drainagepipe',
    'Environmental',
    'Fire',
    'Food',
    'Generaloffice',
    'Geotechnicinvestigation',
    'Microbiological',
    'NDTwelding',
    'Paint',
    'Piling',
    'Site',
    'SoilandaggregatephaseI',
    'SoilPh2',
    'Steel',
    'Waterworksproductinsp',
    'Zhongshan2013'
];

const testData = {
    Bitumen: [],
    Buildingcomponent: [],
    Buildingcomponentrock: [],
    Buildingdiagnostic: [],
    Calibration: [],
    Cement: [],
    Chemical: [],
    Chinesemedicine: [],
    Concretecore: [],
    Concretecube: [],
    Deepcementmaterialtestinglab: [],
    Drainagepipe: [],
    Environmental: [],
    Fire: [],
    Food: [],
    Generaloffice: [],
    Geotechnicinvestigation: [],
    Microbiological: [],
    NDTwelding: [],
    Paint: [],
    Piling: [],
    Site: [],
    SoilandaggregatephaseI: [],
    SoilPh2: [],
    Steel: [],
    Waterworksproductinsp: ['INWW_MHCOV_INSPECT' as any],
    Zhongshan2013: []
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
      setLabs(testData[labData[0] as TestName]);
      setTest(testData[labData[0] as TestName][0]);
    };

    type TestName = keyof typeof testData;

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
      { title: 'Formname', dataIndex: 'formname', key: 'formname' },
      { title: 'Provider', dataIndex: 'provider', key: 'provider' },
    ];

    //search³¡¤À
    const [labs, setLabs] = useState(testData[labData[0] as TestName]);
    const [test, setTest] = useState(testData[labData[0] as TestName][0]);

    const handleLabChange = (value: TestName) => {
        setLabs(testData[value]);
        setTest(testData[value][0]);
    };

    const ontestChange = (value: TestName) => {
        setTest(value);
    };


    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };


  return (
      <>
          <Space direction="vertical" size="large">
              Lab:<Select
                  style={{ width: 480 }}
                  onChange={handleLabChange}
                  options={labData.map((lab) => ({ label: lab, value: lab }))}
              />


              Test:<Select
                  style={{ width: 480 }}
                  value={test}
                  onChange={ontestChange}
                  options={labs.map((test: any) => ({ label: test, value: test }))}
              />


              Date From:<DatePicker style={{ width: 480 }} onChange={onChange} />
              Date To:<DatePicker style={{ width: 480 }} onChange={onChange} />

            <Button type="primary" block onClick={handleSearch} style={{ marginBottom: '16px'}}>
              Search
            </Button>
          </Space>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default Searchtest;