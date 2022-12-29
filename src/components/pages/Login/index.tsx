import { Button, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Layout } from '../../uiParts/Layout';

const LoginPage = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState<string>('');
  const onChaneNickname = (str: string) => {
    setNickname(str);
  };
  const onClickLogin = () => {
    localStorage.setItem('nickname', nickname);
    alert('ログインしました');
    router.push('/');
  };

  return (
    <Layout>
      <div className="text-black flex flex-col space-y-4 p-2">
        <Typography>ニックネームを入力してください</Typography>
        <TextField
          id="outlined-basic"
          label="名前"
          variant="outlined"
          value={nickname}
          onChange={(e) => {
            onChaneNickname(e.target.value);
          }}
        />
        <Button onClick={onClickLogin}>ログイン</Button>
      </div>
    </Layout>
  );
};

export default LoginPage;
