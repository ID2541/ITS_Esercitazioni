const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'myuser',
    password: 'mypass',
    database: 'mydb',
});

app.get('/api/contacts/list', (req, res) => {
    const query = "SELECT * FROM users";
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching contacts:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Test connection
db.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

app.listen(3000, () => console.log('Server listening on http://localhost:3000'));

console.log("Funzionaaa! Ho inventato qualcosa che funziona!!!");

app.post('/api/contacts/add', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const insertQuery = `INSERT INTO users (name, email) VALUES (${name}, ${email})`;
    db.query(insertQuery, (err, results) => {
        if (err) {
            console.error('Error fetching contacts:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});