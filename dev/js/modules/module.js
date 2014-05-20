(function(window, undefined) {
	"use strict";

	/**
	* This is my first module/component/widget/plugin.
	*
	* @class module
	* @constructor
	*/
	
	var moduleFeature = {

		/**
		* My module description.  Like other pieces of your comment blocks, 
		* this can span multiple lines.
		*
		* @method AddTwoNumbers
		* @param {number} First number
		* @param {number} Second Number
		* @param {Function} Returns the value of first number added to second number
		* @return {Number} Returns Number or NAN
		*/

		addTwoNumbers: function(a,b) {
			return (a+b);
		}
	};

	// Check if we have Browserify
	if(module) {
		module.exports = moduleFeature;
	} else {
		window.moduleFeature = moduleFeature;
	}


})(window, undefined);
