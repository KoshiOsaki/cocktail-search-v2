import { Button, Modal } from '@mui/material';
import { useState } from 'react';

interface Props {
  id: string;
  image: string;
  name: string;
  way: string;
  glass: string;
  material?: string;
  garnish: string;
  option: string;
  note: string;
  author: string;
  able: boolean;
}

export const CocktailCard = ({ ...props }: Props) => {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState();
  const [way, setWay] = useState('シェイク');
  const [glass, setGlass] = useState('カクテル');
  const [material, setMaterial] = useState<Array<string>>([]);
  const [garnish, setGarnish] = useState('なし');
  const [option, setOption] = useState('なし');

  const onChangeName = (e: any) => {
    setName(e.target.value);
  };
  const onChangeWay = (e: any) => {
    setWay(e.target.value);
  };
  const onChangeGlass = (e: any) => {
    setGlass(e.target.value);
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

  return (
    <>
      <div className="rounded-lg shadow-xl border bg-slate-50 w-[95%] mb-7 overflow-auto h-[400px] sm:h-[200px] text-black">
        <img src={props.image} alt="" className="w-[140px] h-auto mx-auto sm:hidden" />
        <p className="font-bold text-lg text-center mb-2">{props.name}</p>
        <dl className="flex flex-wrap">
          <dt className="w-[30%]">技法</dt>
          <dd className="w-[70%]">{props.way}</dd>
          <dt className="w-[30%]">グラス</dt>
          <dd className="w-[70%]">{props.glass}</dd>
          <dt className="w-[30%]">材料</dt>
          <dd className="w-[70%]">{props.material}</dd>
          <dt className="w-[30%]">ガーニッシュ</dt>
          <dd className="w-[70%]">{props.garnish}</dd>
          <dt className="w-[30%]">その他</dt>
          <dd className="w-[70%]">{props.option}</dd>
          <dt className="w-[100%]">備考</dt>
          <dd className="w-[100%]">{props.note}</dd>
          <br />
          <br />
          <dt className="w-[30%] text-sm">作成者</dt>
          <dd className="w-[30%] text-sm">{props.author}</dd>
          <dd className="w-[40%]">
            <Button
              onClick={() => {
                setOpen(true);
              }}
            >
              編集
            </Button>
          </dd>
        </dl>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <div className="bg-white">
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">カクテル名</label>
              <input
                className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                onChange={onChangeName}
                value={name}
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">技法</label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  value={way}
                  onChange={onChangeWay}
                >
                  <option value={'シェイク'}>シェイク</option>
                  <option value={'ビルド'}>ビルド</option>
                  <option value={'ステア'}>ステア</option>
                  <option value={'?'}>?</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">グラス</label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  value={glass}
                  onChange={onChangeGlass}
                >
                  <option value={'カクテル'}>カクテル</option>
                  <option value={'10タン'}>10タン</option>
                  <option value={'コリンズ'}>コリンズ</option>
                  <option value={'ロック'}>ロック</option>
                  <option value={'シャンパン'}>シャンパン</option>
                  <option value={'ハリケーン'}>ハリケーン</option>
                  <option value={'ワイン'}>ワイン</option>
                  <option value={'銅マグ'}>銅マグ</option>
                  <option value={'?'}>?</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">材料</label>
              <input
                className="shadow appearance-none border rounded w-[500px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                onChange={onChangeMaterial}
                value={material}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">ガーニッシュ</label>
              <input
                className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                onChange={onChangeGarnish}
                value={garnish}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">オプション</label>
              <input
                className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                onChange={onChangeOption}
                value={option}
              />
            </div>
            <div>
              <button onClick={onClickUpdate} className="bg-gray-200 hover:bg-gray-400 p-1  border-gray-500 border mr-3">
                更新
              </button>
              <button onClick={onClickDelete} className="bg-red-500 hover:bg-red-600 p-1  border-gray-500 border text-white">
                削除
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
