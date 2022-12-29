import { useEffect, useState } from 'react';
import { Cocktail } from '../../../types/cocktail';
import { CocktailCard } from './CocktailCard';

interface Props {
  cocktailList: Cocktail[];
  fetchDisplayData: () => void;
}

export const DefaultCocktailTab = (props: Props) => {
  const { cocktailList, fetchDisplayData } = props;
  const [defaultCocktailList, setDefaultCocktailList] = useState<Cocktail[]>([]);
  useEffect(() => {
    const _defaultCocktailList = cocktailList.filter((cocktail) => cocktail.isOriginal == false);
    setDefaultCocktailList(_defaultCocktailList);
  }, [cocktailList]);
  return (
    <>
      <div className="flex flex-col space-y-3">
        {defaultCocktailList.map((cocktail, index) => (
          <CocktailCard key={index} cocktail={cocktail} fetchDisplayData={fetchDisplayData} />
        ))}
      </div>
    </>
  );
};
