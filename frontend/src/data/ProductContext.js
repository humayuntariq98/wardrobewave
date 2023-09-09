import { createContext } from "react";
const initialProductContext = {name: "", images: [], price: 0, _id: ""}
const ProductContext = createContext(initialProductContext);

// React.createContext exports two React Components -> Consumer and Provider
// Consumer: {$$typeof: Symbol(react.context), _context: {…}, _calculateChangedBits: null, …}
// Provider: {$$typeof: Symbol(react.provider), _context: {…}}

export { ProductContext };