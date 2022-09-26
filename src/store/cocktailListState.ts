import { atom } from 'recoil';
import { Cocktail } from '../types/cocktail';

export const cocktailListState = atom<Cocktail[]>({
  key: 'cocktailListState',
  default: [],
});
