import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
}

const AuthProvider = (props: Props) => {
  const router = useRouter();
  useEffect(() => {
    const nickname = localStorage.getItem('nickname');
    if (!nickname) {
      void router.push('/login');
    }
  }, []);

  return <>{props.children}</>;
};

export default AuthProvider;
