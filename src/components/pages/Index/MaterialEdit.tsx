import { IconButton, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { MdCheck, MdDeleteOutline } from 'react-icons/md';
import { Material } from '../../../types/cocktail';

interface Props {
  material: Material[];
  setMaterial: React.Dispatch<React.SetStateAction<Material[]>>;
}

const MaterialEdit = (props: Props) => {
  const { material, setMaterial } = props;
  const [tmpMaterialList, setTmpMaterialList] = useState<Material[]>(material);
  const [tmpDeleteMaterialIdList, setTmpDeleteMaterialIdList] = useState<string[]>([]);
  return (
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
  );
};

export default MaterialEdit;

interface MaterialEditBoxProps {
  material: Material;
  tmpMaterialList: Material[];
  setTmpMaterialList: React.Dispatch<React.SetStateAction<Material[]>>;
  tmpDeleteMaterialIdList: string[];
  setTmpDeleteMaterialIdList: React.Dispatch<React.SetStateAction<string[]>>;
  index: number;
}

const MaterialEditBox = (props: MaterialEditBoxProps) => {
  const { material, tmpMaterialList, setTmpMaterialList, tmpDeleteMaterialIdList, setTmpDeleteMaterialIdList, index } = props;
  const [tmpName, setTmpName] = useState<string>(material.name);
  const [tmpQuentity, setTmpQuantity] = useState<string>(material.quantity ?? '');

  useEffect(() => {
    const newMaterial: Material = material;
    const _tmpMaterialList = [...tmpMaterialList];
    _tmpMaterialList.splice(index, 1, newMaterial);
    setTmpMaterialList(_tmpMaterialList);
  }, [tmpName, tmpQuentity]);

  const onClickDelete = () => {
    if (material.id) {
      setTmpDeleteMaterialIdList([...tmpDeleteMaterialIdList, material.id]);
    }
    const _tmpMaterialList = [...tmpMaterialList];
    _tmpMaterialList.splice(index, 1);
    setTmpMaterialList(_tmpMaterialList);
  };
  const reset = () => {
    setTmpName(material.name);
    setTmpQuantity(material.quantity ?? '');
  };

  return (
    <div className="flex space-x-1 bg-orange-100 p-1">
      <TextField id="outlined-basic" value={tmpName} size="small" onChange={(e) => setTmpName(e.target.value)} />
      <TextField id="outlined-basic" value={tmpQuentity} size="small" onChange={(e) => setTmpQuantity(e.target.value)} />
      <IconButton onClick={onClickDelete} style={{ backgroundColor: 'gray' }}>
        <MdDeleteOutline />
      </IconButton>
    </div>
  );
};

interface MaterialAddBoxProps {
  tmpMaterialList: Material[];
  setTmpMaterialList: React.Dispatch<React.SetStateAction<Material[]>>;
}

const MaterialAddBox = (props: MaterialAddBoxProps) => {
  const { tmpMaterialList, setTmpMaterialList } = props;
  const [tmpName, setTmpName] = useState<string>('');
  const [tmpQuentity, setTmpQuantity] = useState<string>('');

  const onClickAdd = () => {
    const newMaterial: Material = {
      name: tmpName,
      quantity: tmpQuentity,
    };
    setTmpMaterialList([...tmpMaterialList, newMaterial]);
    reset();
  };

  const reset = () => {
    setTmpName('');
    setTmpQuantity('');
  };

  return (
    <>
      <div className="flex space-x-1 p-1">
        <TextField id="outlined-basic" label="材料名" value={tmpName} size="small" onChange={(e) => setTmpName(e.target.value)} />
        <TextField id="outlined-basic" label="分量" value={tmpQuentity} size="small" onChange={(e) => setTmpQuantity(e.target.value)} />
        <IconButton disabled={tmpName == '' || tmpQuentity == ''} onClick={onClickAdd} style={{ backgroundColor: 'cyan' }}>
          <MdCheck />
        </IconButton>
      </div>
    </>
  );
};
