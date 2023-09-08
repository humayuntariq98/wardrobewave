import { useState, useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react";

export default function Cart () {
    const [cartItems, setCartItems] = useState([])
    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
    
    function updateQuantity(productId, amount) {
        let cart = JSON.parse(localStorage.getItem('cart')) || {};
      
        if(cart[productId]) {
          cart[productId].quantity += amount;
      
          if(cart[productId].quantity <= 0) {
            delete cart[productId];
          }
      
          localStorage.setItem('cart', JSON.stringify(cart));
        }
      }
     const checkout = () => {
        //logic to handle checkout
            console.log(localStorage.getItem("cart"),"your order has been placed")
            localStorage.removeItem("cart")
            setCartItems([])
     }
     const handleIncrement = (productId) => {
        updateQuantity(productId, 1);
        // Refresh cart data
        setCartItems(getCart());
    }

    const handleDecrement = (productId) => {
        updateQuantity(productId, -1);
        // Refresh cart data
        setCartItems(getCart());
    }

    function calculateTotal(price, quantity){
        return cartItems.reduce((acc, currItem) => {
            return acc + (currItem.price * currItem.quantity)
        },0)
      }
      function getCart(){
        const cart = JSON.parse(localStorage.getItem('cart')) || {}
        return Object.values(cart)
      }


      useEffect(()=>{
        const cartData = getCart()
        setCartItems(cartData)
      }, [])
      
      if (!isAuthenticated) {
        return (
            <div>
                <p>You need to be logged in to view your cart.</p>
                <button onClick={() => loginWithRedirect()}>Log In</button>
            </div>
        );
    }

    return (
        <div>
            <h1>All orders for {user.name}</h1>
            {cartItems.map((item)=> (
                <div key={item._id}>
                <img src={item.images[0]} alt={item.name}/>
                <h2>{item.name} - Quantity: {item.quantity}</h2>
                <p>{item.product_description}</p>
                <p>{item.price}</p>
                <button onClick={() => handleIncrement(item._id)}>+</button>
                <button onClick={() => handleDecrement(item._id)}>-</button>
                 </div>
            ))}
            <button onClick={checkout}>Checkout</button>
            <div>
        <strong>Total: ${calculateTotal().toFixed(2)}</strong>
        </div>
        <button onClick={() => logout({ returnTo: window.location.origin })}>
                Log Out
            </button>
        </div>
        
    )
}

// export default function Cart () {
//   const [cart, setCart] = useState({})

//   async function getCartData (){
//     const response = await fetch("http:localhost:4000/cart");
//     const data = await response.json();
//     setCart(data);
//     console.log(cart, "seeing cart data")
//   }

//   useEffect(() => {getCartData()}, []);
// }


