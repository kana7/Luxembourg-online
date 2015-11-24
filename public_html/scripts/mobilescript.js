$(function(){
	
	$(".txtzone").mouseover(function(){
		$(".zone"+$(this).attr("data-zone")).show();
	});
	$(".txtint_zone").mouseover(function(){
		$(".int_zone"+$(this).attr("data-zone")).show();
	});
	$(".txtint_zone").mouseout(function(){
		$(".zone").hide();
	});
	$(".txtzone").mouseout(function(){
		$(".zone").hide();
	});
	$(document).on('mousemove', function(e){
		$('.zone').css({
		   left:  e.pageX+30,
		   top:   e.pageY-110
		});
	});
	$(".tooltipm").tooltip({'position':{ my: 'left center', at: 'right bottom' }});
	


});