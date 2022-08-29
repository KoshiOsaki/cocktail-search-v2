import { Cocktail } from '../../../types/cocktail';
import { CocktailCard } from './CocktailCard';

interface Props {
  cocktailList: Cocktail[];
}

export const DefaultCocktailTab = (props: Props) => {
  return (
    <>
      <div className="grid grid-cols-3 sm:block">
        {props.cocktailList.map((cocktail) => (
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
    </>
  );
};
