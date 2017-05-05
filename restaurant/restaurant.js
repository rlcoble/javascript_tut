$(document).ready(function(){ 
	
	var tabs = '<button class="tablinks-1">RESTAURANT!</button>'
						 + '<button class="tablinks-2">PAGE 2!</button>'
						 + '<button class="tablinks-3">PAGE 3!</button>';

	var original = '<p><h1>Chik-Fil-A</h1></p>'
								 + '<p>"We should be about more than just selling chicken. We should be a part of our customers lives and the communities in which we serve."</p>'
								 + '<img src="https://d1fd34dzzl09j.cloudfront.net/Images/CFACOM/PDP/Menu%20Items%20Corrected/Final__0052_CFA_PDP_Spicy-Chick-Fil-A-Sandwich_1085.png.png">';

	$('body').prepend(tabs);
	$('#content').append(original); 

/* THIS ALSO WORKS!!
	function changeTab(tab, content){
		$(tab).click(function() {
			$('#content').html(content);
		});
	}

	changeTab('.tablinks-1', original);
	changeTab('.tablinks-2', 'PAGE 2');
	changeTab('.tablinks-3', 'PAGE 3');
*/
	
	$('.tablinks-1').click(function() {
		$('#content').html(original);
	});

	$('.tablinks-2').click(function() {
		$('#content').html('PAGE 2');
	});

	$('.tablinks-3').click(function() {
		$('#content').html('PAGE 3');
	});
	
});