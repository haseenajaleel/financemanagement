export default function Reminder({ type, amount, dueDate }) {
  return (
    <div className="alert alert-warning">
      {type} of ₹{amount} due on {dueDate}
    </div>
  );
}
