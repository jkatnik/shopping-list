(function() {
	'use strict';

	angular
		.module('ShoppingListApp', ['ui.router'])
		.config(function($stateProvider) {
			$stateProvider
				.state({
					name: 'edycja',
					url: '/',
					templateUrl: 'edycja.html'
				})
				.state({
					name: 'zakupy',
					url: '/zakupy',
					templateUrl: 'zakupy.html'
				});
		})
		.controller('ShoppingListCtrl', ShoppingListCtrl)
		.controller('ShoppingCtrl', ShoppingCtrl)
		.service('shoppingListService', ShoppingListService)
		.constant('apiBasePath', 'http://katnik.pl/shopping-list');

	ShoppingListCtrl.$inject = ['shoppingListService', 'apiBasePath'];
	function ShoppingListCtrl(shoppingListService, apiBasePath) {
		var ctrl = this;

		shoppingListService.getItems().then(function(items) {
			console.log('getItems in ShoppingListCtrl');
			ctrl.items = items;
		});

		ctrl.toggle = function(item) {
			item.selected = !item.selected;
			item.bought = item.bought && item.selected;
			shoppingListService.updateSelection(item);
		}
	}


	ShoppingListService.$inject = ['$http', 'apiBasePath', '$q'];
	function ShoppingListService($http, apiBasePath, $q) {
		var service = this;
		service.list = [];

		service.getItems = function() {
			return $http.get(apiBasePath + '/ctrl.php?action=wczytaj')
				.then(function (response) {
					service.list = response.data.items;
					return service.list;
				});
		}

		service.getSelectedItems = function() {
			return service.list.filter(function (item) {
				return item.selected
			});
		}

		service.updateSelection = function(item) {
			$http
				.get(apiBasePath + '/ctrl.php?action=przelacz', {
					params: {
						id: item.id,
						selected: item.selected,
						bought: false
					}
				});
		}
		service.updateBought = function (item) {
			$http
				.get(apiBasePath + '/ctrl.php?action=przelacz', {
					params: {
						id: item.id,
						bought: item.bought
					}
				});
		}
	}

	ShoppingCtrl.$inject = ['shoppingListService'];
	function ShoppingCtrl(shoppingListService) {
		var ctrl = this;
		ctrl.items = shoppingListService.getSelectedItems();

		ctrl.toggle = function(item) {
			item.bought = !item.bought;
			shoppingListService.updateBought(item);
		}
	}
})();
