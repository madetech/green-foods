import { getProductWithBarcode } from './product';

const handleSearchByBarcode = async (
  userInput,
  setImageURL,
  setCarbonTotal,
  setProductName
) => {
  const productInfo = await getProductWithBarcode(userInput);
  setProductName(productInfo.name);
  setImageURL(productInfo.image);
  setCarbonTotal(productInfo.carbon);
};

export { handleSearchByBarcode };
