import currencies from './currencies';

export default function currencyAmountToString (currency, total_amount) {
    const currencyObject= currencies[currency];
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    return formatter.format(total_amount / 10**currencyObject.exp);
}