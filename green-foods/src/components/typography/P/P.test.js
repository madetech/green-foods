import { render, screen } from '@testing-library/react';
import P from './P';

describe('P', () => {
  test('it renders', () => {
    render(<P text='I am a P component and this is some text.' />);
    const p = screen.getByText('I am a P component and this is some text.');

    expect(p).toBeInTheDocument();
  });

  test('it can accept children elements', () => {
    render(
      <P text='I am a P component and this is some text.'>
        <small>This is some random small text</small>
      </P>
    );
    const child = screen.getByText('This is some random small text');

    expect(child).toBeInTheDocument();
  });
});
