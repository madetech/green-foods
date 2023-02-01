import axios from 'axios';
import { getProductWithName } from './getProductWithName';

jest.mock('axios');

// check if JSON response returns correct
describe('searchProductByName', () => {
  it('returns a productInfos array of objects', async () => {
    axios.mockResolvedValueOnce({
      data: {
        products: [
          {
            product_name: 'product 1',
            image_front_small_url: 'url 1',
            ecoscore_data: {
              agribalyse: {
                co2_total: '1.0',
              },
            },
          },
          {
            product_name: 'product 2',
            image_front_small_url: 'url 2',
            ecoscore_data: {
              agribalyse: {
                co2_total: '2.0',
              },
            },
          },
        ],
      },
    });
    const expected = [
      {
        name: 'product 1',
        image: 'url 1',
        carbon: '1.0',
      },
      {
        name: 'product 2',
        image: 'url 2',
        carbon: '2.0',
      },
    ];

    const product = await getProductWithName('name');

    expect(product).toEqual(expected);
  });
});
