import { Box, Tab, Tabs, Typography } from '@mui/material';
import { collection, getDocs, query } from 'firebase/firestore';
import type { NextPage } from 'next';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import { CocktailCard } from '../components/CocktailCard';
import { Layout } from '../components/Layout';
import { Meta } from '../components/Meta';
import { db } from '../firebase/init';
import { Cocktail, cocktailFromDoc, includeMaterialFromDoc, Material } from '../types/cocktail';

const Cocktail: NextPage = () => {
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

  interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
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
  }
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Layout>
      <Meta />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="既存カクテル" />
          <Tab label="オリジナルカクテル" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>

      <div className="inline-block my-3">
        <MdAddCircleOutline />

        <Link href="/explain">
          <a className="ml-10 align-bottom underline my-3">サイト説明</a>
        </Link>
      </div>

      <div className="grid grid-cols-3 sm:block">
        {cocktailList.map((cocktail) => (
          <CocktailCard
            key={cocktail.id}
            id={cocktail.id}
            image={cocktail.imagePath || '/noimage.png'}
            name={cocktail.name}
            way={cocktail.way}
            glass={cocktail.glass}
            // material={cocktail.material}
            garnish={cocktail.garnish!}
            option={cocktail.option!}
            note=""
            author="大崎"
            able={true}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Cocktail;
