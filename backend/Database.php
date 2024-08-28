<?php

class Database
{
  private $type;
  private $host;
  private $database;
  private $username;
  private $password;

  public function __construct($type, $host, $database, $username, $password)
  {
    $this->type = $type;
    $this->host = $host;
    $this->database = $database;
    $this->username = $username;
    $this->host = $host;
  }
  public function connect()
  {
    return new PDO("$this->type:host=$this->host;dbname=$this->database", $this->username, $this->password);
  }
}
