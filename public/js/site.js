(function() {
    "use strict";
	
	//close navbar on small devices
	$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
        $(this).collapse('hide');
    }
});
	
	// carousel
    $('.carousel').carousel({
        interval: 10000
    });

    // buttons
    var $pickButton = $("#pickButton");

    $("#reasonDropdown li a").on("click", function() {
        var reason = $(this).text();
        $pickButton.text(reason);
    });

    var $btnOther = $('#btnOther');

    $('#ddlOther li a').on('click', function() {
        var other = $(this).text();
        if (other != "The Big Lebowski") {
        $btnOther.text(other);
      } else {
        return false;
      }
    });
	
	
	var $sentDialog = $("#sentDialog");

    $("#contactForm").on("submit", function () {
        $sentDialog.modal('show');
        return false;
    });

    var $sentAlert = $("#sentAlert");

    $sentDialog.on("hidden.bs.modal", function () {
        //alert("close");
        $sentAlert.show();
    });

    $sentAlert.on("close.bs.alert", function () {
        $sentAlert.hide();
        return false;
    });

	//tooltip
    

	function isTouchDevice(){
    return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
}

	if(isTouchDevice()===true) {
		$("#contactForm input[type=submit]").tooltip("destroy");
		$("#contactForm input[type=submit]").attr('title', '');
	} else {
		$("#contactForm input[type=submit]").tooltip({
        delay: {
            show: 200,
            hide: 0
        }
    });
	}
	    

    $("#screenshot-carousel").carousel({
        interval: 2000
    });

    /*scroll up*/
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 500) {        // If page is scrolled more than 50px
            $('#return-to-top').fadeIn(200);    // Fade in the arrow
        } else {
            $('#return-to-top').fadeOut(200);   // Else fade out the arrow
        }
    });
    $('#return-to-top').click(function () {      // When arrow is clicked
        $('body,html').animate({
            scrollTop: $("#lead").offset().top // Scroll to top of body
        }, 500);
    });
    /*end scroll up*/

    /*right scrolling*/
    $('#btnClose').click(function () {
            $('html, body').animate({ scrollTop: $("#contact").offset().top }, 500);
    });

    $('#a_lead').click(function () {
        $('html, body').animate({ scrollTop: $("#lead").offset().top }, 500);
    });
    
    $('#a_feedback').click(function () {
        $('html, body').animate({ scrollTop: $("#feedback").offset().top }, 500);
    });

    $('#a_myskills').click(function () {
        $('html, body').animate({ scrollTop: $("#myskills").offset().top }, 500);
    });

    $('#a_gallery').click(function () {
        $('html, body').animate({ scrollTop: $("#gallery").offset().top }, 500);
    });

    $('#a_features').click(function () {
        $('html, body').animate({ scrollTop: $("#features").offset().top }, 500);
    });

    $('#a_faq').click(function () {
        $('html, body').animate({ scrollTop: $("#faq").offset().top }, 500);
    });

    $('#a_contact').click(function () {
        $('html, body').animate({ scrollTop: $("#contact").offset().top }, 500);
    });

    $('#a_subscription').click(function () {
        $('html, body').animate({ scrollTop: $("#subscription").offset().top }, 500);
    });

    $('#disclaimer').click(function () {
        $('html, body').animate({ scrollTop: $("#lead").offset().top }, 500);
    });

    $('#privacy').click(function () {
        $('html, body').animate({ scrollTop: $("#lead").offset().top }, 500);
    });

})();
