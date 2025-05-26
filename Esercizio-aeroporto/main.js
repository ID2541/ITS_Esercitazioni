// Registra i listener
require('./listener');

// Avvia gli eventi
const { emettiEventi } = require('./emitter');
emettiEventi();
