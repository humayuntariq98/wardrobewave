import { Routes, Route } from "react-router-dom";
import Products from "../pages/Products/";
import Show from "../pages/Show/";
import Cart from '../pages/Cart'
import { useState } from "react";
import { ProductContext } from "../data/ProductContext";

import SimpleFooter from "./SimpleFooter";
export default function Main(props){
  const [selectedProduct, setSelectedProduct] = useState({})
    return (
        <main>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products/:id" element={<Show setSelectedProduct={setSelectedProduct} />} />
          <Route path='/cart' element={
          <ProductContext.Provider value={selectedProduct}>
            <Cart />
          </ProductContext.Provider>
          }/>
        </Routes>
        <SimpleFooter />
      </main>
    )
}