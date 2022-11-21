import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {

  const [userInput, setUserInput] = useState("jhg");
  console.log(userInput)
  // const getUserInput = (event) => {
  //   console.log("this is the event =>", event)

  //   const userInput = event.target.value
    // console.log(userInput)
  // }


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