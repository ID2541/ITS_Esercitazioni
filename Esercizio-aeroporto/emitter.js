const eventBus = require('./eventBus');

// Lista degli eventi da eseguire
const eventi = [
    { type: 'arrival', origin: 'Roma', hour: '08:30', flight: 'AZ123' },
    { type: 'departure', destination: 'Parigi', hour: '09:00', flight: 'AF456' },
    { type: 'delay', flight: 'AF456', hour: '09:00', reason: 'Maltempo' },
    { type: 'cancel', flight: 'AZ123', hour: '08:30', reason: 'Problema tecnico' },
];

// Funzione che emette tutti gli eventi
function emettiEventi() {
    eventi.forEach((evento) => {
        eventBus.emit(evento.type, evento);
    });
}

module.exports = { emettiEventi };
