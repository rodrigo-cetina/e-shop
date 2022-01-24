'use strict';

// Register `shop` component, along with its associated controller and template
angular.
  module('productDetails').
  component('productDetails', {
    templateUrl: 'pages/shop/product-details/product-details.template.html',
    controller: ['$routeParams', 'Product',
      function ProductDetailsController($routeParams, Product) {
        this.productBasket = Product.getProductFromBasket($routeParams.sku);
        this.product = Product.product;
        this.messageSaved = false;
        this.addProductToBasket = function(productBasket) {
          this.messageSaved = false;
          Product.addProductToBasket(productBasket);
          this.messageSaved = true;
        };
        this.incrementQuantity = function() {
          this.messageSaved = false;
          this.productBasket.quantity++;
        };
        this.decrementQuantity = function() {
          this.messageSaved = false;
          if (this.productBasket.quantity > 1) {
            this.productBasket.quantity--;
          }
        };
        
        jQuery(function() { 
          
          $("#sort").DataTable({
            columnDefs : [
              { type : 'date', targets : [3] }
            ],  
          });

        });
      }
    ]
  });
