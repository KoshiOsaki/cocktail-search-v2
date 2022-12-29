import { Card, Typography } from '@mui/material';
import { useState } from 'react';
import { Cocktail } from '../../../types/cocktail';
import { CocktailModal } from './CocktailModal';

interface Props {
  cocktail: Cocktail;
  fetchDisplayData: () => void;
}

export const CocktailCard = (props: Props) => {
  const { cocktail, fetchDisplayData } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        sx={{ height: '150px', color: 'black', overflow: 'scroll' }}
        onClick={() => {
          setOpen(true);
        }}
      >
        <div className="flex flex-col gap-y-1 px-2">
          <Typography textAlign="center" fontWeight="bold">
            {cocktail.name}
          </Typography>
          <div className="flex">
            <Typography fontSize="14px" sx={{ width: '50%' }}>
              {cocktail.way}
            </Typography>
            <Typography fontSize="14px">{cocktail.glass}</Typography>
          </div>
          <div className="grid grid-cols-2 bg-orange-100">
            {cocktail.material.map((materia, index) => (
              <div key={index} className="flex justify-between">
                <Typography fontSize="14px">・{materia.name}</Typography>
                <Typography fontSize="14px" sx={{ paddingRight: '8px' }}>
                  {materia.quantity}
                </Typography>
              </div>
            ))}
          </div>
          <div className="flex">
            <Typography fontSize="14px" sx={{ width: '50%' }}>
              {cocktail.garnish === 'なし' ? '' : cocktail.garnish}
            </Typography>
            <Typography fontSize="14px">{cocktail.option === 'なし' ? '' : cocktail.option}</Typography>
          </div>
        </div>
      </Card>
      <CocktailModal open={open} onClose={() => setOpen(false)} cocktail={cocktail} fetchDisplayData={fetchDisplayData} />
    </>
  );
};
