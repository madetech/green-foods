import { useState, useEffect } from 'react';
import { getProductWithName } from '../../utils/getProductWithName';

import ProductCard from '../ProductCard/ProductCard';
import ProductGrid from '../ProductGrid/ProductGrid';
import SearchBar from '../SearchBar/SearchBar';

const SearchByName = () => {
  const [userInput, setUserInput] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let didCancel = false;

    async function fetchMyAPI() {
      const response = await getProductWithName(userInput);
      if (!didCancel) {
        setProducts(response);
      }
    }

    fetchMyAPI();
    return () => {
      didCancel = true;
    };
  }, [userInput]);

  return (
    <>
      <SearchBar
        onChange={(e) => {
          setUserInput(e.target.value);
        }}
      />
      {userInput != '' && (
        <ProductGrid>
          {products.map((product, index) => (
            <ProductCard
              key={index}
              productName={product.name}
              imgSrc={product.image}
              carbonTotal={product.carbon}
            />
          ))}
        </ProductGrid>
      )}
    </>
  );
};

export default SearchByName;
