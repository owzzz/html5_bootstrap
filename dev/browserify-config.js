//third party libraries alias configurations for browserify

var vendorPath = "./app/assets/js/vendor/";

module.exports = [
    vendorPath + 'angular.js:angular',
    vendorPath + 'angular-route.js:angular-route',
    vendorPath + 'jquery.js:jquery',
    vendorPath + 'tween.js:tween',
    vendorPath + 'parallax.js:parallax',
    vendorPath + 'responsive-tabs.js:tabs',
    vendorPath + 'slick.js:slick',
    vendorPath + 'breakpoints.js:breakpoints',
    vendorPath + 'select2.js:select2',
    vendorPath + 'select2-module.js:select2-module',
    vendorPath + 'bttr-lazy-loading.js:lazy-load',
];
