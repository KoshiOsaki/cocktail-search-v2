import { Cocktail } from '../../../types/cocktail';
import { CocktailCard } from './CocktailCard';

interface Props {
  cocktailList: Cocktail[];
  fetchDisplayData: () => void;
}

export const DefaultCocktailTab = (props: Props) => {
  const { cocktailList, fetchDisplayData } = props;
  return (
    <>
      <div className="flex flex-col space-y-3">
        {cocktailList.map((cocktail, index) => (
          <CocktailCard key={index} cocktail={cocktail} fetchDisplayData={fetchDisplayData} />
        ))}
      </div>
    </>
  );
};
