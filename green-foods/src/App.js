import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

function App() {

  const [userInput, setUserInput] = useState(" ");
  const [productName, setProductName] = useState(" ");
  const [imageURL, setImageURL] = useState(" ")
  const [carbonTotal, setCarbonTotal] = useState(0)

  const makecalltoAPI = (userInput) => {
    axios(`https://world.openfoodfacts.org/api/v0/product/${userInput}.json`)
    .then(response => {
      setProductName(response.data.product.brands_tags[0])
      setImageURL(response.data.product.image_front_small_url)
      setCarbonTotal(response.data.product.ecoscore_data.agribalyse.co2_total)
    })
    .catch(error => {
    console.log(error)
  }) 
  }

  return (
    <div className="App">
      <form>
        <label>
          Enter barcode: 
          <input
            onChange={(e) => {
              setUserInput(e.target.value)
            }}
            >
          </input>
        </label>
      </form>
      <p>
        userInput here: {userInput}
      </p>
      <button
      onClick={() => makecalltoAPI(userInput)}>
        Submit
      </button>

      <p>
        productName here: {productName}
      </p>
      <img src={imageURL}></img>
      <h1>
        {Math.round(carbonTotal*100)}g CO² per 100g of product
      </h1>
    </div>
  );
}

export default App;

// display an input box 
// submit button

// take the user input

// store the user input 
// make API call with user input
// display CO2 data 
// display image of the product 