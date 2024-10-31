const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',      // Your host, if local then 'localhost'
  user: 'root',           // Your MySQL username
  password: '',           // Your MySQL password
  database: 'ecommerce_db' // Your database name
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Contact Route
app.post('/contact', (req, res) => {
  const { firstname, lastname, email, message } = req.body;
  const query = 'INSERT INTO contact (firstname, lastname, email, message) VALUES (?, ?, ?, ?)';
  db.query(query, [firstname, lastname, email, message], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send('Contact saved successfully');
  });
});

// Checkout Route
app.post('/checkout', (req, res) => {
  const { product, quantity, price } = req.body;
  const query = 'INSERT INTO checkout (product, quantity, price) VALUES (?, ?, ?)';
  db.query(query, [product, quantity, price], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send('Checkout data saved successfully');
  });
});

// Server Listen
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
