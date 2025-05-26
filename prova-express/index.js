/*Usando il modulo "express", creare con npm un progetto con un server che ascolta sulla porta 3000 e risponde sul brouser con una pagina HTML con un titolo <h1> e del contenuto.HTML

Il sistema logga qualsiasi richiesta in console.log

Se la route è '/' il titolo è "home page" e il contenuto è "Benvenuto nella home page!".
Se la route è '/user', eventualmente seguito da un subpath, il titolo è "User: <username>" con <username> preso tramite parapmetro GET dal browser. 
Il testo della pagina ssarà un testo informativo che dice che l'user <username> ha chiamato l'url <url>, 
indicando il path chiamato.

Se la route è '/settings', il titolo è "Settings" e il contenuto è l'oggetto passato via GET.
*/


const express = require('express');
const app = express();
const port = 3000;

// Middleware per loggare ogni richiesta
app.use((req, res, next) => {
    console.log('Richiesta ricevuta:', req.method, req.url);
    next();
});

// Rotta principale "/"
app.get('/', (req, res) => {
    res.write('<h1>Home Page</h1>');
    res.write('<p>Benvenuto nella home page!</p>');
    res.write('<p>Per visitare la pagina utente, vai a <a href="/user/login?username=tuo_nome">/user/login?username=tuo_nome</a></p>');
    res.write('<p>Per visitare le impostazioni, vai a <a href="/settings?param1=valore1&param2=valore2">/settings?param1=valore1&param2=valore2</a></p>');
    res.end();
});

// Rotta "/user"
app.use('/user', (req, res, next) => {
    const username = req.query.username || 'ospite';
    res.write(`<h1>User: ${username}</h1>`);
    res.write(`<p>L'user ${username} ha chiamato l'URL: ${req.originalUrl}</p>`);
    next();
});

app.get('/user/login', (req, res) => {
    const username = req.query.username || 'ospite';
    res.write(`<p>Benvenuto, ${username}! Sei ora loggato.</p>`);
    res.write(`<a href="/user/logout?username=tuo_nome">logout</a>`);
    res.write('<p>Per visitare le impostazioni, vai a <a href="/settings?param1=valore1&param2=valore2">/settings?param1=valore1&param2=valore2</a></p>');
    res.write('<p>Per tornare alla home page, vai a <a href="/">Home</a></p>');
    res.end();
});

app.get('/user/logout', (req, res) => {
    const username = req.query.username || 'ospite';
    res.write(`<p>Arrivederci, ${username}!</p>`);
    res.write(`<a href="/user/login?username=tuo_nome">login</a>`);
    res.write('<p>Per visitare le impostazioni, vai a <a href="/settings?param1=valore1&param2=valore2">/settings?param1=valore1&param2=valore2</a></p>');
    res.write('<p>Per tornare alla home page, vai a <a href="/">Home</a></p>');
    res.end();
});

// Rotta "/settings"
app.get('/settings', (req, res) => {
    res.write('<h1>Settings</h1>');
    res.write('<p>Dati ricevuti:</p>');
    res.write(`${JSON.stringify(req.query)}`);
    res.write('<p>Per tornare alla home page, vai a <a href="/">Home</a></p>');
    res.end();
});

// Avvio del server
app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});
