<?php
require_once 'Ticket.class.php';

$errors = [];
$success = false;
$ticket = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $category = trim($_POST['category'] ?? '');
    $description = trim($_POST['description'] ?? '');

    $ticket = new Ticket($username, $category, $description);
    $errors = $ticket->validate();

    if (empty($errors)) {
        $success = true;
    }
}

// Categorie leggibili
$categories = [
    'bug' => 'Bug',
    'richiesta' => 'Richiesta',
    'supporto_tecnico' => 'Supporto Tecnico',
    'miglioramento' => 'Miglioramento',
    'altro' => 'Altro'
];

// Output HTML
?>
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Risultato Invio Ticket</title>
    <link rel="stylesheet" href="http://localhost:8080/css/main.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Risultato Invio Ticket</h1>
        </header>
        <main>
            <?php if ($success): ?>
                <div class="success-message">
                    <h2>✅ Ticket inviato con successo!</h2>
                    <div class="ticket-details">
                        <h3>Dettagli del ticket:</h3>
                        <div class="detail-row"><strong>ID Ticket:</strong> <span><?= htmlspecialchars($ticket->getId()); ?></span></div>
                        <div class="detail-row"><strong>Nome utente:</strong> <span><?= htmlspecialchars($ticket->getUsername()); ?></span></div>
                        <div class="detail-row"><strong>Categoria:</strong> <span><?= htmlspecialchars($categories[$ticket->getCategory()] ?? $ticket->getCategory()); ?></span></div>
                        <div class="detail-row"><strong>Descrizione:</strong> <span><?= nl2br(htmlspecialchars($ticket->getDescription())); ?></span></div>
                        <div class="detail-row"><strong>Data creazione:</strong> <span><?= $ticket->getCreatedAt()->format('d/m/Y H:i:s'); ?></span></div>
                    </div><br>
                    <p>Grazie per aver inviato il tuo ticket. Il nostro team lo esaminerà al più presto.</p>
                    <p>Per ulteriori richieste, puoi inviare un nuovo ticket.</p><br>
                    <a href="http://localhost:8080/index.html" class="btn btn-primary">Invia nuovo ticket</a>
                </div>
            <?php else: ?>
                <div class="error-message">
                    <h3>⚠️ Errore nell’invio del ticket:</h3>
                    <ul>
                        <?php foreach ($errors as $error): ?>
                            <li><?= htmlspecialchars($error); ?></li>
                        <?php endforeach; ?>
                    </ul>
                    <a href="http://localhost:8080/index.html" class="btn btn-secondary">Torna al modulo</a>
                </div>
            <?php endif; ?>
        </main>
    </div>
</body>
</html>
