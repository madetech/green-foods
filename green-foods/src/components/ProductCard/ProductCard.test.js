import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';

describe('ProductCard', () => {
  beforeEach(() => {
    render(<ProductCard carbonTotal={1.7} productName='pringles' />);
  });

  test('it has an image element', () => {
    const image = document.querySelector('img');
    expect(image).toBeInTheDocument();
  });

  test('the image has alt text', () => {
    const image = document.querySelector('img');
    expect(image.alt).toContain('pringles');
  });

  test('it displays the product name', () => {
    const productName = screen.getByText('pringles');
    expect(productName).toBeInTheDocument();
  });

  test('it displays the carbon total', () => {
    const carbonTotal = screen.getByText('170g CO² per 100g of product');
    expect(carbonTotal).toBeInTheDocument();
  });
});
