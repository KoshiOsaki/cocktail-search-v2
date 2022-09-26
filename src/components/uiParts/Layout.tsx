import { IconButton, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import { FC, useState } from 'react';
import { MdMenu } from 'react-icons/md';
import { Meta } from './Meta';

export const Layout: FC = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Meta />
      <div className="bg-slate-200 overflow-hidden h-screen flex-col flex justify-between text-white">
        <header className="px-3 py-5 w-full ">
          <Link href="/">
            <a className="text-4xl font-bold text-fuchsia-800 cursor-pointer">カクテル検索くん</a>
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

          <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>
              <Link href="/">
                <a className="text-blue-600 underline cursor-pointer ml-3 ">TOP</a>
              </Link>
            </MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>
              <Link href="/explain">
                <a className="ml-10 align-bottom underline my-3">サイト説明</a>
              </Link>
            </MenuItem>
          </Menu>
        </header>
        <main className="overflow-y-auto flex-grow">{children}</main>
        <footer className="bg-black text-blue-600 h-10 overflow-hidden"></footer>
      </div>
    </>
  );
};
