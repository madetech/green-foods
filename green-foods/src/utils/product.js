import axios from "axios";

const getProductWithBarcode = async (userInput) => {
  const response = await axios(
    // TODO: When ready to connect to backend, replace this url with:
    // `${process.env.REACT_APP_API_URL}/v1/products/${userInput}`
    `https://world.openfoodfacts.org/api/v0/product/${userInput}.json`
  );
  const prod = response.data.product;

  if (prod) {
    const productInfo = {
      name: prod.product_name,
      image: prod.image_front_small_url,
      carbon: prod.ecoscore_data.agribalyse?.co2_total || null,
    };
    return productInfo;
  }
  const productInfo = {
    name: null,
    image: null,
    carbon: null,
    message: response.data.status_verbose,
  };
  return productInfo;
};

export { getProductWithBarcode };
