angular.module('search.controller', [])

	.controller('SearchController', function ($scope, SearchService, $location) {

    $scope.disp=[];
    $scope.findshows = function(){
    	$scope.disp = [];
		SearchService.query({sname: $scope.sname}, function(response){
        var i =0;
        	while(i<response.length){

	          $scope.disp.push(response[i].show);
   		       i++;
        	}
		});
	}

    $scope.getDetails = function(id) {

      $location.url("shows/" + id);
    }
})

.filter('htmlTrim', function(){
  return function(summary){
    	var rv = summary.replace(/<\/?[^>]+(>|$)/g, "");
    	return rv;

  }
})

.directive('result', function(){

  return {
    template: '<div ng-repeat="s in disp">' +
    		  '<table>' +
    		  '<tr>' +
    		  '<td><img src="{{s.image.medium}}"></img></td>' +
    		  '<td><table>'+
    		  '<tr><td><b><i>{{s.name}}</i></b></td></tr><br/>' +
    		  '<tr>'+
    		  '<td><div ng-repeat = "t in s.genres" style = "float:left">{{t | htmlTrim}} |</div></td>' +
    		  '</tr><br/>'+
 			  '<tr><td>{{s.summary | htmlTrim}}</td></tr><br/>' +
    		  '<tr><td><button ng-click="getDetails(s.id)" style="float:right;">Details</button></td></tr><br/>' +
	          '</table>'+
	          '</td></tr>'+
	          '</table>' +
	          '<br/>' +
    		  '</div>'
  };
});
