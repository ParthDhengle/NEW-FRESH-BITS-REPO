import { render, screen } from '@testing-library/react';
import App from './App';

test('renders SupplyConnect', () => {
  render(<App />);
  const linkElement = screen.getByText(/SupplyConnect/i);
  expect(linkElement).toBeInTheDocument();
});