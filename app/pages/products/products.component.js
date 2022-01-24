'use strict';

// Register `shop` component, along with its associated controller and template
angular.
  module('products').
  component('products', {
    templateUrl: 'pages/products/products.template.html',
    controller: ['$scope', 'Product',
      function ProductController($scope, Product) {
        this.product = {};
        this.products = Product.getAllProducts();
        this.addNewProduct = function() {
          Product.addProduct(product);
          this.product = {};
        };
        this.deleteProduct = function(product) {
          $('#sort').dataTable({
            destroy: true
          });
          this.products = Product.deleteProduct(product);
          console.log(this.products);
          // return $scope.$watch(function(data) {
          //   return data.$ctrl.products = Product.delete(product);
          // });
        };
        
        jQuery(function() { 
          
          $("#sort").DataTable({
            columnDefs : [
              { type : 'name', targets : [0] }
            ],  
          });

        });
      }
    ]
  });
