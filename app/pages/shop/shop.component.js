'use strict';

// Register `shop` component, along with its associated controller and template
angular.
  module('shop').
  component('shop', {
    templateUrl: 'pages/shop/shop.template.html',
    controller: ['Product',
      function ShopController(Product) {
        this.products = Product.getAllProducts();
      }
    ]
  });
