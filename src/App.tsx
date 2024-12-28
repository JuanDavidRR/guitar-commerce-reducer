import { useReducer, useEffect } from 'react';
import GuitarCard from "./components/GuitarCard";
import Header from "./components/Header";
import { cartReducer, initialState } from "./reducers/cart-reducer";

function App() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart])
  
  return (
    <>
      <Header
        cart={state.cart}
        dispatch={dispatch}
        MAX_QUANTITY={5}
        MIN_QUANTITY={1}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <section className="row mt-5">
          {state?.guitars.map((guitar) => (
            <GuitarCard
              key={guitar.id}
              guitar={guitar}
              cart={state.cart}
              dispatch={dispatch}
            />
          ))}
        </section>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
