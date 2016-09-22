angular.module('show.service', [])
	.factory('ShowService', function ($resource) {
		return $resource('/details');
	});
