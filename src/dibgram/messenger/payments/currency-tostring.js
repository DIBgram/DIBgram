import currencies from './currencies';

/**
 * Converts currency to string
 * @param {string} currency Three-letter currency code
 * @param {number} total_amount The total amount
 * @returns Formatted currency string
 */
export default function currencyAmountToString (currency, total_amount) {
    const currencyObject= currencies[currency];
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    return formatter.format(total_amount / 10**currencyObject.exp); // Move two last digits to the right of the decimal point
}