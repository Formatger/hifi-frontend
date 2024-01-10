export function formatOtherCurrency(amount: number) {
  // Extract the integer part
  const integerPart = Math.floor(amount);

  // Extract the decimal part
  const decimalPart = Math.floor((amount - integerPart) * 100);

  // Ensure the decimal part has exactly two digits
  const paddedDecimal = decimalPart < 10 ? `0${decimalPart}` : `${decimalPart}`;

  // Join the integer part and decimal part
  const formattedAmount = `${integerPart}.${paddedDecimal}`;
  // Use Intl.NumberFormat for currency formatting

  return formattedAmount;
}
