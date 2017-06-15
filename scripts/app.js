$(function(){
	//alert('ok');

	let images=["images/01.jpg","images/02.jpg","images/03.jpg","images/04.jpg"];
	let index = 0;

	setInterval(function(){
		if(index == images.length) // Si l'index est égal à la taille du tableau = si on est arrivé à la dernière image.
			index = 0;

		$('#sliderImage').attr("src",images[index]); // Modification source image via array.

		index++; // On incrémente l'index.
	},3000);


	// Récupérer le nom des utilisateurs dans un fichier JSON et les ajouter dans une liste. 
	var request = $.ajax({
	  url: "https://jsonplaceholder.typicode.com/users", // Obligatoire
	  method: "GET", // Obligatoire
	  dataType: "json" // Optionnel
	});
	
	request.done(function(data) { // data = toutes les données renvoyées par la requête
		var content = "";

		data.forEach(function(element){
			//console.log(element);
			content += '<li id="utilisateur-'+element.id+'"><a href="">'+element.name+'</a></li>';

		});

		$("#categorie").html(content);

		// Afficher l'id et l'email dans un console.info() lorsque l'on clique sur un noms
		$("#right_column ul > li").click(function(e){
			e.preventDefault();
			//console.log(data);

			var id_utilisateur = $(this).attr("id");
			console.log(id_utilisateur.split("-"));
			id_utilisateur = id_utilisateur.split("-"); // Coupe l'id à partir du tiret. Ici le résultat est : array("utilisateur", "1")

			var ficheUser = $.ajax({
			  url: "https://jsonplaceholder.typicode.com/users",
			  method: "GET",
			  data: { id : id_utilisateur[1] }, //On récupère l'id qui est à l'indice [1] du tableau id_utilisateur.
			  dataType: "json"
			});

			ficheUser.done(function(dataUser){
				console.info(dataUser[0].username+" "+dataUser[0].email);
			});

		});
	});
	
	//Autre manière de faire :
	/*request.done(function(msg) {
		console.log(msg);
		console.log(msg[0].name);
		console.log(msg.length);

		$( "#categorie" ).html(""); // On vide le contenu du <ul> (#categorie), dans lequel on veut ajouter les noms.
		
		for(i = 0; i < msg.length; i++)
		{
			$( "#categorie" ).append('<li><a href="">'+msg[i].name+'</a></li>');
		}
	});*/
	 
	request.fail(function( jqXHR, textStatus ) {
	  alert( "Request failed: " + textStatus );
	});
});