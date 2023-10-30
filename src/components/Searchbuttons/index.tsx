import { useState,useEffect } from 'react';
import { Button, Input } from 'antd';

interface ButtonPageProps {
    allButtons: React.ReactNode[];
}

const SearchButtons: React.FC<ButtonPageProps> = ({ allButtons }) => {
    const [searchText, setSearchText] = useState('');
    const [displayedButtons, setDisplayedButtons] = useState<React.ReactNode[]>([]);

    const handleSearch = () => {
        if (searchText) {
            const filteredButtons = allButtons.filter((button) =>
                (button as React.ReactElement).props.children?.toString().toLowerCase().includes(searchText.toLowerCase())
            );
            setDisplayedButtons(filteredButtons);
        } else {
            setDisplayedButtons(allButtons);
        }
    };

     const handleReset = () => {
    setDisplayedButtons(allButtons);
    setSearchText('');
  };

   useEffect(() => {
    setDisplayedButtons(allButtons);
  }, []); 

    return (
        <div>
            <div style={{ marginBottom: '16px' }}>
                <Input
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Enter search text"
                    style={{ marginRight: '8px' }}
                />
                <Button onClick={handleSearch} style={{ marginRight: '16px' }} type="primary">Search</Button>
                <Button onClick={handleReset}>Reset</Button>
            </div>
            <div>
                {displayedButtons.map((button) => button)}
            </div>
        </div>
    );
};

export default SearchButtons;