const baseUrl = 'http://localhost:3000/api';
let currentListId = null;

// Elementi del DOM
const listSelector = document.getElementById('list-selector'); // select o sidebar per le liste
const addListForm = document.getElementById('add-list-form');
const listNameInput = document.getElementById('list-name-input');

const form = document.getElementById('todo-form');
const input = document.getElementById('note-input');
const list = document.getElementById('todo-list');
const deleteCompletedBtn = document.getElementById('delete-completed-btn');

// Carica tutte le liste
async function loadLists() {
    try {
        const res = await fetch(`${baseUrl}/lists`);
        const lists = await res.json();
        listSelector.innerHTML = '';

        lists.forEach(l => {
            const option = document.createElement('option');
            option.value = l.id;
            option.textContent = l.name;
            listSelector.appendChild(option);
        });

        // Se c'è almeno una lista, seleziona la prima
        if (lists.length > 0) {
            currentListId = lists[0].id;
            listSelector.value = currentListId;
            loadNotes(currentListId);
        }
    } catch (err) {
        console.error('Errore caricando liste:', err);
    }
}

// Carica le note per una lista specifica
async function loadNotes(listId) {
    try {
        const res = await fetch(`${baseUrl}/lists/${listId}/notes`);
        const notes = await res.json();
        list.innerHTML = '';

        notes.forEach(note => {
            const li = document.createElement('li');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = note.completed === 1;

            const span = document.createElement('span');
            span.textContent = note.text;
            if (note.completed === 1) span.classList.add('completed');

            checkbox.addEventListener('change', async () => {
                try {
                    await fetch(`${baseUrl}/notes/${note.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ completed: checkbox.checked ? 1 : 0 }),
                    });
                    span.classList.toggle('completed', checkbox.checked);
                } catch (err) {
                    console.error('Errore aggiornando completamento:', err);
                }
            });

            const editButton = document.createElement('button');
            editButton.textContent = 'Modifica';
            editButton.addEventListener('click', () => editNote(note.id, span));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Rimuovi';
            deleteButton.addEventListener('click', async () => {
                try {
                    await fetch(`${baseUrl}/notes/${note.id}`, { method: 'DELETE' });
                    li.remove();
                } catch (err) {
                    console.error('Errore rimuovendo nota:', err);
                }
            });

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(editButton);
            li.appendChild(deleteButton);
            list.appendChild(li);
        });
    } catch (err) {
        console.error('Errore caricando note:', err);
    }
}

// Aggiunta nota
form.addEventListener('submit', async e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text || !currentListId) return;

    try {
        await fetch(`${baseUrl}/lists/${currentListId}/notes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        });
        input.value = '';
        loadNotes(currentListId);
    } catch (err) {
        console.error('Errore aggiungendo nota:', err);
    }
});

// Crea nuova lista
addListForm.addEventListener('submit', async e => {
    e.preventDefault();
    const name = listNameInput.value.trim();
    if (!name) return;

    try {
        await fetch(`${baseUrl}/lists`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
        });
        listNameInput.value = '';
        loadLists();
    } catch (err) {
        console.error('Errore aggiungendo lista:', err);
    }
});

// Cambio lista
listSelector.addEventListener('change', e => {
    currentListId = e.target.value;
    loadNotes(currentListId);
});

// Elimina completate nella lista corrente
deleteCompletedBtn.addEventListener('click', async () => {
    if (!currentListId) return;
    try {
        await fetch(`${baseUrl}/lists/${currentListId}/notes/completed`, {
            method: 'DELETE'
        });
        loadNotes(currentListId);
    } catch (err) {
        console.error('Errore eliminando note completate:', err);
    }
});

// Modifica nota
function editNote(id, spanElement) {
    const li = spanElement.parentElement;
    const currentText = spanElement.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Salva';

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Annulla';

    function restore() {
        input.replaceWith(spanElement);
        saveButton.remove();
        cancelButton.remove();
    }

    saveButton.addEventListener('click', async () => {
        const newText = input.value.trim();
        if (!newText) return;
        try {
            await fetch(`${baseUrl}/notes/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: newText }),
            });
            spanElement.textContent = newText;
            restore();
        } catch (err) {
            console.error('Errore salvando modifica:', err);
        }
    });

    cancelButton.addEventListener('click', restore);

    input.addEventListener('keydown', e => {
        if (e.key === 'Escape') restore();
        else if (e.key === 'Enter') saveButton.click();
    });

    spanElement.replaceWith(input);
    li.appendChild(saveButton);
    li.appendChild(cancelButton);
    input.focus();
}

// Rimozione di una lista

const deleteBtn = document.getElementById('delete-list-btn');
const modal = document.getElementById('delete-modal');
const modalSelector = document.getElementById('modal-list-selector');
const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
const cancelDeleteBtn = document.getElementById('cancel-delete-btn');

deleteBtn.addEventListener('click', () => {
    // Popola il select del modale escludendo la lista "Default"
    modalSelector.innerHTML = '';

    Array.from(listSelector.options).forEach(opt => {
        if (opt.textContent !== 'Default') {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.textContent;
            modalSelector.appendChild(option);
        }
    });

    confirmDeleteBtn.disabled = modalSelector.options.length === 0;

    modal.classList.remove('hidden');
});

cancelDeleteBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
});

modalSelector.addEventListener('change', () => {
    confirmDeleteBtn.disabled = !modalSelector.value;
});

confirmDeleteBtn.addEventListener('click', async () => {
    const listToDeleteId = modalSelector.value;
    const listToDeleteName = modalSelector.options[modalSelector.selectedIndex].textContent;

    if (!listToDeleteId) return;

    if (confirm(`Sei sicuro di voler eliminare la lista "${listToDeleteName}"?`)) {
        try {
            const res = await fetch(`${baseUrl}/lists/${listToDeleteId}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Errore eliminando lista');

            alert(`Lista "${listToDeleteName}" eliminata.`);

            // Rimuovi la lista dalla select principale
            const optionToRemove = listSelector.querySelector(`option[value="${listToDeleteId}"]`);
            if (optionToRemove) optionToRemove.remove();

            // Rimuovi dal modale
            modalSelector.querySelector(`option[value="${listToDeleteId}"]`)?.remove();

            confirmDeleteBtn.disabled = modalSelector.options.length === 0;

            // Se la lista cancellata era la corrente, aggiorna currentListId e carica un’altra lista o niente
            if (currentListId === listToDeleteId) {
                if (listSelector.options.length > 0) {
                    currentListId = listSelector.options[0].value;
                    listSelector.value = currentListId;
                    loadNotes(currentListId);
                } else {
                    currentListId = null;
                    list.innerHTML = '';
                }
            }

            modal.classList.add('hidden');
        } catch (err) {
            alert(err.message);
        }
    }
});


// Avvia tutto al caricamento
loadLists();
