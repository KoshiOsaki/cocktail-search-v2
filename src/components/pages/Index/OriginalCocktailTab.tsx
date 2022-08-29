import { useEffect, useState } from 'react';
import { Cocktail } from '../../../types/cocktail';
import { CocktailCard } from './CocktailCard';

interface Props {
  cocktailList: Cocktail[];
}

export const OriginalCocktailTab = (props: Props) => {
  const [originalCocktailList, setOriginalCocktailList] = useState<Cocktail[]>([]);
  useEffect(() => {
    const _originalCocktailList = props.cocktailList.filter((cocktail) => cocktail.isOriginal == true);
    setOriginalCocktailList(_originalCocktailList);
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 sm:block">
        {originalCocktailList.map((cocktail) => (
          <CocktailCard
            key={cocktail.id}
            id={cocktail.id}
            image={cocktail.imagePath || '/noimage.png'}
            name={cocktail.name}
            way={cocktail.way}
            glass={cocktail.glass}
            // material={cocktail.material}
            garnish={cocktail.garnish!}
            option={cocktail.option!}
            note=""
            author="大崎"
            able={true}
          />
        ))}
      </div>
      <div className="h-[300px]">ああ</div>
      <div className="h-[300px]">ああ</div>
      <div className="h-[300px]">ああ</div>
      <div className="h-[300px]">ああ</div>
      <div className="h-[300px]">ああ</div>
    </>
  );
};
