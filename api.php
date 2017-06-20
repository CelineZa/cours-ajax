<?php

//sleep(15); //Fonction qui veut dire : "Tu te mets en pause". Le code ci-dessous ne s'exécutera pas avant 15 secondes.

try{
	$dbh = new PDO('mysql:host=localhost;dbname=baseajax','root','');
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
}
catch(PDOException $e){
	echo 'Connexion impossible. Message error :'.$e;
}
// Le try/catch permet d'enlever le "Fatal Error".

if(!empty($_POST))
{
	$stmt = $dbh->prepare("INSERT INTO users(firstname, lastname, date_naiss, poste, date_create) VALUES(:firstname, :lastname, :date_naiss, :poste, now())");
	$stmt->bindParam(':firstname', $_POST['firstname'], PDO::PARAM_STR);
	$stmt->bindParam(':lastname', $_POST['lastname'], PDO::PARAM_STR);
	$stmt->bindParam(':date_naiss', $_POST['date_naiss'], PDO::PARAM_STR);
	$stmt->bindParam(':poste', $_POST['poste'], PDO::PARAM_STR);
	$stmt->execute();
}

// Avec bindParam on peut caster les valeurs alors qu'avec bindValue on est obliger de respecter l'ordre.
// Le paramètre "PDO::PARAM_STR" n'est pas obligatoire.