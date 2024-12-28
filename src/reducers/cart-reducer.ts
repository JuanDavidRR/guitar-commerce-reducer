import { db } from "../data/guitars";
import { CartItem, Guitar } from "../types";

export type CartActions =
  | {
      type: "ADD_GUITAR";
      payload: { item: Guitar };
    }
  | {
      type: "REMOVE_GUITAR";
      payload: Guitar["id"];
    }
  | {
      type: "INCREASE_QUANIITY";
      payload: Guitar["id"];
    }
  | {
      type: "DECREASE_QUANITITY";
      payload: Guitar["id"];
    }
  | {
      type: "CLEAN_CART";
    };

export type CartState = {
  guitars: Guitar[];
  cart: CartItem[];
};

const localStorageCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

export const initialState: CartState = {
  guitars: db,
  cart: localStorageCart(),
};

//Limit the quantity of how many items you can have per guitar
const MAX_QUANTITY = 5;
const MIN_QUANTITY = 1;

export const cartReducer = (
  state: CartState = initialState,
  action: CartActions
) => {
  //Action to add a guitar to the cart
  if (action.type === "ADD_GUITAR") {
    // Check if the item is already in the cart
    // Finding the guitar on my cart whose id is the same as the id of the guitar that I'm sending on my action payload
    const itemExists = state.cart.find(
      (guitar) => guitar.id === action.payload.item.id
    );
    //Set a variable with an empty array to store the updated carts
    let updatedCart: CartItem[] = [];
    //If the guitar is already on the cart
    if (itemExists) {
      updatedCart = state.cart.map((item) => {
        //If the id of the guitar is the same as the id of the guitar on the payload
        if (item.id === action.payload.item.id) {
          //and if the quantity is less than the max quantity (5)
          if (item.quantity < MAX_QUANTITY) {
            //Return the guitar but increasing the quantity by 1
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        } else {
          return item;
        }
      });
    } else {
      const newItem: CartItem = { ...action.payload.item, quantity: 1 };
      updatedCart = [...state.cart, newItem];
    }

    return {
      ...state,
      cart: updatedCart,
    };
  }
  if (action.type === "REMOVE_GUITAR") {
    return {
      ...state,
      cart: state.cart.filter((guitar) => guitar.id !== action.payload),
    };
  }
  if (action.type === "INCREASE_QUANIITY") {
    const updatedCart = state.cart.map((guitar) => {
      if (guitar.id === action.payload && guitar.quantity < MAX_QUANTITY) {
        return {
          ...guitar,
          quantity: guitar.quantity + 1,
        };
      }
      return guitar;
    });
    return {
      ...state,
      cart: updatedCart,
    };
  }
  if (action.type === "DECREASE_QUANITITY") {
    const updatedCart = state.cart.map((guitar) => {
      if (guitar.id === action.payload && guitar.quantity > MIN_QUANTITY) {
        return {
          ...guitar,
          quantity: guitar.quantity - 1,
        };
      }
      return guitar;
    });
    return {
      ...state,
      cart: updatedCart,
    };
  }
  if (action.type === "CLEAN_CART") {
    return {
      ...state,
      cart: [],
    };
  }
  return state;
};
