import { getProductsByName } from './name';

const handleSearchByName = async (
 userInput,
 names,
 setNames
) => {

    const productInfo = await getProductsByName(userInput);
                                                                   
    const listOfProductNames = productInfo.map((product) => {
    return product.name
   })

   setNames(listOfProductNames)

};

export { handleSearchByName };