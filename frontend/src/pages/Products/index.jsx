import {useState, useEffect} from "react"
export default function Products(props){
    const BASE_URL = "http://localhost:4000/products";
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
          const response = await fetch(BASE_URL);
          const allPeople = await response.json();
          setPeople(allPeople);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      };
    return (
        <h1>Products</h1>
    )
}