import { Box, Button, Checkbox, FormControlLabel, FormGroup, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { addDoc, collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../../../firebase/init';
import { Cocktail, Material } from '../../../types/cocktail';
import { MaterialAddBox, MaterialEditBox } from './MaterialEdit';

interface Props {
  open: boolean;
  onClose: () => void;
  fetchDisplayData: () => void;
}

const deleteMaterialList = async (cocktail: Cocktail, tmpDeleteMaterialIdList: string[]) => {
  if (!cocktail.id) return;
  if (tmpDeleteMaterialIdList.length > 0) {
    for (const materialId of tmpDeleteMaterialIdList) {
      const _docRef = doc(db, 'cocktails', cocktail.id, 'materials', materialId);
      await deleteDoc(_docRef);
    }
  }
};

const registerMaterialList = async (cocktailId: string, tmpMaterialList: Material[]) => {
  for (const material of tmpMaterialList) {
    if (!material.id) {
      const _collectionRef = collection(db, 'cocktails', cocktailId, 'materials');
      await addDoc(_collectionRef, material);
    } else {
      const _docRef = doc(db, 'cocktails', cocktailId, 'materials', material.id);
      await setDoc(_docRef, material);
    }
  }
};

export const CocktailAddModal = (props: Props) => {
  const { open, onClose, fetchDisplayData } = props;
  const [tmpMaterialList, setTmpMaterialList] = useState<Material[]>([]);
  const [tmpDeleteMaterialIdList, setTmpDeleteMaterialIdList] = useState<string[]>([]);

  const [name, setName] = useState<string>('');
  const [way, setWay] = useState<string>('シェイク');
  const [glass, setGlass] = useState<string>('カクテル');
  const [garnish, setGarnish] = useState<string>('なし');
  const [option, setOption] = useState<string>('なし');
  const [isOriginal, setIsOriginal] = useState<boolean>(false);

  const onClickAdd = async () => {
    const now = new Date();
    const author = localStorage.getItem('nickname');
    const _garnish = garnish === '' ? 'なし' : garnish;
    const _option = option === '' ? 'なし' : option;
    const newCocktail: Cocktail = {
      name,
      way,
      glass,
      garnish: _garnish,
      option: _option,
      material: [],
      isOriginal,
      imagePath: '',
      author: author ?? '名無し',
    };
    const collectionRef = collection(db, 'cocktails');
    const _addDoc = await addDoc(collectionRef, newCocktail);
    await registerMaterialList(_addDoc.id, tmpMaterialList);
    await fetchDisplayData();
    reset();
    onClose();
  };

  const reset = () => {
    setName('');
    setWay('シェイク');
    setGlass('カクテル');
    setGarnish('なし');
    setOption('なし');
    setIsOriginal(false);
    setTmpMaterialList([]);
    setTmpDeleteMaterialIdList([]);
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        reset();
        onClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box bgcolor="white">
        <div className="flex flex-col gap-y-4 p-4 w-[90vw] h-[70vh] overflow-y-scroll">
          <div className="bg-white">
            <div>
              <TextField id="outlined-basic" label="カクテル名" value={name} size="small" onChange={(e) => setName(e.target.value)} />
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isOriginal}
                      onChange={(e) => {
                        setIsOriginal(!isOriginal);
                      }}
                    />
                  }
                  label="オリジナル"
                />
              </FormGroup>
              <div>
                <Typography style={{ color: 'gray', fontSize: '10px' }}>技法</Typography>
                <Select
                  size="small"
                  onChange={(e) => {
                    setWay(e.target.value);
                  }}
                  value={way}
                >
                  <MenuItem value="シェイク">シェイク</MenuItem>
                  <MenuItem value="ビルド">ビルド</MenuItem>
                  <MenuItem value="ステア">ステア</MenuItem>
                  <MenuItem value="?">?</MenuItem>
                </Select>
              </div>
              <div>
                <Typography style={{ color: 'gray', fontSize: '10px' }}>グラス</Typography>
                <Select
                  size="small"
                  onChange={(e) => {
                    setGlass(e.target.value);
                  }}
                  value={glass}
                >
                  <MenuItem value="カクテル">カクテル</MenuItem>
                  <MenuItem value="10タン">10タン</MenuItem>
                  <MenuItem value="コリンズ">コリンズ</MenuItem>
                  <MenuItem value="ロック">ロック</MenuItem>
                  <MenuItem value="シャンパン">シャンパン</MenuItem>
                  <MenuItem value="ハリケーン">ハリケーン</MenuItem>
                  <MenuItem value="ワイン">ワイン</MenuItem>
                  <MenuItem value="銅マグ">銅マグ</MenuItem>
                  <MenuItem value="?">?</MenuItem>
                </Select>
              </div>
              <div className="flex flex-col space-y-2">
                <MaterialAddBox tmpMaterialList={tmpMaterialList} setTmpMaterialList={setTmpMaterialList} />
                {tmpMaterialList.map((material, index) => (
                  <MaterialEditBox
                    key={index}
                    material={material}
                    tmpMaterialList={tmpMaterialList}
                    setTmpMaterialList={setTmpMaterialList}
                    tmpDeleteMaterialIdList={tmpDeleteMaterialIdList}
                    setTmpDeleteMaterialIdList={setTmpDeleteMaterialIdList}
                    index={index}
                  />
                ))}
              </div>

              <TextField id="outlined-basic" label="ガーニッシュ" value={garnish} size="small" onChange={(e) => setGarnish(e.target.value)} />
              <TextField id="outlined-basic" label="オプション" value={option} size="small" onChange={(e) => setOption(e.target.value)} />

              <div className="flex justify-between">
                <div></div>
                <div className="flex">
                  <Button
                    onClick={() => {
                      reset();
                      onClose();
                    }}
                  >
                    閉じる
                  </Button>
                  <Button onClick={onClickAdd}>追加</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
