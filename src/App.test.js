import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

jest.mock('./auth');

test('renders as guest', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});
