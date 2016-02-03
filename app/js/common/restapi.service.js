
angular.module('app')
	.factory('RestApi', RestApi);

RestApi.$inject = ['$resource'];

function RestApi($resource) {
	console.log("load this fucking code");
	var factory = {
		getBlogsData: getBlogsData
	}
	
	var blogServer = 'http://localhost:8080/api';
	
	var getAll = $resource(blogServer + '/blogs/',
						   {
								blogId: '@id'
							},
						   {
								get: {method: 'GET', isArray: true}
						   });
	
	return factory;
	
	function getBlogsData() {
		getAll.get().$promise.then(function(data) {
			console.log(data);
		});
		console.log("method called");
	}
}