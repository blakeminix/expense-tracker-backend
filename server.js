const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const uri = process.env.URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let expensesCollection;

async function connectToDatabase() {
  try {
    await client.connect();
    const database = client.db('ExpenseTracker');
    expensesCollection = database.collection('expenses');
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

connectToDatabase();

app.use(bodyParser.json());
app.use(cors());

app.post('/api/expenses', async (req, res) => {
  const { amount, note, category, date, userEmail } = req.body;
  const newExpense = {
    amount,
    note,
    category,
    date,
    userEmail,
  };
  try {
    const result = await expensesCollection.insertOne(newExpense);
    res.status(201).json({ message: 'Expense added', expense: newExpense });
  } catch (error) {
    res.status(400).json({ error: 'Failed to add expense' });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
