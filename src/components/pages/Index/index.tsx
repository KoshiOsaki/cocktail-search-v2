import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Autocomplete, Box, Checkbox, IconButton, MenuItem, Modal, Radio, Select, Slide, Tab, Tabs, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { ReactNode, useEffect, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { MdAddCircleOutline } from 'react-icons/md';
import { db } from '../../../firebase/init';
import { useDebounce } from '../../../hooks/useDebounce';
import { ApiType } from '../../../types/apiType';
import { Cocktail, cocktailFromDoc, includeMaterialFromDoc, Material } from '../../../types/cocktail';
import { Layout } from '../../uiParts/Layout';
import { CocktailAddModal } from './CocktailAddModal';
import { DefaultCocktailTab } from './DefaultCocktailTab';
import { OriginalCocktailTab } from './OriginalCocktailTab';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const fetchIncludeMaterial = async (cocktailId: string) => {
  const _materialList: Material[] = [];
  const materialCollection = collection(db, 'cocktails', cocktailId, 'materials');
  const materialQuery = query(materialCollection, orderBy('quantity', 'desc'));
  const querySnapshot = await getDocs(materialQuery);
  querySnapshot.forEach((doc) => {
    const _material = includeMaterialFromDoc(doc);
    _materialList.push(_material);
  });
  return _materialList;
};

const fetchCocktailList = async () => {
  const _cocktailList: Cocktail[] = [];
  const cocktailCollection = collection(db, 'cocktails');
  const cocktailQuery = query(cocktailCollection);
  const querySnapshot = await getDocs(cocktailQuery);
  for (const doc of querySnapshot.docs) {
    const _cocktail = cocktailFromDoc(doc);
    const materialList = await fetchIncludeMaterial(_cocktail.id);
    _cocktail.material = materialList;
    _cocktailList.push(_cocktail);
  }
  return _cocktailList;
};

export const IndexPage = () => {
  const [cocktailList, setCocktailList] = useState<Cocktail[]>([]);
  const [filteredCocktailList, setFilteredCocktailList] = useState<Cocktail[]>([]);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  const [value, setValue] = useState(0);
  const [selectedSearchItem, setSelectedSearchItem] = useState(0);

  const [searchInput, setSearchInput] = useState('');
  const [cocktailNameList, setCocktailNameList] = useState<string[]>([]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [sortWay, setSortWay] = useState('');
  const [sortLength, setSortLength] = useState(0);
  const [sortModalOpen, setSortModalOpen] = useState(false);

  const debouncedInputText = useDebounce(searchInput, 500);

  const handleSearchItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSearchItem(Number(e.target.value));
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSortWay = (e: any) => {
    setSortWay(e.target.value);
  };

  const apiType = process.env.NEXT_PUBLIC_API_TYPE;

  const fetchDisplayData = async () => {
    if (apiType === ApiType.FIREBASE) {
      const _cocktailList = await fetchCocktailList();
      setCocktailList(_cocktailList);
      setFilteredCocktailList(_cocktailList);
      setCocktailNameList(_cocktailList.map((cocktail) => cocktail.name));
    } else if (apiType === ApiType.LOCALHOST) {
      const { data } = await axios.get('http://localhost:3000/api/v1/cocktails', {
        params: {},
      });
      console.log(data);
    }
  };

  useEffect(() => void fetchDisplayData(), []);

  useEffect(() => {
    if (debouncedInputText) {
      const _cocktailList = cocktailList.filter((cocktail) => {
        return cocktail.name.includes(debouncedInputText);
      });
      setFilteredCocktailList(_cocktailList);
    } else {
      setFilteredCocktailList(cocktailList);
    }
  }, [debouncedInputText]);

  return (
    <Layout>
      <div className="flex text-black">
        <div className="flex items-center">
          <Radio checked={selectedSearchItem == 0} onChange={handleSearchItem} value={0} name="radio-buttons" />
          <Typography>カクテル名</Typography>
        </div>
        <div className="flex items-center">
          <Radio checked={selectedSearchItem == 1} onChange={handleSearchItem} value={1} name="radio-buttons" />
          <Typography>材料名</Typography>
        </div>
      </div>
      <div className="flex justify-between px-2">
        <Autocomplete
          size="small"
          inputValue={searchInput}
          onInputChange={(event: any, newValue: string) => {
            setSearchInput(newValue);
          }}
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={cocktailNameList}
          sx={{ width: '300px' }}
          renderInput={(params) => <TextField {...params} label="" />}
        />
        <IconButton
          type="button"
          sx={{ p: '10px' }}
          aria-label="sort"
          onClick={() => {
            setSortModalOpen(true);
          }}
        >
          <FiFilter />
        </IconButton>
      </div>
      <Modal
        open={sortModalOpen}
        onClose={() => {
          setSortModalOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={sortWay} label="技法" onChange={handleSortWay}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <div className="flex ">
            <div className="flex items-center">
              <Checkbox icon={<RadioButtonUncheckedIcon />} checkedIcon={<RadioButtonCheckedIcon />} />
              <Typography>ロング</Typography>
            </div>
            <div className="flex items-center">
              <Checkbox icon={<RadioButtonUncheckedIcon />} checkedIcon={<RadioButtonCheckedIcon />} />
              <Typography>材料名</Typography>
            </div>
          </div>
        </Box>
      </Modal>

      <Box display="flex" justifyContent="between" sx={{ borderBottom: 1, borderColor: 'divider', textColor: 'black' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="primary">
          <Tab label="既存カクテル" sx={{ width: '50vw' }} />
          <Tab label="オリジナルカクテル" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <DefaultCocktailTab cocktailList={filteredCocktailList} fetchDisplayData={fetchDisplayData} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OriginalCocktailTab cocktailList={cocktailList} fetchDisplayData={fetchDisplayData} />
      </TabPanel>
      <div>
        <Slide direction="up" in={isOpenAddModal} mountOnEnter unmountOnExit>
          <div className="absolute z-10 top-0 left-0">
            <CocktailAddModal setIsOpenAddModal={setIsOpenAddModal} fetchDisplayData={fetchDisplayData} />
          </div>
        </Slide>
      </div>
      <IconButton
        sx={{ position: 'fixed', bottom: '30px', right: '30px' }}
        color="primary"
        onClick={() => {
          setIsOpenAddModal(true);
        }}
      >
        <MdAddCircleOutline />
      </IconButton>
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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};
