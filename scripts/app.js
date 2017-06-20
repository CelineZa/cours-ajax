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


	// Exercice 1 : Récupérer le nom des utilisateurs dans un fichier JSON et les ajouter dans une liste. 
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

		// Exercice 2 : Afficher l'id et l'email dans un console.info() lorsque l'on clique sur un noms
		$("#right_column ul > li").click(function(e){
			e.preventDefault();
			//console.log(data);

			var id_utilisateur = $(this).attr("id");
			//console.log(id_utilisateur.split("-"));
			id_utilisateur = id_utilisateur.split("-"); // Coupe l'id à partir du tiret. Ici le résultat est : array("utilisateur", "1")

			var ficheUser = $.ajax({
			  url: "https://jsonplaceholder.typicode.com/users",
			  method: "GET",
			  data: { id : id_utilisateur[1] }, // On récupère les informations de l'utilisateur qui a l'id qui est égale à id_utilisateur[1].
			  dataType: "json"
			});

			ficheUser.done(function(dataUser){
				console.info(dataUser[0].username+" "+dataUser[0].email);
			});

		});
	});
	
	//Ma version de l'exercice 1 et 2 :
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
	 
	request.fail(function(jqXHR, textStatus) {
	  alert( "Request failed: " + textStatus );
	});


	// Exercice 3 : Afficher les 4 premiers posts (en dessous du carrousel). Si la description est supérieure à 100 caractères, on met “...”.
	$.ajax({
	  url: "https://jsonplaceholder.typicode.com/posts", 
	  method: "GET",
	  dataType: "json"
	})	

	.done(function(dataPosts) {
		//console.log(dataPosts);

		for(let i = 0; i < 4; i++)
		{
			$('.one_quarter > strong').eq(i).text(dataPosts[i].title.slice(0, 15)); // Texte prend le texte brut. Il n'interprète pas les balises HTML contrairement à .html()
			
			$('.affichePost').eq(i).text(dataPosts[i].body.slice(0, 100) + "...");

			$('.one_quarter a').eq(i).click(function(e){
				e.preventDefault();

				if($(this).text() != 'Read less >') // Si le texte dans la balise <a> est égal à "Read less >" on affiche le texte en entier.
				{
					$('.affichePost').eq(i).text(dataPosts[i].body);
					$(this).text('Read less >');
				}		
				else  // Sinon on affiche le texte raccourci.
				{
					$('.affichePost').eq(i).text(dataPosts[i].body.slice(0, 100) + "...");
					$(this).text('Read more >');
				}
			});
		}	
	})

	.fail(function(jqXHR, textStatus) {
	  alert( "Request failed: " + textStatus );
	});

/*	Ma version de l'exercice 3 :

	var affichePost = $.ajax({
	  url: "https://jsonplaceholder.typicode.com/posts", 
	  method: "GET",
	  dataType: "json"
	});
	
	affichePost.done(function(dataPost) {
		//console.log(dataPost);

		for(let i = 0; i < 4; i++)
		{
			let titre = dataPost[i].title.slice(0, 15); // On coupe le titre au bout de 15 caractères.
			$('.one_quarter > strong').eq(i).html(titre); // Au 1er tour, on affiche le 1er titre dans le 1er strong, au 2ème tour, le 2ème titre dans le 2ème strong, ...

			//console.log(dataPost[i].body.slice(0, 100));
			let description = dataPost[i].body.slice(0, 100); // On coupe la description au bout de 100 caractères.
			$('.affichePost').eq(i).html("<p>"+description+"...</p>");

			//***** NE FONCTIONNE PAS ! ******
			$('.more').click(function(e){
				e.preventDefault();

				$('.affichePost').html(dataPost[i].body);
				$(this).html('Read less');
			});	
			//********************************
		}

	});
	 
	affichePost.fail(function( jqXHR, textStatus ) {
	  alert( "Request failed: " + textStatus );
	});
*/

	// Exercice 4 : Afficher les 3 premières photos puis, à chaque fois qu'on clique sur le lien "View All Our Recent Work Here »", 10 nouvelles photos apparaissent.
	let increment = 0;
	let pictures;

	$.get("https://jsonplaceholder.typicode.com/photos") //Autre syntaxe pour écrire une requête
	.done(function(data){
		//console.log(data);

		for(let i = 0; i < 3; i++)
		{
			$(".one_third").eq(i).children().attr('src',data[i].url);
		}

		pictures = data; // Grâce à cette variable on a accès au contenu de "data" partout.
	});

	$("figcaption > a").click(function(e){
		e.preventDefault();
		//console.log(pictures);

		var content = "";
		var indexLi = $('.one_third').length; // Retourne le nombre d'éléments qui ont la classe "one_third".
		
		for(let i = increment; i < increment+10 ; i++)
		{
			var classHtml = "";

			if((indexLi+1)%3 == 0)
			{
				classHtml = "lastbox";
			}
			content += '<li class="one_third '+classHtml+'"><img src="'+pictures[i].url+'" width="290" height="180"></li>';	
			indexLi++;
		}
		$('#afficheImage').append(content);
		increment += 10;		
	});


/*	
	Ma version de l'exercice 4 :
	$.ajax({
	  url: "https://jsonplaceholder.typicode.com/photos", 
	  method: "GET",
	  dataType: "json"
	})	

	.done(function(dataImage) {
		//console.log(dataImage);
		for(let i = 0; i < 3; i++)
		{
			console.log(dataImage[i].url);
			$('.one_third > img').eq(i).attr('src',dataImage[i].url);
		}

		let compteur = 3;

		$('#lien_image > a').click(function(e){
			e.preventDefault();

			for(let i = 0; i < 10; i++)
			{	
				console.log(dataImage[i].id);
				console.log(compteur);
			
				$('#afficheImage').append('<li class="one_third"><img src="'+dataImage[compteur].url+'" width="290" height="180"></li>');
				
				if(i % 3 == 0)
				{
					$('#afficheImage > li').addClass('lastbox');
				}	
				compteur++;
			}
		});
	})

	.fail(function(jqXHR, textStatus) {
	  alert( "Request failed: " + textStatus );
	});*/

	// Exercice 5 : Envoyer les données du formulaire via une requête AJAX
	$('form').submit(function(e) // Dès lors où je soumets le formulaire, j'exécute la suite du code.
	{
		e.preventDefault();

		$.ajax({
		  url: "http://localhost/cours-ajax/api.php", 
		  method: "POST", // Méthode POST car dans api.php, on utilise $_POST
		  data: $('form').serialize() // La fonction serialize() permet de récupérer tous les input et de les mettre en chaînes de caractères.
		})	

		.done(function(dataForm){
			$('#message_ajax').html("<div class='alert alert-success'><strong>Success !</strong> User register</div>");
			console.log("User registered");
		})

		.fail(function(jqXHR, textStatus) {
			$('#message_ajax').html("<div class='alert alert-danger'><strong>Error !</strong> User not registered</div>");
		});
	});

});