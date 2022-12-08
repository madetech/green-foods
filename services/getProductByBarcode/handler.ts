import {APIGatewayProxyResult, APIGatewayProxyEventV2} from "aws-lambda"
import axios from "axios";

export const run = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResult> => {
    const response = await axios(
        `https://world.openfoodfacts.org/api/v0/product/${event.pathParameters?.barcode}.json`
      );
      const product = response.data.product;

      const productInfo = {
        name: product.product_name,
        image: product.image_front_small_url,
        carbon: product.ecoscore_data.agribalyse?.co2_total,
      }

    return {statusCode: 200, body: JSON.stringify(productInfo)}
}
