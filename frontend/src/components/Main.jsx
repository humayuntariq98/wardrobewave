import { Routes, Route } from "react-router-dom";
import Products from "../pages/Products/";
import Show from "../pages/Show/";
import Cart from '../pages/Cart'
export default function Main(props){
    return (
        <main>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products/:id" element={<Show />} />
            <Route path='/cart' element={<Cart />}/>
        </Routes>
      </main>
    )
}