import './App.css';
import { useState } from 'react';
import SearchProductWithBarcode from './components/searchProductWithBarcode';

function App() {
  const [userInput, setUserInput] = useState('');
  const [productName, setProductName] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [carbonTotal, setCarbonTotal] = useState(0);

  return (
    <SearchProductWithBarcode
      imageURL={imageURL}
      userInput={userInput}
      productName={productName}
      carbonTotal={carbonTotal}
      setUserInput={setUserInput}
      setCarbonTotal={setCarbonTotal}
      setImageURL={setImageURL}
      setProductName={setProductName}
    />
  );
}

export default App;
