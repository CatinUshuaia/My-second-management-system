import { useState } from 'react';
import { Input, Button, Table } from 'antd';

interface User {
  id: number;
  name: string;
  age: number;
}

const Searchtest: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState<User[]>([]);

  const handleSearch = () => {
    let filteredData = [];
    if (searchText) {
      filteredData = data.filter((user) => user.name.toLowerCase().includes(searchText.toLowerCase()));
    } else {
      filteredData = data;
    }
    setData(filteredData);
  };

  const resetSearch = () => {
    setSearchText('');
    setData([]);
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
  ];

  return (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Input value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Enter keyword" />
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
        <Button onClick={resetSearch}>Reset</Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default Searchtest;