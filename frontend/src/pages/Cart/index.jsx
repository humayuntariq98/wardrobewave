import { useState, useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { destroy } from "../../utilities/cart-service";
import './cart.css'
import { PlusIcon, MinusIcon, TrashIcon } from '@heroicons/react/24/outline';
import {Button} from "@material-tailwind/react"
export default function Cart() {
  const [cart, setCart] = useState(null);
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const checkout = async () => {
    await destroy(user?.sub);
    setCart({});
  };

  const handleIncrement = async (itemId) => {
    // Logic to increase the quantity of the item with the given itemId
    // Make sure to re-fetch the cart after this operation to reflect the changes.
  }
  
  const handleDecrementOrRemove = async (itemId) => {
    if (itemId.quantity > 1) {
      // Logic to decrease the quantity of the item with the given itemId
    } else {
      // Logic to remove the item from the cart
    }
    // Make sure to re-fetch the cart after this operation to reflect the changes.
  }

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
      <div className="cart-container">
      <h1>Your Cart</h1>
      {cart?.products?.map((item) => (
        <div key={item._id} className="item-card">
          <img className="item-image" src={item.images[0]} alt={item.name} />
          
          <div className="item-details">
            <h2>{item.name}</h2>
            <p>${item.price} each</p>
            <p>{item.product_description}</p>
          </div>
          
          <div className="item-actions">
          <div className="quantity-container bg-blue-gray-500">
    <button className="icon-button " onClick={() => handleDecrementOrRemove(item._id)}>
        {item.quantity > 1 ? 
            <MinusIcon className="h-6 w-6 text-blue-gray-50" /> :
            <TrashIcon className="h-6 w-6 text-blue-gray-50" />
        }
    </button>
    <p className="mx-4 text-blue-gray-50">Quantity: {item.quantity}</p>
    <button className="icon-button" onClick={() => handleIncrement(item._id)}>
        <PlusIcon className="h-6 w-6 text-blue-gray-50" />
    </button>
</div>
            <strong>Total: ${cart.totalAmount}</strong>
          </div>
        </div>
      ))}
      <Button ripple={false}
              fullWidth={true}
              className="bg-yellow-100 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 w-1/4" onClick={checkout}>Buy Now</Button>
    </div>
    );
  } else {
    return <p>No items in cart! Visit a product page to add items! </p>;
  }
}
