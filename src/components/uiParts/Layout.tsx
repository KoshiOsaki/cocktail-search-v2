import Link from 'next/link';
import { FC } from 'react';
import { Meta } from './Meta';

export const Layout: FC = ({ children }) => {
  return (
    <>
      <Meta />
      <body className="bg-slate-900 overflow-hidden h-screen flex-col flex justify-between text-white">
        <header className=" mb-16 pl-8 pt-5 w-full ">
          <Link href="/">
            <a className="text-4xl font-bold text-blue-600 cursor-pointer">カクテル検索くん</a>
          </Link>
          <Link href="/">
            <a className="text-blue-600 underline cursor-pointer ml-3 ">TOPに戻る</a>
          </Link>
        </header>
        <main className="overflow-y-auto">{children}</main>
        <footer className="bg-black text-blue-600 h-20 overflow-hidden"></footer>
      </body>
    </>
  );
};
