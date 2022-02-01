'use strict';

// Register `shop` component, along with its associated controller and template
angular.
  module('products').
  component('products', {
    templateUrl: 'pages/products/products.template.html',
    controller: ['$scope', 'Product', '$uibModal', '$log',
      function ProductController($scope, Product, $uibModal, $log) {
        this.product = {};
        this.products = Product.getAllProducts();
        this.deleteProduct = function(product) {
          // $('#sort').dataTable({
          //   destroy: true
          // });
          this.products = Product.deleteProduct(product);
          // return $scope.$watch(function(data) {
          //   return data.$ctrl.products = Product.delete(product);
          // });
        };

        var pc = this;
        pc.data = {};
        
        pc.open = function (product, size) {
          
          if (product === undefined) {
            product = {
              sku: "",
              name: "",
              description: "",
              price: 0,
              brand: "",
              type: "",
              imageUrl: "assets/img/products/no-image-product.png"
            };
          }

          pc.data = product;
          var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'pages/products/product-modal/product-modal.template.html',
            controller: 'ProductModal',
            controllerAs: 'pc',
            size: size,
            resolve: {
              data: function () {
                return pc.data;
              }
            }
          });

          modalInstance.result.then(function () {
            // alert("now I'll close the modal");
          }, function () {
            $log.info('Modal dismissed');
          });
        };
        
        // jQuery(function() { 
        //   $("#sort").DataTable({
        //     columnDefs : [
        //       { type : 'name', targets : [0] }
        //     ],  
        //   });

        // });
      }
    ]
  });

angular.module('products').controller('ProductModal', function ($uibModalInstance, data, Product) {
  var pc = this;
  pc.data = data;
  pc.brands = Product.getAllBrands();
  pc.types = Product.getAllTypes();
  
  pc.ok = function () {
    Product.saveProduct(pc.data);

    $uibModalInstance.close();
  };

  pc.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
