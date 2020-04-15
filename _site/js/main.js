$.getJSON('https://www.instagram.com/lordeyoc/?__a=1', function(data) {
	$('#displayPicture').attr('src', data.graphql.user.profile_pic_url);
	$('#info_name').html(data.graphql.user.full_name);
	$('#info_followers').html($('#info_followers').text().replace('-', data.graphql.user.edge_followed_by.count));
}).done(function() {
	$('#info').fadeTo("slow", 1, function() {
		$('#info').css("opacity","1");
	});
});

function viewImage(id, ig, src, size) {
	/* console.log(id, ig, src, size); */
	
	$('#hd_image').attr('src', 'thumbnails/' + src/*releases[i].assets[0].browser_download_url*/);
	$('#downloadButton #size').html(size);
	$('#igButton').attr('onclick','window.open("https://www.instagram.com/p/' + ig +'/")');
	
	
	releasesUrl = "https://api.github.com/repos/lordeyoc/lordeyoc.github.io/releases";
	
	$.getJSON(releasesUrl, function(releases) {		
		var i = 0;
		for (i; i<=(releases.length-1); i++) {
			if (releases[i].id == id) {
				$('#downloadButton').attr('onclick','window.open("' + releases[i].assets[0].browser_download_url + '")');
				$('#downloadCounter #counter').html(releases[i].assets[0].download_count);
			}
		}
	});
	
	$('#panel').css('z-index','99999999');
	$('#panel').css('opacity','1');
	
	$('body').css('overflow','hidden');
}

function closeViewer() {
	$('#panel').css('z-index','-99999999');
	$('#panel').css('opacity','0');
	$('body').css('overflow','visible');
	$('#hd_image').attr('src','');
	$('#downloadButton').attr('onclick','');
	$('#igButton').attr('onclick','');
}

document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.key == "Escape") {
        closeViewer();
    }
};

;(function () {
	
	'use strict';



	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}

	};

	var parallax = function() {
		$(window).stellar({
			horizontalScrolling: false,
			hideDistantElements: false, 
			responsive: true

		});
	};

	var testimonialCarousel = function(){
		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			items: 1,
		    loop: true,
		    margin: 0,
		    responsiveClass: true,
		    nav: false,
		    dots: true,
		    smartSpeed: 500,
		    autoHeight: true
		});
	};


	// Animations

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};

	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};

	var counterWayPoint = function() {
		if ($('#counter-animate').length > 0 ) {
			$('#counter-animate').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
						
				}
			} , { offset: '90%' } );
		}
	};

	var burgerMenu = function() {

		$('.js-fh5co-nav-toggle').on('click', function(event){
			event.preventDefault();
			var $this = $(this);

			if ($('body').hasClass('offcanvas')) {
				$this.removeClass('active');
				$('body').removeClass('offcanvas');	
			} else {
				$this.addClass('active');
				$('body').addClass('offcanvas');	
			}
		});



	};

	// Click outside of offcanvass
	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#fh5co-aside, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');
			
	    	}
	    	
	    }
		});

		$(window).scroll(function(){
			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');
			
	    	}
		});

	};

	// Document on load.
	$(function(){
		fullHeight();
		parallax();
		testimonialCarousel();
		contentWayPoint();
		counterWayPoint();
		burgerMenu();
		mobileMenuOutsideClick();
	});


}());