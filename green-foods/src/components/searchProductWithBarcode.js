import '../App.css';
import { handleSearch } from '../utils/handleSearch';

function SearchProductWithBarcode({
  carbonTotal,
  userInput,
  imageURL,
  productName,
  setUserInput,
  setProductName,
  setImageURL,
  setCarbonTotal,
}) {
  let imageElement;
  if (imageURL) {
    imageElement = <img alt={`${productName}`} src={imageURL}></img>;
  }

  return (
    <div className='App'>
      <form>
        <label>
          Enter barcode:
          <input
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          ></input>
        </label>
      </form>
      <button
        onClick={() =>
          handleSearch(userInput, setImageURL, setCarbonTotal, setProductName)
        }
      >
        Submit
      </button>

      <p>{productName}</p>
      {imageElement}

      <h1>{Math.round(carbonTotal * 100)}g CO² per 100g of product</h1>
    </div>
  );
}

export default SearchProductWithBarcode;
