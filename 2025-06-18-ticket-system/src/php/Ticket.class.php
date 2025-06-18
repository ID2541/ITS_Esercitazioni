<?php
class Ticket
{
    private $id;
    private $username;
    private $category;
    private $description;
    private $createdAt;

    public function __construct($username, $category, $description)
    {
        $this->id = uniqid("ticket_", true);
        $this->username = $username;
        $this->category = $category;
        $this->description = $description;
        $this->createdAt = new DateTime();
    }

    public function validate()
    {
        $errors = [];

        if (empty($this->username)) {
            $errors[] = "Il nome utente è obbligatorio.";
        }

        if (empty($this->category)) {
            $errors[] = "La categoria è obbligatoria.";
        }

        if (empty($this->description)) {
            $errors[] = "La descrizione è obbligatoria.";
        } elseif (mb_strlen($this->description) < 10) {
            $errors[] = "La descrizione deve contenere almeno 10 caratteri.";
        }

        return $errors;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getUsername()
    {
        return $this->username;
    }

    public function getCategory()
    {
        return $this->category;
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function getCreatedAt()
    {
        return $this->createdAt;
    }
}
