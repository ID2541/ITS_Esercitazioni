const apiUrl = 'http://localhost:3000/api/notes'; // URL base per le API del backend

const form = document.getElementById('todo-form'); // form per aggiungere nuove note
const input = document.getElementById('note-input'); // campo di testo per la nuova nota
const list = document.getElementById('todo-list');   // lista HTML dove mostrare le note

// Funzione per caricare le note dal backend e mostrarle nella lista
async function loadNotes() {
    try {
        // Chiamata GET per ottenere tutte le note dal backend
        const res = await fetch(apiUrl);
        const notes = await res.json();

        // Svuoto la lista prima di aggiungere gli elementi aggiornati
        list.innerHTML = '';

        // Ciclo sulle note ricevute e le aggiungo alla lista
        notes.forEach(note => {
            const li = document.createElement('li'); // creo un elemento lista
            const checkbox = document.createElement('input'); // creo la checkbox
            checkbox.type = 'checkbox'; // tipo checkbox
            checkbox.checked = note.completed === 1; // spunta checkbox se la nota è completata

            // Evento per aggiornare lo stato completed al cambio della checkbox
            checkbox.addEventListener('change', () => toggleComplete(note.id, checkbox.checked));

            const span = document.createElement('span'); // testo della nota
            span.textContent = note.text;

            // Aggiungo checkbox e testo dentro l'elemento lista
            li.appendChild(checkbox);
            li.appendChild(span);

            // Aggiungo l'elemento lista alla lista principale in pagina
            list.appendChild(li);
        });
    } catch (err) {
        console.error('Errore caricando note:', err);
    }
}

// Evento submit del form per aggiungere una nuova nota
form.addEventListener('submit', async e => {
    e.preventDefault(); // prevengo il comportamento di default (ricarica pagina)
    const text = input.value.trim(); // testo inserito, senza spazi ai lati
    if (!text) return; // non procedo se campo vuoto

    try {
        // Chiamata POST per inserire la nuova nota nel DB
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }), // invio il testo nel body in formato JSON
        });
        input.value = ''; // pulisco il campo di input
        loadNotes();      // ricarico la lista per mostrare la nuova nota
    } catch (err) {
        console.error('Errore aggiungendo nota:', err);
    }
});

// Funzione per aggiornare lo stato "completed" di una nota nel backend
async function toggleComplete(id, completed) {
    try {
        // Chiamata PUT per aggiornare la proprietà completed della nota con id specificato
        await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed }), // invio lo stato aggiornato
        });
        loadNotes(); // ricarico la lista per aggiornare la UI
    } catch (err) {
        console.error('Errore aggiornando nota:', err);
    }
}

const deleteCompletedBtn = document.getElementById('delete-completed-btn'); // bottone per eliminare note completate

// Evento click sul bottone per eliminare tutte le note completate
deleteCompletedBtn.addEventListener('click', async () => {
    try {
        // Chiamata DELETE per eliminare tutte le note completate dal backend
        const res = await fetch('http://localhost:3000/api/notes/completed', {
            method: 'DELETE',
        });
        const data = await res.json();
        console.log(data.message);

        // Aggiorno immediatamente il DOM rimuovendo tutte le note checkate dalla lista
        const todoList = document.getElementById('todo-list');
        const items = todoList.querySelectorAll('li');

        items.forEach(li => {
            const checkbox = li.querySelector('input[type="checkbox"]');
            if (checkbox.checked) {
                li.remove(); // rimuovo dal DOM la nota completata
            }
        });

    } catch (error) {
        console.error('Errore durante la cancellazione delle note completate:', error);
    }
});

// Carico e mostro le note appena la pagina viene caricata
loadNotes();
