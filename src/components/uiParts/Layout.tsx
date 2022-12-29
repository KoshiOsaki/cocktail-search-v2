import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { MdMenu } from 'react-icons/md';
import { Meta } from './Meta';

export const Layout: FC = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isNameEditOpen, setIsNameEditOpen] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string | null>(null);
  const open = Boolean(anchorEl);
  useEffect(() => {
    setNickname(localStorage.getItem('nickname'));
  }, []);

  return (
    <>
      <Meta />
      <div className="bg-slate-200 overflow-hidden h-screen flex-col flex justify-between text-white">
        <header className="px-3 py-5 w-full h-[65px] bg-black">
          <div className="flex justify-between">
            <Link href="/">
              <a className="text-3xl font-bold text-fuchsia-800 cursor-pointer">カクテル検索くん</a>
            </Link>
            <IconButton
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={(e) => {
                setAnchorEl(e.currentTarget);
              }}
            >
              <MdMenu color="white" />
            </IconButton>
          </div>
          <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={() => setAnchorEl(null)}>
              <div onClick={() => setIsNameEditOpen(true)}>
                <p className="underline">{nickname ? `${nickname} でログイン中` : '未ログイン'}</p>
              </div>
            </MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>
              <Link href="/">
                <p className="underline">TOP</p>
              </Link>
            </MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>
              <Link href="/explain">
                <p className="underline">サイト説明</p>
              </Link>
            </MenuItem>
          </Menu>
        </header>
        <main className="overflow-y-auto flex-grow">{children}</main>
        <footer className="bg-black text-blue-600 h-[20px] overflow-hidden p-1">
          <Typography className="text-white" fontSize="12px" fontWeight="light">
            version 1.0.0 (2022/12/29) 最初のリリース
          </Typography>
        </footer>
      </div>
    </>
  );
};
