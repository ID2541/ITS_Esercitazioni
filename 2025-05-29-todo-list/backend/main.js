// backend/main.js

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connessione al database
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'myuser',
    password: 'mypass',
    database: 'mydb',
});

db.connect(err => {
    if (err) {
        console.error('Errore connessione DB:', err);
        process.exit(1);
    }
    console.log('Connesso a MySQL');
});

// =================== GESTIONE LISTE =================== //

// Ottieni tutte le liste
app.get('/api/lists', (req, res) => {
    const sql = 'SELECT * FROM lists ORDER BY id';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Errore DB' });
        res.json(results);
    });
});

// Crea una nuova lista
app.post('/api/lists', (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Nome lista obbligatorio' });

    const sql = 'INSERT INTO lists (name) VALUES (?)';
    db.query(sql, [name], (err, result) => {
        if (err) return res.status(500).json({ error: 'Errore DB' });
        res.status(201).json({ id: result.insertId, name });
    });
});

// ** ELIMINA UNA LISTA (con controllo Default) **
app.delete('/api/lists/:id', (req, res) => {
    const listId = req.params.id;

    // Verifica se la lista esiste e ne recupera il nome
    const sqlCheck = 'SELECT name FROM lists WHERE id = ?';
    db.query(sqlCheck, [listId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Errore DB' });

        if (results.length === 0) {
            return res.status(404).json({ error: 'Lista non trovata' });
        }

        const listName = results[0].name;
        if (listName === 'Default') {
            return res.status(403).json({ error: 'La lista Default non può essere eliminata' });
        }

        // Elimina prima le note associate
        const sqlDeleteNotes = 'DELETE FROM notes WHERE list_id = ?';
        db.query(sqlDeleteNotes, [listId], (err2) => {
            if (err2) return res.status(500).json({ error: 'Errore DB durante eliminazione note' });

            // Elimina la lista
            const sqlDeleteList = 'DELETE FROM lists WHERE id = ?';
            db.query(sqlDeleteList, [listId], (err3, result) => {
                if (err3) return res.status(500).json({ error: 'Errore DB durante eliminazione lista' });

                res.json({ message: 'Lista eliminata con successo' });
            });
        });
    });
});

// =================== GESTIONE NOTE =================== //

// Ottieni tutte le note per una lista specifica
app.get('/api/lists/:listId/notes', (req, res) => {
    const listId = req.params.listId;
    const sql = 'SELECT * FROM notes WHERE list_id = ? ORDER BY id DESC';
    db.query(sql, [listId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Errore DB' });
        res.json(results);
    });
});

// Aggiungi una nuova nota a una lista specifica
app.post('/api/lists/:listId/notes', (req, res) => {
    const listId = req.params.listId;
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Testo obbligatorio' });

    const sql = 'INSERT INTO notes (text, completed, list_id) VALUES (?, 0, ?)';
    db.query(sql, [text, listId], (err, result) => {
        if (err) return res.status(500).json({ error: 'Errore DB' });
        res.status(201).json({ id: result.insertId, text, completed: 0, list_id: parseInt(listId) });
    });
});

// Elimina una nota specifica
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM notes WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Errore DB' });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Nota non trovata' });
        res.json({ message: 'Nota eliminata' });
    });
});

// Elimina tutte le note completate di una lista specifica
app.delete('/api/lists/:listId/notes/completed', (req, res) => {
    const listId = req.params.listId;
    const sql = 'DELETE FROM notes WHERE completed = 1 AND list_id = ?';
    db.query(sql, [listId], (err, result) => {
        if (err) return res.status(500).json({ error: 'Errore DB' });
        res.json({ message: 'Note completate eliminate', affectedRows: result.affectedRows });
    });
});

// Modifica testo o stato completamento di una nota
app.put('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const { text, completed } = req.body;

    if (text !== undefined) {
        const sql = 'UPDATE notes SET text = ? WHERE id = ?';
        db.query(sql, [text, id], (err, result) => {
            if (err) return res.status(500).json({ error: 'Errore DB' });
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Nota non trovata' });
            res.json({ message: 'Testo nota aggiornato' });
        });
    } else if (completed !== undefined) {
        const sql = 'UPDATE notes SET completed = ? WHERE id = ?';
        db.query(sql, [completed, id], (err, result) => {
            if (err) return res.status(500).json({ error: 'Errore DB' });
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Nota non trovata' });
            res.json({ message: 'Stato completamento aggiornato' });
        });
    } else {
        res.status(400).json({ error: 'Nessun campo valido per aggiornamento' });
    }
});

// Avvio del server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server backend attivo su http://localhost:${PORT}`);
});
