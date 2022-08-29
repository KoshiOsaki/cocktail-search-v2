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
          <p>ああ</p>
        </div>
      </Modal>
    </>
  );
};
