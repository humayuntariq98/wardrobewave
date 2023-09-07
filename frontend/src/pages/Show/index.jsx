import {useState, useEffect} from 'react'
import { useParams } from "react-router"
import { getProduct } from "../../utilities/product-service"
import { useAuth0 } from "@auth0/auth0-react";

export default function Show(){
    const [product, setProduct] = useState(null)
    const {id} = useParams();
    const { isAuthenticated, user } = useAuth0();
    const handleRequest = async () => {
        try {
            const productData = await getProduct(id);
            setProduct(productData)
        } catch (err) {
            console.log(err)
        }
    }
    function addToCart(product) {
        // Retrieve the cart from localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || {};
      
        // Check if the product is already in the cart
        if(cart[product._id]) {
          // Increment the quantity of the product in the cart
          cart[product._id].quantity += 1;
        } else {
          // Add the product to the cart with quantity 1
          cart[product._id] = { ...product, quantity: 1 };
        }
      
        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    console.log(`Current Product: ${JSON.stringify(product)}`);
    useEffect(() => {
        handleRequest();
      }, [])
      const loaded = () => (
        <div className="product">
            {isAuthenticated && <h2>Welcome back, {user.name}!</h2>}
          <h1>Show Page</h1>
          <h2>{product.name}</h2>
          <h2>{product.product_description}</h2>
          <img src={product.images[0]} alt={product.name + " image"} />
          <img src={product.images[1]} alt={product.name + " image"} />
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      );
      
      const loading = () => {
        return <h1>Loading.........</h1>;
        // alternatively you can use the spinner
      };
      
      return product ? loaded() : loading();
    }