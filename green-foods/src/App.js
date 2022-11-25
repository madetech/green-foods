import './App.css';
import {useState} from 'react';
import axios from 'axios';

function App() {

  const [userInput, setUserInput] = useState("");
  const [productName, setProductName] = useState("");
  const [imageURL, setImageURL] = useState("")
  const [carbonTotal, setCarbonTotal] = useState(0)



  const getProductWithBarcode = (userInput) => {
    axios(`https://world.openfoodfacts.org/api/v0/product/${userInput}.json`)
    .then(response => {
      const prod = response.data.product

      setProductName(prod.product_name)
      setImageURL(prod.image_front_small_url)
      setCarbonTotal(prod.ecoscore_data.agribalyse.co2_total)
    })
    .catch(error => {
    console.log(error)
  }) 
  }

  let imageElement
  if(imageURL) {
    imageElement = <img alt={`${productName}`} src={imageURL}></img>
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
      <button
      onClick={() => getProductWithBarcode(userInput)}>
        Submit
      </button>

      <p>
        {productName}
      </p>
        {imageElement}
       
      <h1>
        {Math.round(carbonTotal*100)}g CO² per 100g of product
      </h1>
    </div>
  );
}

export default App;
