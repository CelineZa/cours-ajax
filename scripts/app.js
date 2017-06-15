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

});