import axios from 'axios';

const getProductsByName = async (userInput) => {
    const response = await axios(`https://uk.openfoodfacts.org/cgi/search.pl?json=true&action=process&search_terms=${userInput}`)
    const prod = response.data.products
    const productInfos = prod.map((product) => {
        return {
            name: product.product_name,
            image: product.image_front_small_url,
            carbon: product.ecoscore_data.agribalyse?.co2_total
        }
    })
    return productInfos
}

export {getProductsByName}