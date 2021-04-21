/* eslint-disable */
import { render, screen } from '@testing-library/react';
import App from './App';

test('see if app runs', () => {
    render(<App />);
    const linkElement = screen.getByText(/Loading.../i);
    expect(linkElement).toBeInTheDocument();
});
