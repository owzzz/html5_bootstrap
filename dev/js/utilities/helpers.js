(function(window, undefined) {
	"use strict";

	/**
	* This is our helpers singleton. Anything that can be shared across modules can be used here.
	*
	* @class module
	* @constructor
	*/

	var helpers = {

		/**
		* My isMobile description.  Like other pieces of your comment blocks, 
		* this can span multiple lines.
		*
		* @method isMobile
		* @return {Boolean} Returns true or false
		*/

		
		isMobile: function() {
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				return true;
			} else {
				return false;
			}
		},

		/**
		* isIpad, detects iPad in the browser by checking userAgent
		*
		* @method isIpad
		* @return {Boolean} Returns true or false
		*/

		isIpad: function() {
			return navigator.userAgent.indexOf('iPad') !== -1;
		}, 

		/**
		* isTouch, detects if device is touch enabled in the browser by checking userAgent
		*
		* @method isTouch
		* @return {Boolean} Returns true or false
		*/

		isTouch: function() {
			return (this.eventClick === "touchend");
		},
		
		transEndEventNames: {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},

		/**
		* My isDesktop description.  Like other pieces of your comment blocks, 
		* this can span multiple lines.
		*
		* @method isDesktop
		* @return {Boolean} Returns true or false
		*/

		isDesktop: function() {
			//TODO
			return; 
		},

    	eventStart: (typeof window.ontouchstart === "undefined") ? 'mousedown' : 'touchstart',

		eventEnd: (typeof window.ontouchstart === "undefined") ? 'mouseup' : 'touchend',

    	eventMove: (typeof window.ontouchstart === "undefined") ? 'mousemove' : 'touchmove',

    	eventClick: (typeof window.ontouchstart === "undefined") ? 'click' : 'touchend'
	};

	// Check if we have Browserify
	if(module) {
		module.exports = helpers;
	} else {
		window.helpers = helpers;
	}


})(window, undefined);
