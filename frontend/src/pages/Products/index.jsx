import './Product.css'

import {useState, useEffect} from "react"
export default function Products(props){
    const BASE_URL = "http://localhost:4000/products";
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
      try {
        const response = await fetch(BASE_URL);
        const allProducts = await response.json();
        setProducts(allProducts);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
  


    useEffect(() => {
      getProducts();
    }, []);
  
    console.log(`There are ${products.length} products available to render`);

    const loaded = () => {
      return products?.map((p) => {
        return (
          <div key={p._id}>
            <h3>{p.name}</h3>
            <img className="front-image" src={p.images[0]} alt="front-image" />
            <img className="back-image" src={p.images[1]} alt="back-image" />
            <p>{p.product_description}</p>
            <p>{p.price}</p>
          </div>
        );
      });
    };
  
    const loading = () => (
      <div className="product-list">
        <h1>
          Loading...
          <span>
            <img
              className="spinner"
              src="https://freesvg.org/img/1544764567.png"
            />
          </span>
        </h1>
      </div>
    );
  
    return (
      <section className="product-list">
        {isLoading ? loading() : loaded()}
      </section>
    );
  }
  
   