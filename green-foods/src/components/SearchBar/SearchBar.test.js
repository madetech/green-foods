import { render, screen, within } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  beforeEach(() => {
    render(<SearchBar />);
  });

  test('it has a label', () => {
    const label = screen.getByLabelText('search field');

    expect(label).toBeInTheDocument();
  });

  test('it has an input field', () => {
    const inputField = screen.getByPlaceholderText('search a product');

    expect(inputField).toBeInTheDocument();
  });

  test('it has a submit button', () => {
    const button = screen.getByRole('button');
    const buttonText = within(button).getByText('Submit');

    expect(button).toBeInTheDocument();
    expect(buttonText).toBeInTheDocument();
  });
});
