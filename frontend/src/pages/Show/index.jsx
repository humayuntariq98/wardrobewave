import {useState, useEffect} from 'react'
import { useParams } from "react-router"
import { getProduct } from "../../utilities/product-service"
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@material-tailwind/react";
import { Carousel } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";
import "./showPage.css"

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
      console.log(user,"checking user")
      const loaded = () => (
        <div className="product">
            {/* {isAuthenticated && <h2>Welcome back, {user.name}!</h2>} */}
          
          <div className="carousel-container">
          <Carousel transition={{ duration: 2 }} className="rounded-xl">
          <img src={product.images[0]} alt={product.name + " image"} className="h-full w-full object-cover"/>
          <img src={product.images[1]} alt={product.name + " image"} className="h-full w-full object-cover"/>
          </Carousel>
          <Typography>
          <h2>{product.name}</h2>
          </Typography>
          <Typography>
          <h2>{product.product_description}</h2>
          </Typography>
          <Typography>
          <h3>${product.price}</h3>
          </Typography>
          <Button
              className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              ripple="light" 
              onClick={() => addToCart(product)}
               >
               Add to Cart
            </Button>
          </div>
        </div>
      );
      
      const loading = () => {
        return <h1>Loading.........</h1>;
        // alternatively you can use the spinner
      };
      
      return product ? loaded() : loading();
    }