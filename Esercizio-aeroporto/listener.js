const eventBus = require('./eventBus');

// ARRIVO
eventBus.on('arrival', (data) => {
    console.log(`ARRIVO da ${data.origin} | Volo ${data.flight} alle ${data.hour}`);
});
eventBus.on('arrival', (data) => {
    console.log(`[NOTIFICA] È arrivato il volo ${data.flight}`);
});

// PARTENZA
eventBus.on('departure', (data) => {
    console.log(`PARTENZA per ${data.destination} | Volo ${data.flight} alle ${data.hour}`);
});
eventBus.on('departure', (data) => {
    console.log(`[NOTIFICA] È partito il volo ${data.flight}`);
});

// RITARDO
eventBus.on('delay', (data) => {
    console.log(`RITARDO: Volo ${data.flight} previsto per ${data.hour} - Motivo: ${data.reason}`);
});

// CANCELLAZIONE
eventBus.on('cancel', (data) => {
    console.log(`CANCELLATO: Volo ${data.flight} delle ${data.hour} - Motivo: ${data.reason}`);
});
