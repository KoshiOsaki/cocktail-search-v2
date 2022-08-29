import type { NextPage } from 'next';
import { Layout } from '../components/uiParts/Layout';
import { Meta } from '../components/uiParts/Meta';

const Explain: NextPage = () => {
  return (
    <Layout>
      <Meta />
      <p>最終更新:2022/02/27</p>
      <p>
        このサイトはマルソウのカクテルのレシピを検索できたらいいな〜オリジナルカクテルを共有できたらいいな〜と思い個人的に作ったサイトです。
        <br />
        欠陥だらけですがご了承ください、機能の実装やバグの修正は時間あるとき行っていきます、、、
        <br />
        どんどんカクテル追加しちゃってください！
      </p>
    </Layout>
  );
};

export default Explain;
