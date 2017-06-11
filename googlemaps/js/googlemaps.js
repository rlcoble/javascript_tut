$(document).ready(function(){
	$('#test').submit(function(e){
		e.preventDefault();
		var $inputs = $('.form :input');
		var position = {};
		var message;
		$inputs.each(function(){
			if(this.name === 'message'){
				message = $(this).val();
			} else if(!(this.name === '')){
				position[this.name] = parseFloat($(this).val());
			}
		});
		addMarker(position, message);
	});
});

var map;
function initMap(){
	map = new google.maps.Map($('.map')[0], {
		center: {lat: 28.144440, lng: -82.321752},
		zoom: 13
	});
}

function addMarker(position, message){
	var marker = new google.maps.Marker({
		position: position,
		map: map
	});

	var infowindow = new google.maps.InfoWindow({
		content: message
	});

	marker.addListener('click', function(){
		infowindow.open(map, marker);
	});
}