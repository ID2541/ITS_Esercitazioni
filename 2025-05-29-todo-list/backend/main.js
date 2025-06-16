const express = require('express'); // Framework web per Node.js
const mysql = require('mysql2');    // Driver MySQL per Node.js
const cors = require('cors');       // Middleware per abilitare CORS (Cross-Origin Resource Sharing)

const app = express();              // Creo l'app Express
app.use(cors());                   // Abilito CORS per permettere richieste da frontend su un dominio differente
app.use(express.json());           // Abilito parsing JSON per il corpo delle richieste

// Configurazione e connessione al database MySQL
const db = mysql.createConnection({
    host: '127.0.0.1',   // indirizzo del server DB (locale)
    user: 'myuser',      // utente DB
    password: 'mypass',  // password DB
    database: 'mydb',    // nome del database da usare
});

// Connessione al DB con gestione errori
db.connect(err => {
    if (err) {
        console.error('Errore connessione DB:', err);
        process.exit(1);  // Se c'è un errore, esco dal processo Node
    }
    console.log('Connesso a MySQL');
});

// Endpoint GET per ottenere tutte le note ordinate per id decrescente
app.get('/api/notes', (req, res) => {
    const sql = 'SELECT * FROM notes ORDER BY id DESC';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Errore DB' });
        }
        res.json(results); // Invio al client la lista delle note
    });
});

// Endpoint POST per aggiungere una nuova nota
app.post('/api/notes', (req, res) => {
    const { text } = req.body;      // Estraggo il testo della nota dal corpo della richiesta
    if (!text) return res.status(400).json({ error: 'Testo obbligatorio' }); // Validazione semplice

    const sql = 'INSERT INTO notes (text, completed) VALUES (?, 0)'; // Query SQL per inserire nuova nota (completed default 0)
    db.query(sql, [text], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Errore DB' });
        }
        // Risposta con id della nota inserita e dati
        res.status(201).json({ id: result.insertId, text, completed: 0 });
    });
});

// Endpoint DELETE per cancellare tutte le note completate
app.delete('/api/notes/completed', (req, res) => {
    const deleteQuery = 'DELETE FROM notes WHERE completed = 1'; // Cancella note con completed=1
    db.query(deleteQuery, (err, results) => {
        if (err) {
            console.error('Error deleting completed notes:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        // Risposta con messaggio e numero di righe cancellate
        res.json({ message: 'Completed notes deleted', affectedRows: results.affectedRows });
    });
});

// Endpoint PUT per aggiornare lo stato completamento di una nota specifica
app.put('/api/notes/:id', (req, res) => {
    const id = req.params.id;                // id della nota dalla URL
    const { completed } = req.body;          // nuovo stato completamento dalla richiesta
    const completedNum = completed ? 1 : 0;  // converto boolean in intero (MySQL usa 0/1)

    const sql = 'UPDATE notes SET completed = ? WHERE id = ?'; // query aggiornamento
    db.query(sql, [completedNum, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Errore DB' });
        }
        if (result.affectedRows === 0) // Se nessuna riga aggiornata, id non trovato
            return res.status(404).json({ error: 'Nota non trovata' });

        res.json({ id, completed: completedNum }); // Invio conferma aggiornamento
    });
});

// Avvio del server sulla porta 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server backend attivo su http://localhost:${PORT}`);
});
