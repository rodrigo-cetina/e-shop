'use strict';

angular.
  module('core.product', ['LocalStorageModule']).
  factory('Product', ['$resource', 'localStorageService',
    function($resource, localStorageService) {
      var productService = {};
      productService.keyBrands = 'brands';
      productService.keyTypes = 'types';
      productService.keyProducts = 'products';
      productService.keyBasket = 'basket';

      productService.resourceBrands = $resource('data/products/:nameFile.json', {}, {
        query: {
          method: 'GET',
          params: {nameFile: 'brands'},
          isArray: true
        }
      });

      productService.resourceTypes = $resource('data/products/:nameFile.json', {}, {
        query: {
          method: 'GET',
          params: {nameFile: 'types'},
          isArray: true
        }
      });

      productService.resourceProducts = $resource('data/products/:nameFile.json', {}, {
        query: {
          method: 'GET',
          params: {nameFile: 'products'},
          isArray: true
        }
      });

      //brands
      if (localStorageService.get(productService.keyBrands)) {
        productService.brands = localStorageService.get(productService.keyBrands);
      } else {
        productService.resourceBrands.query({}, 
          function(response) {
            productService.brands = response;
            localStorageService.set(productService.keyBrands, productService.brands);
          },
          function(response) {
            console.log(response.data);
          }
        );
      }

      //types
      if (localStorageService.get(productService.keyTypes)) {
        productService.types = localStorageService.get(productService.keyTypes);
      } else {
        productService.resourceTypes.query({}, 
          function(response) {
            productService.types = response;
            localStorageService.set(productService.keyTypes, productService.types);
          },
          function(response) {
            console.log(response.data);
          }
        );
      }

      //products
      productService.updateLocalStorageProducts = function() {
        localStorageService.set(productService.keyProducts, productService.products);
      }

      if (localStorageService.get(productService.keyProducts)) {
        productService.products = localStorageService.get(productService.keyProducts);
      } else {
        productService.resourceProducts.query({}, 
          function(response) {
            productService.products = response;
            productService.updateLocalStorageProducts();
          },
          function(response) {
            console.log(response.data);
          }
        );
      }

      productService.getAllProducts = function() {
        return productService.products;
      }

      productService.getProduct = function(sku) {
        return productService.products.filter(function(item) {
          return item.sku === sku
        })[0];
      }

      productService.addProduct = function(newProduct) {
        productService.products.push(newProduct);
        productService.updateLocalStorageProducts();
      }

      productService.deleteProduct = function(product) {
        productService.products = productService.products.filter(function(item) {
          return item.sku !== product.sku
        });
        productService.updateLocalStorageProducts();
        return productService.getAll();
      }

      //basket
      productService.updateLocalStorageBasket = function() {
        localStorageService.set(productService.keyBasket, productService.basket);
      }

      if (localStorageService.get(productService.keyBasket)) {
        productService.basket = localStorageService.get(productService.keyBasket);
      } else {
        productService.basket = [];
        productService.updateLocalStorageBasket();
      }

      productService.getAllProductsFromBasket = function() {
        return productService.basket;
      }

      productService.getProductFromBasket = function(sku) {
        const existingProduct = productService.basket.filter(function(item) {
          return item.sku === sku
        });

        productService.product = productService.getProduct(sku)
        
        if (existingProduct.length === 0) {
          return {
            sku: productService.product.sku,
            name: productService.product.name,
            price: productService.product.price,
            quantity: 1,
            total: productService.product.price
          }
        } else {
          return existingProduct[0];
        }
      }

      productService.addProductToBasket = function(product) {
        const index = productService.basket.findIndex(item => item.sku === product.sku);
        if (index >= 0) {
          //update
          productService.basket = [
            ...productService.basket.slice(0, index),
            product,
            ...productService.basket.slice(index + 1),
          ];
        } else {
          //add
          productService.basket.push(product);
        }
        productService.updateLocalStorageBasket();
      }

      productService.deleteProductFromBasket = function(product) {
        productService.basket = productService.basket.filter(function(item) {
          return item.sku !== product.sku
        });
        productService.updateLocalStorageBasket();
        return productService.getAllFromBasket();
      }

      productService.calculateOrderSummary = function() {
        return productService.basket.map(function amount(item){
          return item.total;
        }).reduce(function sum(prev, next){
          return prev + next;
        });
      }

      return productService;
    }
  ]);
