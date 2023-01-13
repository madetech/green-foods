import { getProductsByName } from './name';

const handleSearchByName = async (
 userInput,
 names,
 setNames
) => {
  const productInfo = await getProductsByName(userInput);
  console.log("----------->", productInfo)
    setNames(productInfo)
    // console.log("Names here:", names)

   const listOfProductNames = productInfo.map((product) => {
    return product.name
   })
   setNames(listOfProductNames)
//    console.log('list here', listOfProductNames)
};

export { handleSearchByName };