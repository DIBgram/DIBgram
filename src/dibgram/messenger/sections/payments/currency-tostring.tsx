import currencies from './currencies.json';

/**
 * Converts currency to string
 * @param currency Three-letter currency code
 * @param total_amount The total amount
 * @returns Formatted currency string
 */
export default function currencyAmountToString (currency: keyof typeof currencies, total_amount: number): string {
    const {symbol, thousands_sep, decimal_sep, symbol_left, space_between, exp}= currencies[currency];
    const calculatedAmount= total_amount / 10.0**exp;
    const formattedAmount= calculatedAmount.toFixed(exp).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, thousands_sep).replace(/\./, decimal_sep);
    const withSymbol= symbol_left ? `${symbol}${space_between ? ' ' : ''}${formattedAmount}` : `${formattedAmount}${space_between ? ' ' : ''}${symbol}`;
    return withSymbol;
    
    // var formatter = new Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency: currency,
        
    //     minimumFractionDigits: 2,
    //     maximumFractionDigits: 2,
    // });
    // return formatter.format(total_amount / 10**currencyObject.exp); // Move two last digits to the right of the decimal point
}