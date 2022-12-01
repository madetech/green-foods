import axios from 'axios';

const getProductWithBarcode = async (userInput) => {
    const response = await axios(`https://world.openfoodfacts.org/api/v0/product/${userInput}.json`)
    const prod = response.data.product

    const productInfo = {
      name: prod.product_name,
      image: prod.image_front_small_url,
      carbon: prod.ecoscore_data.agribalyse?.co2_total || null
    }
    return productInfo
}

export {getProductWithBarcode}