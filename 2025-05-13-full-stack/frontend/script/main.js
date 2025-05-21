// Funzione generica per effettuare richieste HTTP con fetch
async function apiRequest(url, method = 'GET', data = null, headers = {}) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    };

    // Se il metodo non è GET, aggiunge il corpo della richiesta
    if (method !== 'GET' && data) {
        options.body = JSON.stringify(data);
    }

    // Se è una GET e ci sono dati, aggiunge i parametri all'URL
    if (method === 'GET' && data) {
        const params = new URLSearchParams(data).toString();
        url += '?' + params;
    }

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API request error', error);
        throw error;
    }
}

// Seleziona il bottone e aggiunge un listener per il click
const tasto = document.querySelector('#tasto');
tasto.addEventListener('click', async () => {
    // Recupera i valori dai campi di input
    const nome = document.querySelector('#nome').value;
    const messaggio = document.querySelector('#messaggio').value;

    // Chiamata API GET verso /about (esempio)
    const response = await apiRequest('http://localhost:3000/about', 'GET', {
        page: 2
    });

    // Crea il div di risultato se non esiste
    let risultatoDiv = document.querySelector('#risultato');
    if (!risultatoDiv) {
        risultatoDiv = document.createElement('div');
        risultatoDiv.id = 'risultato';
        risultatoDiv.className = 'alert alert-success mt-4';
        document.querySelector('.container').appendChild(risultatoDiv);
    }

    // Mostra il messaggio all'utente
    risultatoDiv.innerHTML = `Io sono <strong>${nome}</strong> e il mio messaggio è questo: <em>${messaggio}</em>`;
});

// Esempio di chiamata POST per login
apiRequest('http://localhost:3000', 'POST', {
    username: 'John Doe',
    password: 'password123'
})
    .then(data => console.log('Login success:', data))
    .catch(error => console.error(error));

// Chiamata GET automatica all'avvio per testare l'endpoint /about
apiRequest('http://localhost:3000/about', 'GET', {
    page: 2
})
    .then(data => console.log('Users:', data))
    .catch(error => console.error(error));
