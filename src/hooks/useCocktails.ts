import axios from 'axios';
import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/init';
import { ApiType } from '../types/apiType';
import { Cocktail, cocktailFromDoc, includeMaterialFromDoc, Material } from '../types/cocktail';

export const useCocktails = () => {
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

  const apiType = process.env.NEXT_PUBLIC_API_TYPE;

  useEffect(() => {
    if (apiType === ApiType.FIREBASE) {
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
        setCocktailList(_cocktailList);
      })();
    } else if (apiType === ApiType.LOCALHOST) {
      (async () => {
        const { data } = await axios.get('http://localhost:3000/api/v1/cocktails', {
          params: {},
        });
        console.log(data);
      })();
    }
  }, []);
  return { cocktailList };
};
