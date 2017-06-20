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

if($_SERVER['REQUEST_METHOD'] == 'POST') // On vérifie quelle méthode a été utilisée pour lancer la requête. Ici, si la méthode est POST, on rentre dans le if.
{
	if(!empty($_POST))
	{
		if(isset($_POST['id'])) // Si on envoie un id, on fait la requête de suppression.
		{
			$stmt = $dbh->prepare("DELETE FROM users WHERE id = :id");
			$stmt->bindParam(':id', $_POST['id']);
		}
		else // Sinon on insère un nouvel utilisateur dans la table.
		{
			$stmt = $dbh->prepare("INSERT INTO users(firstname, lastname, date_naiss, poste, date_create) VALUES(:firstname, :lastname, :date_naiss, :poste, now())");
			$stmt->bindParam(':firstname', $_POST['firstname'], PDO::PARAM_STR);
			$stmt->bindParam(':lastname', $_POST['lastname'], PDO::PARAM_STR);
			$stmt->bindParam(':date_naiss', $_POST['date_naiss'], PDO::PARAM_STR);
			$stmt->bindParam(':poste', $_POST['poste'], PDO::PARAM_STR);
			$stmt->execute();			
		}
		
		$stmt->execute();
	}
}
// Avec bindParam on peut caster les valeurs alors qu'avec bindValue on est obliger de respecter l'ordre.
// Le paramètre "PDO::PARAM_STR" n'est pas obligatoire.
elseif($_SERVER['REQUEST_METHOD'] == 'GET')
{
	if(empty($_GET))
	{
		$stmt = $dbh->prepare("SELECT * FROM users");
	}
	else
	{
		$stmt = $dbh->prepare("SELECT * FROM users WHERE id = " . $_GET['id']);
	}

	$stmt->execute();
	//echo "<pre>"; var_dump($stmt->fetchAll()); echo "</pre>";
	echo json_encode($stmt->fetchAll()); // Transforme notre tableau PHP en JSON.
}