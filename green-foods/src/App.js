import './App.css';
import {useState} from 'react';
import {getProductWithBarcode} from "./utils/product"
import SearchProductWithBarcode from './components/searchProductWithBarcode';

function App() {

  return (
    <SearchProductWithBarcode />
  );
}

export default App;
