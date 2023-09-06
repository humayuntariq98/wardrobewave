import { createContext } from "react";
const ProductContext = createContext();

// React.createContext exports two React Components -> Consumer and Provider
// Consumer: {$$typeof: Symbol(react.context), _context: {…}, _calculateChangedBits: null, …}
// Provider: {$$typeof: Symbol(react.provider), _context: {…}}

export { ProductContext };