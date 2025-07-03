export default function Alert({ income, expenses }) {
  const remaining = income - expenses;
  const msg = remaining < 1000
    ? "Warning: Low balance! Reduce expenses."
    : `You can save ₹${(remaining * 0.5).toFixed(2)} this month.`;

  return (
    <div className="alert alert-info">{msg}</div>
  );
}
