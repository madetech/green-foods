import '../App.css';
import {useState} from 'react';
import {getProductWithBarcode} from "../utils/product"

function SearchProductWithBarcode() {

  const [userInput, setUserInput] = useState("");
  const [productName, setProductName] = useState("");
  const [imageURL, setImageURL] = useState("")
  const [carbonTotal, setCarbonTotal] = useState(0)

  let imageElement
  if(imageURL) {
    imageElement = <img alt={`${productName}`} src={imageURL}></img>
    }

  const handleSearch = async (userInput) => {
    const productInfo = await getProductWithBarcode(userInput)
    setProductName(productInfo.name)
    setImageURL(productInfo.image)
    setCarbonTotal(productInfo.carbon)
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
      onClick={() => handleSearch(userInput)}>
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

export default SearchProductWithBarcode;
