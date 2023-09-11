import { useState, useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { destroy } from "../../utilities/cart-service";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const checkout = async () => {
    await destroy(user?.sub);
    setCart({});
  };

  async function getCart() {
    if (user?.sub) {
      try {
        console.log("usr ", user);
        let cartResponse = await fetch(
          `http://localhost:4000/cart?user=${user?.sub}`
        );
        cartResponse = await cartResponse.json();
        console.log("cart response converted");
        if (cartResponse) {
          console.log("cart checking", cartResponse);
          setCart(cartResponse);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCart({}); // Set an empty cart object if there's an error
      }
    }
  }
  useEffect(() => {
    getCart();
  }, [user]);

  if (!isAuthenticated) {
    return (
      <div>
        <p>You need to be logged in to view your cart.</p>
        <button onClick={() => loginWithRedirect()}>Log In</button>
      </div>
    );
  }
  if (cart === null) {
    // Cart data is loading, you can display a loading indicator here
    return <p>Loading...</p>;
  }

  const handleIncrement = async (productId) => {
    console.log("checking productID->", productId);
    console.log("checkingkr userID->", user.sub);
    if (user?.sub) {
      try {
        const response = await fetch(
          `http://localhost:4000/cart/updateQuantity`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: user.sub,
              action: "increment",
              productId,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        getCart(); // Refresh the cart data after the update
      } catch (error) {
        console.error("Error incrementing quantity:", error);
      }
    }
  };

  const handleDecrement = async (productId) => {
    if (user?.sub) {
      try {
        await fetch(`http://localhost:4000/cart/updateQuantity`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.sub,
            action: "decrement", // Specify the action as "decrement"
            productId,
          }),
        });
        getCart(); // Refresh the cart data after the update
      } catch (error) {
        console.error("Error decrementing quantity:", error);
      }
    }
  };

  if (Object.keys(cart).length) {
    return (
      <div>
        <h1>All orders for {user.name}</h1>
        {cart?.products?.map((item) => (
          <div key={item._id}>
            <img src={item.images[0]} alt={item.name} />
            <h2>
              {item.name} - Quantity: {item.quantity}
            </h2>
            <p>{item.product_description}</p>
            <p>{item.price}</p>
            <button onClick={() => handleIncrement(item._id)}>+</button>
            <button onClick={() => handleDecrement(item._id)}>-</button>
          </div>
        ))}
        <button onClick={checkout}>Checkout</button>
        <div>
          <strong>Total: {cart.totalAmount}</strong>
        </div>
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log Out
        </button>
      </div>
    );
  } else {
    return <p>No items in cart! Visit a product page to add items! </p>;
  }
}
