const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4200;
const username='romakumari9430';
const password='cBcEmRTyP7Ulh2TQ';




// Connect to MongoDB
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.tppshyd.mongodb.net/moneyTrackerDB`,
{ useNewUrlParser: true, useUnifiedTopology: true });

// Create MongoDB schema and model
const expenseSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});
const Expense = mongoose.model('Expense', expenseSchema);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/index', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});




// API to get all expenses
app.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API to add a new expense
app.post('/expenses', async (req, res) => {
  const { description, amount } = req.body;

  try {
    const newExpense = new Expense({ description, amount });
    await newExpense.save();
    res.json(newExpense);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
