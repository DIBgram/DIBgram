import currencies from './currencies';

/**
 * Converts currency to string
 * @param {string} currency Three-letter currency code
 * @param {number} total_amount The total amount
 * @returns Formatted currency string
 */
export default function currencyAmountToString (currency, total_amount) {
    const {code, title, symbol, native, thousands_sep, decimal_sep, symbol_left, space_between, exp, min_amount, max_amount}= currencies[currency];
    const calculatedAmount= total_amount / 10.0**exp;
    const formattedAmount= calculatedAmount.toFixed(exp).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, thousands_sep).replace(/\./, decimal_sep);
    var withSymbol= symbol_left ? `${symbol}${space_between ? ' ' : ''}${formattedAmount}` : `${formattedAmount}${space_between ? ' ' : ''}${symbol}`;
    return withSymbol;
    
    // var formatter = new Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency: currency,
        
    //     minimumFractionDigits: 2,
    //     maximumFractionDigits: 2,
    // });
    // return formatter.format(total_amount / 10**currencyObject.exp); // Move two last digits to the right of the decimal point
}