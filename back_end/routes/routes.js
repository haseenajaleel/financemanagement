const express = require('express');
const users = require('../models/loginmodel');
const rout = express.Router();

const {
  createuser,
  login,
  addIncome,
  addExpenses,
  getSummary,
  addEntry,
  totalsheet
} = require('../controller/control');

// ✅ API routes
rout.post('/register', createuser);
rout.post('/login', login);
rout.post('/income', addIncome);
rout.post('/expenses', addExpenses);
rout.post('/addEntry', addEntry);
rout.get('/summary/:userId', getSummary);
rout.get('/entries/:userId', totalsheet);

// ✅ Admin route to check all users
rout.get('/users', async (req, res) => {
  const allUsers = await users.find();
  res.json(allUsers);
});

// ✅ Route to migrate incomes and expenses into entries[]
rout.get('/migrate-entries', async (req, res) => {
  try {
    const allUsers = await users.find();

    for (const user of allUsers) {
      const entries = [];

      (user.incomes || []).forEach(i => {
        entries.push({
          category: 'Income',
          type: i.source,
          amount: i.amount,
          date: i.date,
        });
      });

      (user.expenses || []).forEach(e => {
        entries.push({
          category: 'Expense',
          type: e.category,
          amount: e.amount,
          date: e.date,
        });
      });

      await users.findByIdAndUpdate(user._id, { $set: { entries } });
      console.log(`✅ Migrated entries for user: ${user.name}`);
    }

    res.json({ message: '✅ All users migrated successfully' });
  } catch (err) {
    console.error('❌ Migration failed:', err);
    res.status(500).json({ message: 'Migration failed', error: err.message });
  }
});

module.exports = rout;
