'use strict';

// Register `shop` component, along with its associated controller and template
angular.
  module('shop').
  component('shop', {
    templateUrl: 'pages/shop/shop.template.html',
    controller: ['Product',
      function ShopController(Product) {
        this.brands = Product.getAllBrands();
        this.types = Product.getAllTypes();
        this.dataProducts = Product.getAllProducts();
        this.products = [...this.dataProducts];
        this.currentFilterBrand = '';
        this.currentFilterType = '';
        this.currentSortType = '0';

        this.filterByBrand = function(brand) {
          this.currentFilterBrand = brand;
          this.applyFilter();
        };

        this.filterByType = function(type) {
          this.currentFilterType = type;
          this.applyFilter();
        };

        this.applyFilter = function() {
          if (this.currentFilterBrand !== '' && this.currentFilterType !== '') {
            this.products = [...this.dataProducts.filter(x => x.brand === this.currentFilterBrand && x.type === this.currentFilterType)];
          } else if (this.currentFilterBrand !== '') {
            this.products = [...this.dataProducts.filter(x => x.brand === this.currentFilterBrand)];
          } else if (this.currentFilterType !== '') {
            this.products = [...this.dataProducts.filter(x => x.type === this.currentFilterType)];
          } else {
            this.products = [...this.dataProducts];
          }

          this.applySort();
        };

        this.applySort = function() {
          switch (this.currentSortType) {
            case '1':
              this.products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
              break;
            case '2':
              this.products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
              break;
            default:
              this.products.sort((a, b) => a.name.localeCompare(b.name))
              break;
          }
        };

        this.applySort();
      }
    ]
  });
