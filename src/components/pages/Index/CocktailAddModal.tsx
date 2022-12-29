import { Button } from '@mui/material';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../../../firebase/init';
import { Material } from '../../../types/cocktail';

interface Props {
  setIsOpenAddModal: (isOpenAddModal: boolean) => void;
  fetchDisplayData: () => void;
}

export const CocktailAddModal = (props: Props) => {
  const { setIsOpenAddModal, fetchDisplayData } = props;
  const [name, setName] = useState<string>();
  const [way, setWay] = useState<string>('シェイク');
  const [glass, setGlass] = useState<string>('カクテル');
  const [material, setMaterial] = useState<Material[]>([]);
  const [garnish, setGarnish] = useState<string>('なし');
  const [option, setOption] = useState<string>('なし');

  const onChangeName = (str: string) => {
    setName(str);
  };
  const onChangeWay = (str: string) => {
    setWay(str);
  };
  const onChangeGlass = (str: string) => {
    setGlass(str);
  };
  const onChangeMaterial = (e: any) => {
    setMaterial(e.target.value);
  };
  const onChangeGarnish = (e: any) => {
    setGarnish(e.target.value);
  };
  const onChangeOption = (e: any) => {
    setOption(e.target.value);
  };

  const onClickUpdate = () => {
    console.log('更新');
  };

  const onClickDelete = () => {
    console.log('削除');
  };
  const onClickAdd = async () => {
    const now = new Date();
    const newCocktail = {
      name,
      way,
      glass,
      material,
      garnish,
      option,
      createdAt: now,
      updatedAt: now,
    };
    const collectionRef = collection(db, 'cocktails');
    await addDoc(collectionRef, newCocktail);
  };

  return (
    <div className="bg-white">
      <div>
        <Button
          onClick={() => {
            setIsOpenAddModal(false);
          }}
        >
          閉じる
        </Button>
      </div>
    </div>
  );
};
