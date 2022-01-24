'use strict';

// Register `home` component, along with its associated controller and template
angular.
  module('home').
  component('home', {
    templateUrl: 'pages/home/home.template.html',
    controller: ['Product',
      function HomeController(Product) {
        this.products = Product.query();
        this.orderProp = 'age';
      }
    ]
  });
