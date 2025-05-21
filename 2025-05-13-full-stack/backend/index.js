console.log('Ciaoooooo'); // Messaggio di debug all'avvio

const express = require('express');
const cors = require('cors');
const app = express();

// Middleware per leggere JSON e abilitare CORS
app.use(express.json());
app.use(cors());

// Endpoint POST sulla root "/"
app.post('/', (req, res) => {
    res.json({
        id: 1,
        name: 'John Doe',
        email: 'email@mail.com',
        request: req.body  // Mostra anche i dati ricevuti
    });
});

// Endpoint GET "/about"
app.get('/about', (req, res) => {
    res.json({
        id: 1,
        name: 'John Doe',
        email: 'email@mail.com'
    });
});

// Avvia il server sulla porta 3000
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
