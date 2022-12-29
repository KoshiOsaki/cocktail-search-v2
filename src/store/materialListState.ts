import { atom } from 'recoil';
import { Material } from '../types/cocktail';

export const materialListState = atom<Material[]>({
  key: 'materialListState',
  default: [],
});
