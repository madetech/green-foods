import { render, screen } from '@testing-library/react';
import H1 from './H1';

describe('H1', () => {
  test('it renders', () => {
    render(<H1 title='I am a H1 component' />);
    const h1 = screen.getByText('I am a H1 component');

    expect(h1).toBeInTheDocument();
  });
});
