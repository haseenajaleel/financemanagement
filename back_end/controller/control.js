const users = require('../models/loginmodel');
const mongoose = require('mongoose');

// ✅ Register User (Plaintext password)
const createuser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const newUser = new users({ name, email, password });
    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Error registering user", error: err.message });
  }
};

// ✅ Login (Plaintext check)
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await users.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (user.password !== password) {
      return res.status(401).json({ msg: "Incorrect password" });
    }

    res.status(200).json({ msg: "Login successful", user });
  } catch (err) {
    res.status(500).json({ msg: "Login failed", error: err.message });
  }
};

// ✅ Add Income (optional legacy)
const addIncome = async (req, res) => {
  const { userId, source, amount, date } = req.body;
  try {
    const user = await users.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.incomes.push({ source, amount, date });
    await user.save();

    res.status(200).json({ msg: 'Income added successfully', incomes: user.incomes });
  } catch (err) {
    res.status(500).json({ msg: 'Error adding income', error: err.message });
  }
};

// ✅ Add Expenses (optional legacy)
const addExpenses = async (req, res) => {
  const { userId, amount, category, date } = req.body;
  if (!userId || !amount || !category) {
    return res.status(400).json({ msg: 'Missing required fields' });
  }

  try {
    const user = await users.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.expenses.push({ category, amount, date });
    await user.save();

    res.status(200).json({ msg: 'Expenses added successfully', expenses: user.expenses });
  } catch (err) {
    res.status(500).json({ msg: 'Error adding expense', error: err.message });
  }
};

// ✅ Add Entry (preferred: Income/Expense unified)
const addEntry = async (req, res) => {
  const { userId, category, type, amount, date } = req.body;

  if (!userId || !category || !type || !amount) {
    return res.status(400).json({ msg: 'Missing required fields' });
  }

  try {
    const user = await users.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // ✅ Construct entry
    const entry = { category, type, amount, date };

    // ✅ Add to category-specific arrays
    if (category === 'Income') {
      user.incomes.push({ source: type, amount, date });
    } else if (category === 'Expense') {
      user.expenses.push({ category: type, amount, date });
    } else {
      return res.status(400).json({ msg: 'Invalid category' });
    }

    // ✅ Add to unified entries array
    user.entries.push(entry);

    await user.save();

    res.status(200).json({ msg: `${category} entry added successfully`, entry });
  } catch (err) {
    res.status(500).json({ msg: 'Error adding entry', error: err.message });
  }
};

// totalsheet
const totalsheet = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const entries = user.entries || [];

    const grouped = {};

    entries.forEach(entry => {
      const dateKey = new Date(entry.date).toISOString().split('T')[0];
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push({
        category: entry.category,
        type: entry.type,
        amount: entry.amount
      });
    });

    const result = Object.entries(grouped).map(([date, entries]) => ({
      date,
      entries
    }));

    res.json(result);
  } catch (err) {
    console.error("Error in totalsheet:", err);
    res.status(500).json({ message: "Error fetching entries", error: err.message });
  }
};


// ✅ Get Summary
const getSummary = async (req, res) => {
  const { userId } = req.params;
  console.log("📥 Fetching summary for userId:", userId);

  try {
    if (!userId) return res.status(400).json({ msg: 'User ID is required' });

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ msg: 'Invalid user ID format' });
    }

    const user = await users.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const incomeArray = user.incomes || [];
    const expenseArray = user.expenses || [];

    const income = incomeArray.reduce((sum, i) => sum + (Number(i.amount) || 0), 0);
    const expenses = expenseArray.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
    const remaining = income - expenses;

    res.status(200).json({ income, expenses, remaining });
  } catch (err) {
    console.error("❌ Error fetching summary:", err.message);
    res.status(500).json({ msg: 'Error fetching summary', error: err.message });
  }
};

// ✅ Export all functions
module.exports = {
  createuser,
  login,
  addIncome,
  addExpenses,
  getSummary,
  addEntry,
  totalsheet
};
