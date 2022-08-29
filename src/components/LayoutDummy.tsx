import { FC } from "react";
import { Footer } from "./Footer";
import { HeaderDummy } from "./HeaderDummy";

export const LayoutDummy: FC = ({ children }) => {
  return (
    <div className="bg-gray-300">
      <HeaderDummy />
      <div className="pt-[100px]">{children}</div>
      <Footer />
    </div>
  );
};
