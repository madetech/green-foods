import { APIGatewayProxyEventV2, APIGatewayProxyResult } from "aws-lambda";
import axios from "axios";
import { run } from "../handler"

jest.mock("axios");
const mockAxios = jest.mocked(axios);

describe("run", () => {
    it("returns a product", async () => {
        const event: unknown = {pathParameters: {barcode: "barcode"}};
        mockAxios.mockResolvedValueOnce({
            data: {
              product: {
                product_name: "Product Name",
                image_front_small_url: "url",
                ecoscore_data: {
                  agribalyse: {
                    co2_total: "Carbon",
                  },
                },
              },
            },
        });

        const result: APIGatewayProxyResult = await run(event as APIGatewayProxyEventV2);

        expect(result.statusCode).toBe(200)
        expect(result.body).toEqual(JSON.stringify({name: "Product Name", url: "url", carbon: "Carbon"}))
    })
})