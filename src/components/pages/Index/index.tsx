import { Autocomplete, Box, IconButton, Radio, Tab, Tabs, TextField, Typography } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import { useCocktails } from '../../../hooks/useCocktails';
import { useDebounce } from '../../../hooks/useDebounce';
import { Layout } from '../../uiParts/Layout';
import { DefaultCocktailTab } from './DefaultCocktailTab';
import { OriginalCocktailTab } from './OriginalCocktailTab';

export const IndexPage = () => {
  const { cocktailList } = useCocktails();
  const mydata: any = [];
  const [data, setData] = useState();
  const [findName, setFindName] = useState('');
  const [findMa, setFindMa] = useState('');

  const [value, setValue] = useState(0);
  const [selectedSearchItem, setSelectedSearchItem] = useState(0);

  const [searchInput, setSearchInput] = useState('');

  const debouncedInputText = useDebounce(searchInput, 500);

  const handleSearchItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSearchItem(Number(e.target.value));
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (debouncedInputText) {
      console.log('絞り込み');
    } else {
      console.log('全表示');
    }
  }, [debouncedInputText]);

  return (
    <Layout>
      <div className="flex ">
        <div className="flex items-center">
          <Radio checked={selectedSearchItem == 0} onChange={handleSearchItem} value={0} name="radio-buttons" />
          <Typography>カクテル名</Typography>
        </div>
        <div className="flex items-center">
          <Radio checked={selectedSearchItem == 1} onChange={handleSearchItem} value={1} name="radio-buttons" />
          <Typography>材料名</Typography>
        </div>
      </div>
      <div className="flex">
        <Autocomplete
          inputValue={searchInput}
          onInputChange={(event: any, newValue: string) => {
            setSearchInput(newValue);
          }}
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={['123', '222']}
          sx={{ width: '300px' }}
          renderInput={(params) => <TextField {...params} label="" />}
        />
      </div>

      <Box display="flex" justifyContent="between" sx={{ borderBottom: 1, borderColor: 'divider', textColor: 'white' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="inherit">
          <Tab label="既存カクテル" />
          <Tab label="オリジナルカクテル" />
        </Tabs>
        <IconButton color="primary">
          <MdAddCircleOutline />
        </IconButton>
      </Box>
      <TabPanel value={value} index={0}>
        <DefaultCocktailTab cocktailList={cocktailList} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OriginalCocktailTab cocktailList={cocktailList} />
      </TabPanel>
    </Layout>
  );
};

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};
