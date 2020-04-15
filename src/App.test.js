import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import io from 'socket.io-client';

jest.mock('./auth');
jest.mock('socket.io-client');

test('renders as guest', () => {
  io.mockReturnValue({ on: jest.fn() });

  const { getByText } = render(<App />);
  const linkElement = getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});
