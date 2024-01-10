export function formatCurrency(amount: number) {
  // Extract the integer partss
  const integerPart = Math.floor(amount);

  // Extract the decimal part
  const decimalPart = Math.floor((amount - integerPart) * 100);

  // Ensure the decimal part has exactly two digits
  const paddedDecimal = decimalPart < 10 ? `0${decimalPart}` : `${decimalPart}`;

  // Join the integer part and decimal part
  const formattedAmount = `${integerPart}.${paddedDecimal}`;
  // Use Intl.NumberFormat for currency formatting
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return formatter.format(parseFloat(formattedAmount));
}
