import { CartActions } from "../reducers/cart-reducer";
import type { CartItem, Guitar, GuitarId } from "../types";

//Creating a type for the props
interface GuitarCardProps {
  guitar: Guitar;
  cart: CartItem[];
  //Get a guitar and does not return anything, then void
  dispatch: React.Dispatch<CartActions>;
  //Get and id that is a number and returns a boolean
}

const GuitarCard = ({ guitar, dispatch, cart }: GuitarCardProps) => {
  const { name, image, price, description } = guitar;
  // Function to check if button should be disabled

  function isDisabled(id: GuitarId) {
    const item = cart.find((guitar) => guitar.id === id);
    return item ? item.quantity >= 5 : false;
  }

  return (
    <article className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-4">
        <img
          className="img-fluid"
          src={`/img/${image}.jpg`}
          alt="imagen guitarra"
        />
      </div>
      <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
        <p>{description}</p>
        <p className="fw-black text-primary fs-3">${price}</p>
        <button
          onClick={() =>
            dispatch({
              type: "ADD_GUITAR",
              payload: { item: guitar },
            })
          }
          type="button"
          className="btn btn-dark w-100"
          disabled={isDisabled(guitar.id)}
        >
          {isDisabled(guitar.id)
            ? "No puedes agregar más"
            : "Agregar al Carrito"}
        </button>
      </div>
    </article>
  );
};

export default GuitarCard;
