global.jQuery =  require('jquery');
bootstrap = require('bootstrap');
WOW = require('wow.js');
parallax = require('jquery-parallax.js');
//mustache = require('mustache');


var $ = jQuery;
var sidePanelOn = false;
$(document).ready(function(){

    // Hamburger amnimation
	$('.side-panel-controller').click(function(event){
        event.preventDefault();
        $('body').addClass('overflow-hidden');
		$(this).toggleClass('open');
        $('.sidepanel').toggleClass('open-panel');
        sidePanelOn = true;
    });
    $('.side-area-mask').click(function(event){
        event.preventDefault();
        $('body').removeClass('overflow-hidden');
        $('.sidepanel').removeClass('open-panel');
        $('.side-panel-controller').removeClass('open');
        sidePanelOn = false;
    });  
    wow = new WOW(
        {
          animateClass: 'animated',
          offset:       100,
          callback:     function(box) {
            console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
          }
        }
      );
      wow.init();

      $(function (){        
        $(window).mousemove(function(event) {
            if(sidePanelOn==true){
                $('figure#mouse-pointer').css(
                    {
                        'display': 'block'
                    }
                );
                $('#mouse-pointer').css({
                    'top' : event.pageY + 'px',
                    'left' : event.pageX + 'px'
                });
                $('*').addClass('noneCursor');
            }else{
                $('*').removeClass('noneCursor');
                $('figure#mouse-pointer').css(
                    {
                        'display': 'none'
                    }
                );
            }
        });      
    
    });

});

