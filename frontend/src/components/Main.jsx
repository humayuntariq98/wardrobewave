import { Routes, Route } from "react-router-dom";
import Products from "../pages/Products/";
import Show from "../pages/Show/";

export default function Main(props){
    return (
        <main>
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Show />} />
        </Routes>
      </main>
    )
}