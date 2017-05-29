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

		ctrl.selected = function(item) {
			return item.selected ? 'btn-success' : 'btn-primary';
		}

		ctrl.toggle = function(item) {
			item.selected = !item.selected;
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
				.get(apiBasePath + '/ctrl.php?action=selected', {
					params: {
						id: item.id,
						selected: item.selected
					}
				});
		}
		service.updateBought = function (item) {
			$http
				.get(apiBasePath + '/ctrl.php?action=bought', {
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
/*
Jabłka
Papryka
Bakłażan
Pomidory
Pieczarki
Por
Szczypiorek
Natka pietruszki
Rzodkiewka
Sałata
Koperek
Seler
Pietruszka
Cebula
Ziemniaki
Kiwi
Pomarańcze
Cytryny
Grejfruty
Banany
Gruszki
bułki hotdogowe
wafle ryżowe
groszek ptysiowy
mąka tortowa
mąka zieminiaczana
cukier
cukier puder
makaron
konfirura jagodowa
konfirura wiśniowa
kukurydza w puszce
groszek w puszce
fasola cayene
Ryż
Kasza
Kasza manna
przecier pomidorowy w kartoniku
pomidory w puszce całe
ketchup
Kamis grill klasyczny
Kamis grill ziołowy
cukier waniliowy
kawa
Cacao
masło
śmietana
jogurty
serek wiejski
ser ulubiony
ser śmietankowy
serek topiony śmietankowy Hohland
cukierki do słoików
Nesquick
Cornfalkes
Makrela w sosie pomidorowym
Sok ananasowy
jajka
makrela
sałatki
pierogi z mięsem
pierogi ruskie
Ser żółty
wędliny
kurczak - noga
kurczak - pierś
mięso
mrożonki
pizza
woda
piwo
kabanosy
folia aluminiowa
papier do pieczenia
woreczki śniadaniowe
Worki
Ściereczki
Gąbki
Ajax do podłóg
Plyn do naczyń
Papier toaletowy
lenor sensitive
Antyperspirant
Mydło
Szampon
Szczoteczki do zębów
Pasta do zębów

*/
