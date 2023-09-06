import { useState, useEffect } from "react"

export default function Cart () {
    const [cartItems, setCartItems] = useState([])

     const checkout = () => {
        //logic to handle checkout
            console.log(localStorage.getItem("cart"),"your order has been placed")
            localStorage.removeItem("cart")
            setCartItems([])
     }

     useEffect(()=>{
        //get the cart items from local storage
        const cart = localStorage.getItem("cart")
        if(cart){
            setCartItems(JSON.parse(cart))
        }
      }, [])
      
    // function calculateTotal(price, quantity){
    //     let total = price * quantity
    //     return total
    //   }

    return (
        <div>
            <h1>All orders</h1>
            {cartItems.map((item)=> (
                <div key={item._id}>
                <img src={item.images[0]} alt={item.name}/>
                <h2>{item.name}</h2>
                <p>{item.product_description}</p>
                <p>{item.price}</p>
                 </div>
            ))}
            <button onClick={checkout}>Checkout</button>
        </div>
        
    )
}