const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res, next) => {
    console.log('Processing request for /');
    next();
});

app.get('/', (req, res) => {
    res.send('Hello, home page!');
});

app.get('/about', (req, res) =>{
    res.send('This is the about page');
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})