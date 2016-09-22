angular.module('show.controller', [])

	.controller('ShowController', function ($scope, ShowService, $routeParams) {
 
	  $scope.cast = [];
	  $scope.detail = 'null';
	  
      ShowService.get({q: $routeParams.id}, function(response){
      		$scope.cast = [];
		    $scope.detail = response;

			for (var x in response._embedded.cast)
			{
				if(response._embedded.cast[x].character.image != null)
				{
					var newCast = {
	  					"charName" : response._embedded.cast[x].character.name,
	  					"personName" : response._embedded.cast[x].person.name,
	  					"cimage" : response._embedded.cast[x].character.image.medium
		  			}
				}
				else if(response._embedded.cast[x].person.image != null)
				{
					var newCast = {
	  					"charName" : response._embedded.cast[x].character.name,
	  					"personName" : response._embedded.cast[x].person.name,
	  					"cimage" : response._embedded.cast[x].person.image.medium
		  			}
				}
				else
				{
					var newCast = {
	  					"charName" : response._embedded.cast[x].character.name,
	  					"personName" : response._embedded.cast[x].person.name,
	  					"cimage" : "/image/default_img.gif"
		  			}
				}
				$scope.cast.push(newCast);
			}      
//			console.log("object:" + $scope.cast); 
      });
})

.filter('htmlTrim', function(){
  return function(summary){
  //	alert(summary);
    	var rv = summary.replace(/<\/?[^>]+(>|$)/g, "");
    	return rv;
  }
})

.directive('result1', function(){
  return {
    template: '<table>' +
    		  '<tr>'+
    		  '<td>'+
    		  	'<tr><td style = "padding:2;"><b><i>{{detail.name}}</i></b></td></tr>' +
    		  	'<tr><td>'+
    		  		'<div ng-repeat = "t in detail.genres" style = "float:left;padding:0;">{{t | htmlTrim}} |</div>' +
    		  	'</td></tr>'+
    		  	'<tr><td style = "padding:2;"><img ng-src="{{detail.image.medium}}"></img></td></tr>' +
    		  '<td/>'+

    		  '<td>'+
    		  		'<table>'+
    		   			'<tr><td style = "padding:5;">{{detail.summary | htmlTrim}}</td></tr>' +
 			  			'<tr><td style = "padding:5;"><b><u>CAST</u></b></td></tr>' +
 			  			'<tr>'+
    		  				'<td><div ng-repeat="x in cast">' +
    		   					'<img src="{{x.cimage}}" style="width:60px;height:60px; padding:5;"></img>' +
    		  					'{{x.personName}}'+
    		  					' in as ' +
    		  					'{{x.charName}}.'+
    		  				'</div></td>' + 
    		  			'</tr>' + 			  
 			 		'</table>'+
    		  '</td>'+
    		  '</tr>'+
	          '</table>' 
	};
});
