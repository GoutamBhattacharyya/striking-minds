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
        //$('body').addClass('overflow-hidden');
		$(this).toggleClass('hidden-div');
        $('.sidepanel').toggleClass('open-panel');
        //sidePanelOn = true;
    });
    $('.close-button').click(function(event){
        event.preventDefault();
        //$('body').removeClass('overflow-hidden');
        $('.sidepanel').removeClass('open-panel');
        $('.side-panel-controller').removeClass('hidden-div');
    }); 
    $('.main-nav ul li a').click(function(event){
        event.preventDefault();
        //$('body').removeClass('overflow-hidden');
        $('.sidepanel').removeClass('open-panel');
        $('.side-panel-controller').removeClass('hidden-div');
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

    //   $(function (){        
    //     $(window).mousemove(function(event) {
    //         if(sidePanelOn==true){
    //             $('figure#mouse-pointer').css(
    //                 {
    //                     'display': 'block'
    //                 }
    //             );
    //             $('#mouse-pointer').css({
    //                 'top' : event.pageY + 'px',
    //                 'left' : event.pageX + 'px'
    //             });
    //             $('*').addClass('noneCursor');
    //         }else{
    //             $('*').removeClass('noneCursor');
    //             $('figure#mouse-pointer').css(
    //                 {
    //                     'display': 'none'
    //                 }
    //             );
    //         }
    //     });      
    
    // });

});


// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        if($(window).width()>1100){
            $('html, body').animate({
                scrollTop: target.offset().top-50
                }, 1000, function() {
                // Callback after animation
                // Must change focus!
            
            });
        }else{
            $('html, body').animate({
                scrollTop: target.offset().top+20
                }, 1000, function() {
                // Callback after animation
                // Must change focus!
            
            });
        }
      }
    }
  });




var navChildren = $('.main-nav ul li').children();
    var aArray = [];
    for (var i = 0; i < navChildren.length; i++) {
        var aChild = navChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);
    }
    $(window).scroll(function () {
        var windowPos = $(window).scrollTop();
        var windowHeight = $(window).height();
        var docHeight = $(document).height();
        for (var i = 0; i < aArray.length; i++) {
            var theID = aArray[i];
            var secPosition = $(theID).offset().top;
            secPosition = secPosition;
            var divHeight = $(theID).height();
            divHeight = divHeight;
            if (windowPos >= secPosition && windowPos < (secPosition + divHeight)) {
                $("a[href='" + theID + "']").parent().addClass("active");
            } else {
                $("a[href='" + theID + "']").parent().removeClass("active");
            }
        }
    });