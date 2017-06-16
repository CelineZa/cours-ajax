<?php

// On se connecte à la base de données "baseajax"
$pdo = new PDO('mysql:host=localhost;dbname=baseajax','root','', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING, PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));

if($_POST)
{
	$req = $pdo->prepare("INSERT INTO users(firstname, lastname, date_naiss, poste, date_create) VALUES(:firstname, :lastname, :date_naiss, :poste, NOW())");

	$req->bindValue(':firstname', $_POST['firstname'], PDO::PARAM_STR);
	$req->bindValue(':lastname', $_POST['lastname'], PDO::PARAM_STR);
	$req->bindValue(':date_naiss', $_POST['date_naiss'], PDO::PARAM_STR);
	$req->bindValue(':poste', $_POST['poste'], PDO::PARAM_STR);

	$req->execute();

	echo "Les données ont bien été ajoutées à la BDD";
}