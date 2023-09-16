export default function formatMoneyToNaira(amount) {
  if (typeof amount !== "number") {
    return "Invalid input";
  }

  const formattedAmount = amount.toLocaleString("en-NG", {
    maximumFractionDigits: 2,
  });

  return `₦${formattedAmount}`;
}
