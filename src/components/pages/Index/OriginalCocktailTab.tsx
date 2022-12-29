import { useEffect, useState } from 'react';
import { Cocktail } from '../../../types/cocktail';
import { CocktailCard } from './CocktailCard';

interface Props {
  cocktailList: Cocktail[];
  fetchDisplayData: () => void;
}

export const OriginalCocktailTab = (props: Props) => {
  const { cocktailList, fetchDisplayData } = props;
  const [originalCocktailList, setOriginalCocktailList] = useState<Cocktail[]>([]);
  useEffect(() => {
    const _originalCocktailList = cocktailList.filter((cocktail) => cocktail.isOriginal == true);
    setOriginalCocktailList(_originalCocktailList);
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-3">
        {originalCocktailList.map((cocktail, index) => (
          <CocktailCard key={index} cocktail={cocktail} fetchDisplayData={fetchDisplayData} />
        ))}
      </div>
    </>
  );
};
