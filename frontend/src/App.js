import './App.css';
import { useState } from "react";
import Header from './components/Header'
import Main from './components/Main'
import {ProductConext} from './data/ProductContext'
function App() {
  const {Provider: ProductData, Consumer} = ProductConext
  const [state, setState] = useState({})
  return (
    <div className="App">
      <ProductData value={{state, setState}}>
      <Header />
      <Main />
      </ProductData>
    </div>
  );
}

export default App;
