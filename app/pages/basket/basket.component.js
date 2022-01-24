'use strict';

// Register `shop` component, along with its associated controller and template
angular.
  module('basket').
  component('basket', {
    templateUrl: 'pages/basket/basket.template.html',
    controller: ['Product',
      function BasketController(Product) {
        this.productsBasket = Product.getAllProductsFromBasket();
        if (this.productsBasket.length > 0) {
          this.totalBasket = Product.calculateOrderSummary();
        } else {
          this.totalBasket = 0;
        }
      }
    ]
  });
