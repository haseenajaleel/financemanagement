const mongoose = require('mongoose');

// Income schema
const incomeSchema = new mongoose.Schema({
  source: String,
  amount: Number,
  date: { type: Date, default: Date.now }
});

// Expense schema
const expenseSchema = new mongoose.Schema({
  category: String,
  amount: Number,
  date: { type: Date, default: Date.now }
});

// ✅ NEW: Entry schema for income/expense tracking
const entrySchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['Income', 'Expense'],
    required: true
  },
  type: String,
  amount: Number,
  date: { type: Date, default: Date.now }
});

// Main user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  incomes: [incomeSchema],
  expenses: [expenseSchema],
  entries: [entrySchema] // ✅ Add this
});

// Export model
const createuser = mongoose.model('createuser', userSchema);
module.exports = createuser;
