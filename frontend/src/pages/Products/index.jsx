import './Product.css';
import { Link } from 'react-router-dom';
import { getProducts } from '../../utilities/product-service';
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function Products(props) {
  const BASE_URL = "http://localhost:4000/product";
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { isAuthenticated, user } = useAuth0();

  async function handleRequest() {
    try {
      const productsData = await getProducts();
      if (productsData.length) {
        setProducts(productsData);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        throw Error(productsData)
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    handleRequest()
  }, []);

  const EcommerceCard = ({ product }) => {
    const [showFront, setShowFront] = useState(true);

    return (
      <div className="relative card-container">
      <Card className="w-96">
        <CardHeader shadow={false} floated={false} className="h-96 relative">
          <img
            onClick={() => setShowFront(!showFront)}
            src={showFront ? product.images[0] : product.images[1]}
            alt="card-image"
            className="h-full w-full object-cover cursor-pointer"
          />
          <span className="absolute bottom-4 left-4 bg-white text-gray-800 px-2 py-1 rounded-sm">Click to view</span>
        </CardHeader>
        <CardBody>
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
              {product.name}
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              ${product.price}
            </Typography>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Link to={`/products/${product._id}`}>
            <Button
              ripple={false}
              fullWidth={true}
              className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
            >
              View Details
            </Button>
          </Link>
        </CardFooter>
      </Card>
      </div>
    );
  };

  const loaded = () => {
    return products?.map((p) => {
      return (
        <EcommerceCard key={p._id} product={p} />
      );
    });
  };

  const loading = () => (
    <div className="product-list">
      <h1>
        Loading...
        <span>
          <img className="spinner" src="https://freesvg.org/img/1544764567.png" />
        </span>
      </h1>
    </div>
  );

  return (
    <section className="product-list ">
      {isLoading ? loading() : loaded()}
    </section>
  );
}
