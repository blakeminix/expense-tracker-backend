const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/api/expenses', async (req, res) => {
  const { amount, note, category, date, userEmail } = req.body;
  const newExpense = {
    amount: amount,
    note: note,
    category: category,
    date: date,
    userEmail: userEmail,
  };
  try {
    console.log(newExpense);
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add expense' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
