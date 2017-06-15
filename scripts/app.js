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
	
	request.done(function(data) { // data = toutes les données renvoyées par la requête (sous la forme d'un ARRAY)
			var content = "";
		data.forEach(function(element){
			//console.log(element);
			content += '<li><a href="">'+element.name+'</a></li>';
		});

		$("#categorie").html(content);
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