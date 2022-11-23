import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

function App() {

  const [userInput, setUserInput] = useState(" ");
  const [productName, setProductName] = useState(" ");
  const [submitBarcode, setSubmitBarcode] = useState(" ");

  // console.log(userInput)
  // const getUserInput = (event) => {
  //   console.log("this is the event =>", event)

  //   const userInput = event.target.value
    // console.log(userInput)
  // }

  const makecalltoAPI = (userInput) => {
    console.log("button clicked")
    console.log(userInput)
    axios(`https://world.openfoodfacts.org/api/v0/product/${userInput}.json`)
    .then(response => {
      console.log(response)
    setProductName(response.data.product.brands_tags[0])
  })
    .catch(error => {
    console.log(error)
  }) 
  }

// useEffect(() => {
//   axios(`https://world.openfoodfacts.org/api/v0/product/${submitBarcode}.json`)
//   .then(response => {
//     setProductName(response.data.product)
//   })
//   .catch(error => {
//     console.log(error)
//   })
// }, [submitBarcode])

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