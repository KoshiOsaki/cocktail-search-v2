import Link from "next/link";

export const HeaderDummy = () => {
  return (
    <div className="bg-black mb-16 h-24 pl-8 pt-5 w-full fixed">
      <Link href="/cocktailread">
        <a className="text-4xl font-bold text-blue-600 cursor-pointer">カクテル検索くん</a>
      </Link>
      <Link href="/cocktailread">
        <a className="text-blue-600 underline cursor-pointer ml-3 ">TOPに戻る</a>
      </Link>
    </div>
  );
};
