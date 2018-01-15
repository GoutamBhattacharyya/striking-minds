global.jQuery =  require('jquery');
bootstrap = require('bootstrap');
//mustache = require('mustache');


var $ = jQuery;

$(document).ready(function(){

    // Hamburger amnimation
	$('.side-panel-controller').click(function(){
		$(this).toggleClass('open');
    });
    
});

