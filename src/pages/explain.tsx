import { Button, TextField, Typography } from '@mui/material';
import { addDoc, collection } from 'firebase/firestore';
import type { NextPage } from 'next';
import { useState } from 'react';
import { Layout } from '../components/uiParts/Layout';
import { Meta } from '../components/uiParts/Meta';
import { db } from '../firebase/init';

const Explain: NextPage = () => {
  const [request, setRequest] = useState<string>('');

  const onChangeRequest = (str: string) => {
    setRequest(str);
  };
  const onClickSend = async () => {
    const collectionRef = collection(db, `request`);
    const newRequest = {
      text: request,
      user: 'test',
      createdAt: new Date(),
    };
    await addDoc(collectionRef, newRequest);
    alert('送信しました');
    setRequest('');
  };

  return (
    <Layout>
      <Meta />
      <div className="text-black flex flex-col space-y-2 p-2">
        <Typography>最終更新:2022/12/29</Typography>
        <Typography fontSize="14px">
          マルソウのカクテルのレシピを検索できる、オリジナルカクテルを共有できる個人的に作ったサイトです。
          <br />
          欠陥だらけですがご了承ください、機能の実装やバグの修正は時間あるとき行っていきます、、、
          <br />
          どんどんカクテル追加しちゃってください！
        </Typography>
        <div>
          <Typography fontSize="14px">【使い方】</Typography>
          <ul className="text-sm">
            <li>①名前を入力して簡易ログイン</li>
            <li>②カクテルを検索</li>
            <li>③必要に応じてカクテルを追加、編集</li>
          </ul>
        </div>
        <div>
          <Typography fontSize="14px">【暇な時追加する機能】</Typography>
          <ul className="text-sm">
            <li>・画像の投稿</li>
            <li>・コメント機能</li>
            <li>・カクテルタイプでの絞り込み</li>
            <li>・サジェストを出す</li>
            <li>・材料名検索</li>
          </ul>
        </div>
        <Typography fontSize="14px">【要望、コメントはこちらから送ってください】</Typography>
        <TextField
          id="outlined-multiline-static"
          label="リクエスト"
          multiline
          rows={4}
          value={request}
          onChange={(e) => {
            onChangeRequest(e.target.value);
          }}
        />
        <Button onClick={onClickSend}>送信</Button>
      </div>
    </Layout>
  );
};

export default Explain;
