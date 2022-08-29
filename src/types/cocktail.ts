import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export const cocktailFromDoc = (doc: QueryDocumentSnapshot<DocumentData>) => {
  const _cocktail: Cocktail = {
    id: doc.id,
    name: doc.data().name,
    glass: doc.data().glass,
    way: doc.data().way,
    garnish: doc.data().garnish,
    material: [],
    // materials: doc.data().materials,
    isOriginal: doc.data().is_original,
    imagePath: doc.data().image_path,
    option: doc.data().option,
    author: doc.data().author,
    note: doc.data().note,
    createdAt: new Date(doc.data()['created_at'].seconds * 1000),
    updatedAt: new Date(doc.data()['updated_at'].seconds * 1000),
  };
  const cocktail = JSON.parse(JSON.stringify(_cocktail));
  return cocktail;
};

export interface Cocktail {
  id: string;
  name: string;
  glass: string;
  way: string;
  garnish: string | null;
  material: Material[];
  isOriginal: boolean;
  imagePath: string;
  option: string | null;
  author: string;
  note: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Material {
  id: string;
  name: string;
  quantity?: string;
}

export const includeMaterialFromDoc = (doc: QueryDocumentSnapshot<DocumentData>) => {
  const _material: Material = {
    id: doc.id,
    name: doc.data().name,
    quantity: doc.data()?.quantity,
  };
  return _material;
};
