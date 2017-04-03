$(document).ready(function(){
		$("body").on({
		    // When ajaxStart is fired, add 'loading' to body class
		    ajaxStart: function() {
		    	console.log('iniciando');
		        $(this).addClass("loading"); 
		    }
		});
		$("body").on({
		    // When ajaxStop is fired, remove 'loading' from body class
		    ajaxStop: function() { 
		    	console.log('finalizando');
		        $(this).removeClass("loading"); 
		    }   
		});
		
});