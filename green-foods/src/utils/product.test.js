import axios from "axios";
import "./product";
import { getProductWithBarcode } from "./product";

jest.mock("axios");

// check if JSON response returns correct
describe("searchProductWithBarcode", () => {
  it("returns a productInfo object", async () => {

    axios.mockResolvedValueOnce({
      data: {
        product: {
          product_name: "Pringles Original",
          image_front_small_url: "url",
          ecoscore_data: {
            agribalyse: {
              co2_total: "1.87",
            },
          },
        },
      },
    });

    const product = await getProductWithBarcode("5053990138722");

    expect(product.name).toBe("Pringles Original")
  });
});
// check if not 200 response status
