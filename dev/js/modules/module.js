"use strict"

var module = {
	AddTwoNumbers: function(a,b) {
		return (a+b);
	}
};

if(module) {
	module.exports = module;
} else {
	window.module = module;
}