import React from 'react';
import { handleSearchByBarcode } from '../utils/handleSearchByBarcode';
import { handleSearchByName } from '../utils/handleSearchByName';

const SearchProductByName = ({
    userInput,
    setUserInput,
    names,
    setNames
  }) => {
    return (
        <div>
            <p>Search product by name</p>
            <form>
                <label>
                    Enter a product name: 
                    <input onChange={(e) => {
                        setUserInput(e.target.value)
                    }}></input>
                </label>
            </form>
            <button onClick={() => {
                handleSearchByName(userInput, names, setNames)
            }}>
                Submit
            </button>
            <p>List of Product Names</p>
                <ul>
                   {names.map((name)=>{
                    return <li>{name}</li>
                   })}
                </ul>
            <p>Image URL is</p>
            <p>Carbon total is</p>
            
        </div>
    );
};

export default SearchProductByName;