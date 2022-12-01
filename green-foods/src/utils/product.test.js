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

    expect(product.name).toBe("Pringles Original");
    expect(product.image).toBe("url");
    expect(product.carbon).toBe("1.87");
  });

  it("returns null-value for carbon when data is not present", async () => {
    axios.mockResolvedValueOnce({
      data: {
        product: {
          product_name: "Pringles Original",
          image_front_small_url: "url",
          ecoscore_data: {},
        },
      },
    });

    const product = await getProductWithBarcode("5053990138722");

    expect(product.name).toBe("Pringles Original");
    expect(product.image).toBe("url");
    expect(product.carbon).toBe(null);
  });

  it("returns null values when given invalid barcode", async () => {
    axios.mockResolvedValueOnce({
      data: {
        code: null,
        status: 0,
        status_verbose: "no code or invalid code",
      },
    });

    const product = await getProductWithBarcode("not a barcode");

    expect(product.name).toBe(null);
    expect(product.image).toBe(null);
    expect(product.carbon).toBe(null);
    expect(product.message).toBe("no code or invalid code");
  });
});
// check if not 200 response status
