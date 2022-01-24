'use strict';

angular.
  module('eShopApp').
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider.
        when('/home', {
          template: '<home></home>'
        }).
        when('/shop', {
          template: '<shop></shop>'
        }).
        when('/shop/:sku', {
          template: '<product-details></product-details>'
        }).
        when('/basket', {
          template: '<basket></basket>'
        }).
        when('/products', {
          template: '<products></products>'
        }).
        when('/phones', {
          template: '<phone-list></phone-list>'
        }).
        when('/phones/:phoneId', {
          template: '<phone-detail></phone-detail>'
        }).
        otherwise('/shop');
    }
  ]);
