import {
  Accordion,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { addDoc, collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useState } from 'react';
import { MdDelete, MdEdit, MdExpandMore } from 'react-icons/md';
import { db } from '../../../firebase/init';
import { Cocktail, Material } from '../../../types/cocktail';
import { MaterialAddBox, MaterialEditBox } from './MaterialEdit';

interface Props {
  cocktail: Cocktail;
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

const registerMaterialList = async (cocktail: Cocktail, tmpMaterialList: Material[]) => {
  if (!cocktail.id) return;
  for (const material of tmpMaterialList) {
    if (!material.id) {
      const _collectionRef = collection(db, 'cocktails', cocktail.id, 'materials');
      await addDoc(_collectionRef, material);
    } else {
      const _docRef = doc(db, 'cocktails', cocktail.id, 'materials', material.id);
      await setDoc(_docRef, material);
    }
  }
};

export const CocktailModal = (props: Props) => {
  const { cocktail, open, onClose, fetchDisplayData } = props;
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState<boolean>(false);
  const [tmpMaterialList, setTmpMaterialList] = useState<Material[]>(cocktail.material);
  const [tmpDeleteMaterialIdList, setTmpDeleteMaterialIdList] = useState<string[]>([]);

  const [name, setName] = useState<string>(cocktail.name);
  const [way, setWay] = useState<string>(cocktail.way);
  const [glass, setGlass] = useState<string>(cocktail.glass);
  const [material, setMaterial] = useState<Material[]>(cocktail.material);
  const [garnish, setGarnish] = useState<string>(cocktail.garnish);
  const [option, setOption] = useState<string>(cocktail.option);
  const [isOriginal, setIsOriginal] = useState<boolean>(cocktail.isOriginal);

  const onClickUpdate = async () => {
    const now = new Date();
    const author = localStorage.getItem('nickname');
    const _garnish = garnish === '' ? 'なし' : garnish;
    const _option = option === '' ? 'なし' : option;
    if (!cocktail.id) return;
    const _docRef = doc(db, 'cocktail', cocktail.id);
    const newCocktail: Cocktail = {
      name,
      way,
      glass,
      material,
      garnish: _garnish,
      option: _option,
      imagePath: cocktail.imagePath,
      isOriginal,
      author: author ?? '名無し',
    };
    await setDoc(_docRef, newCocktail);
    await deleteMaterialList(cocktail, tmpDeleteMaterialIdList);
    await registerMaterialList(cocktail, tmpMaterialList);
    await fetchDisplayData();
    reset();
    setIsEditMode(false);
  };

  const onClickDelete = async () => {
    const _docRef = doc(db, `cocktails/${cocktail.id}`);
    await deleteDoc(_docRef);
    setIsDeleteAlertOpen(false);
    fetchDisplayData();
  };

  const reset = () => {
    setName(cocktail.name);
    setWay(cocktail.way);
    setGlass(cocktail.glass);
    setMaterial(cocktail.material);
    setGarnish(cocktail.garnish);
    setOption(cocktail.option);
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setIsEditMode(false);
        reset();
        onClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box bgcolor="white">
        <div className="flex flex-col gap-y-4 p-4 w-[90vw] h-[70vh] overflow-y-scroll">
          {isEditMode ? (
            // 編集モード
            <>
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
                  <Button onClick={onClickUpdate}>更新</Button>
                  <Button
                    onClick={() => {
                      reset();
                      setIsEditMode(false);
                    }}
                  >
                    キャンセル
                  </Button>
                </div>
              </div>
            </>
          ) : (
            // 通常表示
            <>
              <Typography fontWeight="bold" textAlign="center">
                {name}
              </Typography>
              <div className="relative min-w-[150px] min-h-[150px] mx-auto">
                <Image src={cocktail.imagePath || '/noimage.png'} layout="fill" objectFit="contain" alt="logo" />
              </div>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled
                      checked={isOriginal}
                      onChange={(e) => {
                        setIsOriginal(!isOriginal);
                      }}
                    />
                  }
                  label="オリジナル"
                />
              </FormGroup>
              <div className="flex">
                <div className="flex flex-col w-1/2">
                  <Typography style={{ color: 'gray', fontSize: '10px' }}>技法</Typography>
                  <Typography>{way}</Typography>
                </div>
                <div className="flex flex-col">
                  <Typography style={{ color: 'gray', fontSize: '10px' }}>グラス</Typography>
                  <Typography>{glass}</Typography>
                </div>
              </div>
              <div className="flex flex-col">
                <Typography style={{ color: 'gray', fontSize: '10px' }}>材料</Typography>
                <div className="grid grid-cols-2 bg-orange-100">
                  {cocktail.material.map((materia, index) => (
                    <div key={index} className="flex justify-between">
                      <Typography fontSize="14px">・{materia.name}</Typography>
                      <Typography fontSize="14px" sx={{ paddingRight: '8px' }}>
                        {materia.quantity}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col w-1/2">
                  <Typography style={{ color: 'gray', fontSize: '10px' }}>ガーニッシュ</Typography>
                  <Typography>{garnish}</Typography>
                </div>
                <div className="flex flex-col">
                  <Typography style={{ color: 'gray', fontSize: '10px' }}>その他</Typography>
                  <Typography>{option}</Typography>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col w-1/2">
                  <Typography style={{ color: 'gray', fontSize: '10px' }}>最終更新日</Typography>
                  <Typography fontSize="12px"></Typography>
                </div>
                <div className="flex flex-col">
                  <Typography style={{ color: 'gray', fontSize: '10px' }}>編集者</Typography>
                  <Typography fontSize="12px">{cocktail.author}</Typography>
                </div>
              </div>
              <div className="flex justify-between">
                <div></div>
                <div className="flex">
                  <IconButton onClick={() => setIsEditMode(true)}>
                    <MdEdit />
                  </IconButton>
                  <IconButton onClick={() => setIsDeleteAlertOpen(true)}>
                    <MdDelete />
                  </IconButton>
                </div>
              </div>
              <Accordion>
                <AccordionSummary expandIcon={<MdExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography fontSize="12px">コメント</Typography>
                </AccordionSummary>
                {/* <AccordionDetails style={{ position: 'absolute', zIndex: 10 }}>
                  <div className="flex flex-col">
                    <Typography fontSize="12px">テスト</Typography>
                    <Typography fontSize="12px">テスト</Typography>
                    <Typography fontSize="12px">テスト</Typography>
                  </div>
                </AccordionDetails> */}
              </Accordion>
              <Dialog
                open={isDeleteAlertOpen}
                onClose={() => setIsDeleteAlertOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{ zIndex: 9999 }}
              >
                <DialogTitle id="alert-dialog-title">本当に削除しますか？</DialogTitle>
                <DialogActions>
                  <Button onClick={() => setIsDeleteAlertOpen(false)}>キャンセル</Button>
                  <Button onClick={onClickDelete}>削除する</Button>
                </DialogActions>
              </Dialog>
            </>
          )}
        </div>
      </Box>
    </Modal>
  );
};
