import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

function App() {

  const [userInput, setUserInput] = useState(" ");
  const [productName, setProductName] = useState(" ");


  console.log(userInput)
  // const getUserInput = (event) => {
  //   console.log("this is the event =>", event)

  //   const userInput = event.target.value
    // console.log(userInput)
  // }

useEffect(() => {
  axios('https://world.openfoodfacts.org/api/v0/product/80135463.json')
  .then(response => {
    setProductName(response.data.product.abbreviated_product_name)
  })
  .catch(error => {
    console.log(error)
  })
}, [])

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
      <button>
        Submit
      </button>
      <p>
        productName here: {productName}
      </p>
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