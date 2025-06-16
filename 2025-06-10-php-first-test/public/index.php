<?php
// Variabili PHP di esempio
$titolo = "Benvenuto nella mia pagina PHP";
$nome_utente = "Mario Rossi";
$data_corrente = date("d/m/Y H:i:s");
$colori = ["Rosso", "Verde", "Blu", "Giallo", "Viola"];
$contatore_visite = rand(100, 999);

// Gestione form semplice
$messaggio = "";
if ($_POST['nome'] ?? false) {
    $nome_inserito = htmlspecialchars($_POST['nome']);
    $messaggio = "Ciao " . $nome_inserito . "! Grazie per aver visitato la pagina.";
}
?>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $titolo; ?></title>
    <link rel="stylesheet" href="./css/style.css">
    <!-- Se il CSS non si carica, prova con questo percorso alternativo: -->
    <!-- <link rel="stylesheet" href="/css/style.css"> -->
</head>
<body>
    <div class="container">
        <h1><?php echo $titolo; ?></h1>
        
        <div class="info-box">
            <h2>Informazioni Server</h2>
            <p><strong>Data e ora corrente:</strong> <?php echo $data_corrente; ?></p>
            <p><strong>Versione PHP:</strong> <?php echo phpversion(); ?></p>
            <p><strong>Utente corrente:</strong> <?php echo $nome_utente; ?></p>
            <p><strong>Visite simulate:</strong> <?php echo $contatore_visite; ?></p>
        </div>

        <h2>Lista Colori Dinamica</h2>
        <p>Ecco una lista generata dinamicamente con PHP:</p>
        <ul>
            <?php foreach ($colori as $indice => $colore): ?>
                <li>Colore #<?php echo $indice + 1; ?>: 
                    <span style="color: <?php echo strtolower($colore); ?>; font-weight: bold;">
                        <?php echo $colore; ?>
                    </span>
                </li>
            <?php endforeach; ?>
        </ul>

        <div class="form-box">
            <h2>Form di Esempio</h2>
            <?php if ($messaggio): ?>
                <div class="success"><?php echo $messaggio; ?></div>
            <?php endif; ?>
            
            <form method="POST" action="">
                <label for="nome">Inserisci il tuo nome:</label>
                <input type="text" id="nome" name="nome" placeholder="Il tuo nome..." required>
                <input type="submit" value="Invia">
            </form>
        </div>

        <h2>Calcolo Dinamico</h2>
        <div class="info-box">
            <?php
            $numero1 = 15;
            $numero2 = 27;
            $somma = $numero1 + $numero2;
            $prodotto = $numero1 * $numero2;
            ?>
            <p><strong>Esempio di calcoli:</strong></p>
            <p><?php echo $numero1; ?> + <?php echo $numero2; ?> = <?php echo $somma; ?></p>
            <p><?php echo $numero1; ?> × <?php echo $numero2; ?> = <?php echo $prodotto; ?></p>
        </div>

        <h2>Condizioni PHP</h2>
        <p>
            <?php
            $ora = date('H');
            if ($ora < 12) {
                echo "🌅 Buongiorno! È mattina.";
            } elseif ($ora < 18) {
                echo "☀️ Buon pomeriggio! È pomeriggio.";
            } else {
                echo "🌙 Buonasera! È sera.";
            }
            ?>
        </p>

        <footer style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666;">
            <p>Pagina generata con PHP il <?php echo date("d/m/Y"); ?> alle <?php echo date("H:i"); ?></p>
        </footer>
    </div>
</body>
</html>