'use strict';

// Register `payment` component, along with its associated controller and template
angular.
  module('payment').
  component('payment', {
    templateUrl: 'pages/basket/payment/payment.template.html',
    controller: ['Product',
      function PaymentController(Product) {
        Product.deleteAllProductsFromBasket();
      }
    ]
  });
