// ******************************* Configuration **************************//
// ***********************************************************************//
// ********************************* Start ******************************// 

// =======================================================================// 
// Twitter                                                               //        
// =====================================================================//

//Set true or false to enable/disable
var twitter_enabled = true;

//Your twitter username
var twitter_username = 'thecheekypuppy';

//Number of tweets
var twitter_count = 1;

// =======================================================================// 
// Google Maps                                                           //        
// =====================================================================//

// Point 1
var google_maps_latitude = 39.811668;
var google_maps_longitude = -7.507789;

// Point 2 (Set to null if you want to disable)
var google_maps_latitude_2 = null;
var google_maps_longitude_2 = null;

//Circle color
var google_maps_circle_color = '#000000';

//Landscape color
var google_maps_landscape_color = '#cccccc';

//Water color
var google_maps_water_color = '#aaaaaa';

// ******************************* Configuration **************************//
// ***********************************************************************//
// ********************************** End *******************************// 

/* Do not modify below unless you know what you are doing */


/* Vars*/
var body				= jQuery('body');
var loader				= jQuery('#loader');
var join_us				= jQuery('.mailing-list .join-us');
var sign_mailing_list	= jQuery('.sign-mailing-list');
var mask_shape			= jQuery('#mask-shape');
var newsletter_form		= jQuery('#newsletter');
var newsletter_objects	= jQuery('#newsletter input, #newsletter button');
var newsletter_msg		= jQuery('.message-wrapper');

jQuery(document).ready(function() {
	"use strict";



	jQuery(document).bind("fullscreenchange", function() {
		jQuery('#fullscreen').toggleClass('true');
	});
	
	jQuery('#fullscreen').click(function(){
		jQuery(document).toggleFullScreen();
	});

	/* URI Listener */
	jQuery(window).hashchange(function(){
		var hash = location.hash;
		jQuery('a[href='+hash+']').trigger('click');
	});


	/* Spinner */
	loader.spin({  length: 0, radius: 20, width: 8, color: '#fff' });

	/* Site pre-loader */
	body.queryLoader2({
		backgroundColor: '',
		barColor: '',
		barHeight:0,
		onComplete: function() {
			loader.animate({ 'opacity' : 0 }, 500);
			mask_shape.switchClass( "unloaded", "loaded", 750, 'easeInOutQuint',  function() { 

				/* to handle the hash the page may have loaded with */
				jQuery(window).hashchange();

				jQuery('header, section#home, section.twitter, footer').animate({ 'opacity' : 1 }, 500);

				if (Modernizr.mq('only screen and (max-width: 767px)'))
				{
					jQuery('.home').attr('href', '/');
					jQuery('.hide').addClass('show').css({'opacity':'1'});

					/* Phone Content Animations  */
					jQuery('header figure').addClass('animated delay10 fadeInUp');
					jQuery('section#home h1').addClass('animated delay15 fadeInUp');
					jQuery('section#home h2').addClass('animated delay20 fadeInUp');
					var i = 25;
					jQuery('section h1:not(#home h1)').each(function(){
						jQuery(this).addClass('animated delay'+ i +' fadeInLeft');
						i+=5;
					});
					jQuery('.copyright').addClass('animated delay'+ i +' fadeInUp');
					jQuery('.phone-accordion').addClass('animated delay10 fadeInUp');
				}else {
					jQuery('.hide').removeClass('show').css({'opacity':'0'});

					/* Content Animations */
					jQuery('header figure').addClass('animated delay10 fadeInUp');
					jQuery('header nav .menu1').addClass('animated fast delay15 fadeInLeft');
					jQuery('header nav .menu2').addClass('animated fast delay20 fadeInLeft');
					jQuery('header nav .menu3').addClass('animated fast delay25 fadeInLeft');

					jQuery('section h1').addClass('animated delay30 fadeInUp');
					jQuery('section h2, section .phone-accordion').addClass('animated delay35 fadeInUp');

					jQuery('footer ul.social-profiles').addClass('animated delay40 fadeInUp');
					jQuery('footer ul.social-profiles li').addClass('animated delay50 fadeInUp');
					jQuery('footer #fullscreen').addClass('animated delay55 fadeInRight');
					jQuery('footer .mailing-list').addClass('animated delay55 fadeInUp');

					jQuery('section.twitter').addClass('animated delay60 fadeIn');
					jQuery('.copyright').addClass('animated delay60 fadeIn').one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
					function(e) {
						jQuery('section h1').switchClass('delay30', 'delay10');
						jQuery('section h2, section .phone-accordion').switchClass('delay35', 'delay15');
						jQuery('nav li a').css({'opacity':'1'});
					});
					if(!Modernizr.csstransitions)
					{
						jQuery('section h1').switchClass('delay30', 'delay10');
						jQuery('section h2, section .phone-accordion').switchClass('delay35', 'delay15');
						jQuery('nav li a').css({'opacity':'1'});
					}
				}

				/* for mobile on resize */
				jQuery(window).resize(function(){
					if (Modernizr.mq('only screen and (max-width: 767px)'))
					{
						jQuery('.home').attr('href', '/');
						jQuery('.hide').addClass('show').css({'opacity':'1'});

						jQuery('section h1').switchClass('delay30', 'delay15');
						jQuery('section h2, section .phone-accordion').switchClass('delay35', 'delay20');
						jQuery('.copyright').switchClass('delay60', 'delay25');
					}else {
						jQuery('.home').attr('href', '#home');
						jQuery('.hide').removeClass('show').css({'opacity':'0'});

						jQuery('section h1').addClass('animated delay30 fadeInUp');
						jQuery('section h2, section .phone-accordion').addClass('animated delay35 fadeInUp');

						jQuery('.phone-accordion').removeAttr('style');
					}
					jQuery('.sign-mailing-list a.close').trigger('click');
				});
			});
		}
	});

	if (twitter_enabled === true)
	{
		jQuery(".twitter-feed").tweet({
			join_text : "",
			count : twitter_count,
			loading_text : "loading tweets...",
			username : twitter_username,
			template : "{text}{join}{time}"
		}).bind("loaded", function() {
			jQuery('.tweet_list').cycle({
				fx: 'custom',
				cssBefore: {
					//top:50,
					height: 100,
					opacity: 0,
					display: 'block'
				},
				animIn: {
					top: 0,
					opacity: 1
				},
				animOut: {
					opacity: 0,
					top: -50
				},
				cssAfter: {
					zIndex: 0,
					display: 'none'
				},
				speed: 1750,
				sync: false,
				easeIn: 'easeOutBack',
				easeOut:  'easeInBack'
			});
		});
	}
	else {
		jQuery('section.twitter').hide().remove();
	}


	/* Fullscreen background video */
	if (jQuery('.bg video').length)
	{
		jQuery('video, object').maximage('maxcover');
		jQuery('html, body').css({'overflow' : 'hidden'});
	}


	/* Nav click actions */
	jQuery('nav li a, .home').click(function() {
		var link = jQuery(this).attr('href').substr(1);
		
		if ( !jQuery('section.main.show, .bg, .bg-'+ link + ', section#' + link).is(':animated') ) {
			jQuery('nav a').removeClass('active'); //remove active
			jQuery('section.main.show').addClass('show').animate({'opacity' : 0}, {queue: false, duration: 1000,
				complete: function() {
					jQuery('section.main').switchClass('show', 'hide');
					jQuery('section#' + link).addClass('show');
					jQuery('.bg').animate({'opacity' : 0}, {queue: false, duration: 500,
						complete: function() {
							jQuery('a[href="#'+link+'"]').addClass('active'); // add active
							jQuery('.bg-'+ link).animate({'opacity' : 1}, {queue: false, duration: 500,
								complete: function() {
									jQuery('section#' + link).switchClass('hide', 'show').animate({'opacity' : 1}, {queue: false, duration: 1000});
								}
							});
						}
					});
				}
			});
		}
	});


	/* Mailing list lightwindow button
	join_us.click(function() {
		sign_mailing_list.addClass('show').addClass('ie-show');
		mask_shape.switchClass( "loaded", "loaded-window", 7500, 'easeInOutQuint', function() { 
			sign_mailing_list.animate({ 'opacity' : 1 }, 500);
		});
	});
	*/
     
	/* Close Mailing list lightwindow button
	jQuery('.sign-mailing-list a.close').click(function() {
		sign_mailing_list.animate({ 'opacity' : 0 }, 500, function() { 
			mask_shape.switchClass( "loaded-window", "loaded", 750, 'easeInOutQuint', function() {
				sign_mailing_list.removeClass('show');
				newsletter_msg.hide().removeClass('animated bounceInLeft');
			});
		});
	});
	*/
	/* Newsletter button animation 
	var height = 34;
	var images = 27;
	var current = 0;

	join_us.hover(function() {
		jQuery(this).clearQueue();
		for (var i=1; i<images; i++) {
			current = height*i*(-1);
			jQuery(this).delay(50).animate({'background-position': 'right ' + current +'px' }, {duration: 0});
		}
	}, function(){
		for ( var i=(current/height)*-1; i>=0; i--) {
			current = height*i*(-1);
			jQuery(this).delay(50).animate({'background-position': 'right ' + current +'px' }, {duration: 0});
		}
	});
	*/

	/* Newsletter Form
	newsletter_form.submit(function() {
		var form_data = jQuery(this).serialize();
		var email = jQuery('#newsletter input').prop('value');
		
		if (validateEmail(email)) {
			jQuery.post(jQuery(this).attr('action'), form_data, function(data) {
				newsletter_objects.fadeOut( function() {
					newsletter_msg.removeClass('animated bounceInLeft').hide();
					jQuery('.sign-mailing-list h2').fadeOut('fast');
					jQuery('.sign-mailing-list h1').text(data);
				});

				//close the newsletter lightwindow
				sign_mailing_list.delay(2000).animate({ 'opacity' : 0 }, 500, function() { 
					mask_shape.switchClass( "loaded-window", "loaded", 750, 'easeInOutQuint', function() {
						sign_mailing_list.removeClass('show');
						newsletter_objects.fadeIn();
					});
				});
			});
		} else {
			newsletter_msg.show().addClass('animated bounceInLeft');
		}
		return false;
	});*/


	// on mobile version menus work as an accordion
	jQuery('.main h1').click(function(){
		var el = jQuery(this).parent().parent('.row').next('.phone-accordion');
		if (el.hasClass('open')) {
			el.slideUp('slow').removeClass('open');
		} else {
			jQuery('.phone-accordion').slideUp('fast').removeClass('open');
			el.slideDown('slow').addClass('open');
		}
	});


	// Hide copyright on nav hover
	jQuery('nav ul').hover(function() {
		if (Modernizr.mq('only screen and (min-width: 979px)')) {
			jQuery('footer .copyright > *').stop(true, true).fadeToggle();
		}
	});

	//Init Google Maps
	startGmap();

});

/* gmaps */
function startGmap(){var n={zoom:4,panControl: false,center:new google.maps.LatLng(google_maps_latitude,google_maps_longitude),navigationControlOptions:{style:google.maps.NavigationControlStyle.NORMAL,position:google.maps.ControlPosition.RIGHT_TOP},streetViewControl:false,scrollwheel:false,zoomControl:false,zoomControlOptions:{style:google.maps.ZoomControlStyle.DEFAULT,position:google.maps.ControlPosition.RIGHT_TOP},mapTypeControl:false,mapTypeControlOptions:{style:google.maps.MapTypeControlStyle.DROPDOWN_MENU,position:google.maps.ControlPosition.TOP_RIGHT,mapTypeIds:["ptMap"]}};map=new google.maps.Map(document.getElementById("contact_map"),n);var j=[{featureType:"administrative",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"landscape",elementType:"all",stylers:[{color:google_maps_landscape_color},{visibility:"on"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"all",stylers:[{visibility:"on"},{lightness:-30}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"all",stylers:[{color:google_maps_water_color}]}];var m={name:"Map"};var l=new google.maps.StyledMapType(j,m);map.mapTypes.set("ptMap",l);map.setMapTypeId("ptMap");var k={path:google.maps.SymbolPath.CIRCLE,fillOpacity:1,fillColor:google_maps_circle_color,strokeOpacity:1,strokeColor:google_maps_circle_color,strokeWeight:0,scale:5};var q=new google.maps.LatLng(google_maps_latitude,google_maps_longitude);var p=new google.maps.Marker({position:q,map:map,zIndex:99999,optimized:false,icon:k});if(google_maps_latitude_2&&google_maps_longitude_2){var i={path:google.maps.SymbolPath.CIRCLE,fillOpacity:1,fillColor:google_maps_circle_color,strokeOpacity:1,strokeColor:google_maps_circle_color,strokeWeight:0,scale:5};var h=new google.maps.LatLng(google_maps_latitude_2,google_maps_longitude_2);var o=new google.maps.Marker({position:h,map:map,zIndex:99999,optimized:false,icon:i})}};

/* validate email */ 
function validateEmail(a){ "use strict"; var b=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; return b.test(a); }