import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Autocomplete, Box, Checkbox, IconButton, MenuItem, Modal, Radio, Select, Slide, Tab, Tabs, TextField, Typography } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { MdAddCircleOutline } from 'react-icons/md';
import { useCocktails } from '../../../hooks/useCocktails';
import { useDebounce } from '../../../hooks/useDebounce';
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

export const IndexPage = () => {
  const { cocktailList } = useCocktails();
  const mydata: any = [];
  const [data, setData] = useState();
  const [findName, setFindName] = useState('');
  const [findMa, setFindMa] = useState('');
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  const [value, setValue] = useState(0);
  const [selectedSearchItem, setSelectedSearchItem] = useState(0);

  const [searchInput, setSearchInput] = useState('');

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

      <Box display="flex" justifyContent="between" sx={{ borderBottom: 1, borderColor: 'divider', textColor: 'white' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="inherit">
          <Tab label="既存カクテル" />
          <Tab label="オリジナルカクテル" />
        </Tabs>
        <IconButton
          color="primary"
          onClick={() => {
            setIsOpenAddModal(true);
          }}
        >
          <MdAddCircleOutline />
        </IconButton>
      </Box>
      <TabPanel value={value} index={0}>
        <DefaultCocktailTab cocktailList={cocktailList} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OriginalCocktailTab cocktailList={cocktailList} />
      </TabPanel>
      <div>
        <Slide direction="up" in={isOpenAddModal} mountOnEnter unmountOnExit>
          <div className="absolute z-10 top-0 left-0">
            <CocktailAddModal setIsOpenAddModal={setIsOpenAddModal} />
          </div>
        </Slide>
      </div>
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
