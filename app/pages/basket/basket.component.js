'use strict';

// Register `shop` component, along with its associated controller and template
angular.
  module('basket').
  component('basket', {
    templateUrl: 'pages/basket/basket.template.html',
    controller: ['Product',
      function BasketController(Product) {
        this.productsBasket = Product.getAllProductsFromBasket();
        
        this.totalBasket = Product.calculateOrderSummary();

        this.deleteProductFromBasket = function(product) {
          this.productsBasket = Product.deleteProductFromBasket(product);
          this.totalBasket = Product.calculateOrderSummary();
        };
      }
    ]
  });
