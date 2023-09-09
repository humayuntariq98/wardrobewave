import {useState, useEffect} from 'react'
import { useParams } from "react-router"
import { getProduct } from "../../utilities/product-service"
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@material-tailwind/react";
import { Carousel } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";
import { createOrUpdate } from '../../utilities/cart-service';
import { Alert } from "@material-tailwind/react";
import "./showPage.css"
import { UserCircleIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
export default function Show({setSelectedProduct}){
    const [product, setProduct] = useState(null)
    const [addedToCart, setAddedToCart] = useState(false);
    const {id} = useParams();
    const { isAuthenticated, user } = useAuth0();
    const handleRequest = async () => {
        try {
            const productData = await getProduct(id);
            setProduct(productData)
            setSelectedProduct(productData)
        } catch (err) {
            console.log(err)
        }
    }
    function addToCart(product, user) {

      createOrUpdate(user?.sub, {_id: product._id, price: product.price, name: product.name, images:product.images})
      setAddedToCart(true)
      setTimeout(()=>{
        setAddedToCart(false)
      },2000);

      }
    useEffect(() => {
        handleRequest();
      }, [])
      const loaded = () => (
        <div className="product">
        <div className="carousel-container">
            <Carousel transition={{ duration: 2 }} className="rounded-xl">
                <img src={product.images[0]} alt={product.name + " image"} className="h-full w-full object-cover"/>
                <img src={product.images[1]} alt={product.name + " image"} className="h-full w-full object-cover"/>
            </Carousel>
        </div>

        <div className="product-info">
            <Typography className="product-name">
                <h1>{product.name}</h1>
            </Typography>

            <Typography className="price-text">
                <h3>${product.price}</h3>
            </Typography>
            
            
            <div className="break-line"></div>
            <Typography className="description-heading">
                <h2>Description</h2>
            </Typography>

            <Typography>
                <p>{product.product_description}</p>
            </Typography>

            <Button
                className="bg-blue-gray-50 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 flex items-center justify-center"
                ripple="light"
                onClick={() => addToCart(product, user)}
            >
                <ShoppingCartIcon className="h-5 w-5 mr-2"/>  {/* Adjust h-5 w-5 to your desired size */}
                Add to Cart
            </Button>

            {addedToCart ? <Alert color={'green'} >Added to cart</Alert> : null}
        </div>
    </div>
        
      );
      
      const loading = () => {
        return <h1>Loading.........</h1>;
        // alternatively you can use the spinner
      };
      
      return product ? loaded() : loading();
    }