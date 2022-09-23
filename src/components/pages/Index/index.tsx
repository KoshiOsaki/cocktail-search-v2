import { Autocomplete, Box, IconButton, Radio, Tab, Tabs, TextField, Typography } from '@mui/material';
import { collection, getDocs, query } from 'firebase/firestore';
import { ReactNode, useEffect, useState } from 'react';
import { MdAddCircleOutline, MdSearch } from 'react-icons/md';
import { db } from '../../../firebase/init';
import { Cocktail, cocktailFromDoc, includeMaterialFromDoc, Material } from '../../../types/cocktail';
import { Layout } from '../../uiParts/Layout';
import { DefaultCocktailTab } from './DefaultCocktailTab';
import { OriginalCocktailTab } from './OriginalCocktailTab';

export const IndexPage = () => {
  const mydata: any = [];
  const [data, setData] = useState();
  const [findName, setFindName] = useState('');
  const [findMa, setFindMa] = useState('');
  const [cocktailList, setCocktailList] = useState<Cocktail[]>([]);

  const fetchIncludeMaterial = async (cocktailId: string) => {
    const _materialList: Material[] = [];
    const materialCollection = collection(db, 'cocktails', cocktailId, 'materials');
    const materialQuery = query(materialCollection);
    const querySnapshot = await getDocs(materialQuery);
    querySnapshot.forEach((doc) => {
      const _material = includeMaterialFromDoc(doc);
      _materialList.push(_material);
    });
    return _materialList;
  };

  //rubyの時も
  useEffect(() => {
    (async () => {
      const _cocktailList: Cocktail[] = [];
      const cocktailCollection = collection(db, 'cocktails');
      const cocktailQuery = query(cocktailCollection);
      const querySnapshot = await getDocs(cocktailQuery);
      querySnapshot.forEach((doc) => {
        const _cocktail = cocktailFromDoc(doc);
        fetchIncludeMaterial(_cocktail.id).then((materialList) => {
          _cocktail.material.push(...materialList);
        });
        _cocktailList.push(_cocktail);
      });
      console.log(_cocktailList);
      setCocktailList(_cocktailList);
    })();
  }, []);

  const [value, setValue] = useState(0);
  const [selectedValue, setSelectedValue] = useState('a');

  const handleSearchItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Layout>
      <div className="flex ">
        <div className="flex items-center">
          <Radio checked={selectedValue === 'a'} onChange={handleSearchItem} value="a" name="radio-buttons" inputProps={{ 'aria-label': 'A' }} />
          <Typography>カクテル名</Typography>
        </div>
        <div className="flex items-center">
          <Radio checked={selectedValue === 'b'} onChange={handleSearchItem} value="b" name="radio-buttons" inputProps={{ 'aria-label': 'A' }} />
          <Typography>材料名</Typography>
        </div>
      </div>
      <div className="flex">
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={['123', '222']}
          sx={{ width: '300px' }}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
            />
          )}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <MdSearch />
        </IconButton>
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
