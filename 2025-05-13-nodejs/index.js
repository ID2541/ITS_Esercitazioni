const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/about', (req, res) => res.send('questo è un backend di prova in nodejs'));

app.get('/greet', (req, res) => {
    const name = req.query.name || "stranger";
    res.send(`hi ${name}, welcome to this server`);
});

app.get('/user/info', (req, res) => {
    res.json({
        id: 45,
        name: "Carolina",
        mail: "carolina@example.com"
    });
});

app.post('/echo', (req, res) => {
    console.log("Received", req.body);
    res.json({
        status: "ok",
        request: req.body
    });
});

app.listen(1234, () => {
    console.log('Server is running on http://localhost:1234');
}
);

