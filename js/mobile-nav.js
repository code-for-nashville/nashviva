$().ready(function(){
	$('span.nav-btn').click(function (){
	  $(' .data-toggle ul').slideToggle();
	})


	$(window).resize(function () {
	  if ( $(window).width() > 760 ) {
	    $(' data-toggle ul').removeAttr('style');
	  }
	})

});