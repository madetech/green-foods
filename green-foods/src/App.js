import './App.css';
import { useState } from 'react';
import SearchProductWithBarcode from './components/searchProductWithBarcode';
import SearchProductByName from './components/searchProductByName';

function App() {
  const [userInput, setUserInput] = useState('');
  const [productName, setProductName] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [carbonTotal, setCarbonTotal] = useState(0);
  const [names, setNames] = useState([]);

  return (
    <div class="App">
      <section class="barcode-container">
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
      </section>
      <section class="name-container">
      <SearchProductByName
      userInput={userInput}
      setUserInput={setUserInput}
      names={names}
      setNames={setNames} />
      </section>
    </div>
  );
}

export default App;
