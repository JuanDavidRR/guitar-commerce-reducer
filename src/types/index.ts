//Types
export type Guitar = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};

export type CartItem = Guitar & {
  quantity: number;
};

//We pull the id from the Guitar type to link both types
export type GuitarId = Guitar["id"];
