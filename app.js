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
		.service('shoppingListService', ShoppingListService);

	ShoppingListCtrl.$inject = ['shoppingListService', '$http'];
	function ShoppingListCtrl(shoppingListService, $http) {
		var ctrl = this;


		ctrl.items = shoppingListService.getItems();

		$http
			.get('http://katnik.pl/shopping-list/ctrl.php?action=wczytaj')
			.then(function (resp) {
				ctrl.items = resp.data.items;
			})


		ctrl.selected = function(item) {
			return item.selected ? 'btn-success' : 'btn-primary';
		}
	}

	function ShoppingListService() {
		var service = this;
		service.list = ITEMS;

		service.getItems = function() {
			return service.list;
		}

		service.getSelectedItems = function() {
			return service.list.filter(function (item) {
				return item.selected
			});
		}
	}

	ShoppingCtrl.$inject = ['shoppingListService'];
	function ShoppingCtrl(shoppingListService) {
		var ctrl = this;
		ctrl.items = shoppingListService.getSelectedItems();

		ctrl.bought = function(item) {
			return item.bought ? 'btn-success' : 'btn-danger';
		}
	}





	var ITEMS = [{ id: '', name: 'Jabłka', selected: false},
		{ id: '', name: 'Papryka', selected: false},
		{ id: '', name: 'Bakłażan', selected: false},
		{ id: '', name: 'Pomidory', selected: false},
		{ id: '', name: 'Pieczarki', selected: false},
		{ id: '', name: 'Szczypiorek', selected: false},
		{ id: '', name: 'Natka pietruszki', selected: false},
		{ id: '', name: 'Rzodkiewka', selected: false},
		{ id: '', name: 'Sałata', selected: false},
		{ id: '', name: 'Koperek', selected: false},
		{ id: '', name: 'Seler', selected: false},
		{ id: '', name: 'Pietruszka', selected: false},
		{ id: '', name: 'Cebula', selected: false},
		{ id: '', name: 'Ziemniaki', selected: false},
		{ id: '', name: 'Kiwi', selected: false},
		{ id: '', name: 'Pomarańcze', selected: false},
		{ id: '', name: 'Cytryny', selected: false},
		{ id: '', name: 'Grejfruty', selected: false},
		{ id: '', name: 'Banany', selected: false},
		{ id: '', name: 'Gruszki', selected: false},
		{ id: '', name: 'bułki hotdogowe', selected: false},
		{ id: '', name: 'wafle ryżowe', selected: false},
		{ id: '', name: 'groszek ptysiowy', selected: false},
		{ id: '', name: 'mąka', selected: false},
		{ id: '', name: 'cukier', selected: false},
		{ id: '', name: 'makaron', selected: false},
		{ id: '', name: 'Ryż', selected: false},
		{ id: '', name: 'Kasza', selected: false},
		{ id: '', name: 'Kasza manna', selected: false},
		{ id: '', name: 'przecier pomidorowy w kartoniku', selected: false},
		{ id: '', name: 'pomidory w puszce całe', selected: false},
		{ id: '', name: 'ketchup', selected: false},
		{ id: '', name: 'kawa', selected: false},
		{ id: '', name: 'Cacao', selected: false},
		{ id: '', name: 'masło', selected: false},
		{ id: '', name: 'śmietana', selected: false},
		{ id: '', name: 'jogurty', selected: false},
		{ id: '', name: 'serek wiejski', selected: false},
		{ id: '', name: 'ser ulubiony', selected: false},
		{ id: '', name: 'ser śmietankowy', selected: false},
		{ id: '', name: 'Nesquick', selected: false},
		{ id: '', name: 'Cornfalkes', selected: false},
		{ id: '', name: 'Makrela w sosie pomidorowym', selected: false},
		{ id: '', name: 'Sok ananasowy', selected: false},
		{ id: '', name: 'jajka', selected: false},
		{ id: '', name: 'makrela', selected: false},
		{ id: '', name: 'sałatki', selected: false},
		{ id: '', name: 'pierogi', selected: false},
		{ id: '', name: 'Ser żółty', selected: false},
		{ id: '', name: 'wędliny', selected: false},
		{ id: '', name: 'kurczak', selected: false},
		{ id: '', name: 'mięso', selected: false},
		{ id: '', name: 'mrożonki', selected: false},
		{ id: '', name: 'pizza', selected: false},
		{ id: '', name: 'woda', selected: false},
		{ id: '', name: 'piwo', selected: false},
		{ id: '', name: 'Antyperspirant', selected: false},
		{ id: '', name: 'Mydło', selected: false},
		{ id: '', name: 'Szampon', selected: false},
		{ id: '', name: 'Szczoteczki do zębów', selected: false},
		{ id: '', name: 'Pasta do zębów', selected: false},
		{ id: '', name: 'Worki', selected: false},
		{ id: '', name: 'Ściereczki', selected: false},
		{ id: '', name: 'Gąbki', selected: false},
		{ id: '', name: 'Plyn do naczyń', selected: false}];

})();