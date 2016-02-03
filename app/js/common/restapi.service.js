
console.log("load plz");
angular.module('app')
	.factory(RestApiShit, 'RestApiShit');

console.log("load?");

RestApiShit.$inject = ['$resource'];

function RestApiShit($resource) {
	console.log("load this fucking code");
	var factory = {
		getBlogsData: getBlogsData
	}
	
	var blogServer = 'http://localhost:8080/api';
	
	var getAll = $resource(blogServer + '/blogs/');
	
	return factory;
	
	function getBlogsData() {
		var returns = getAll.get();
		console.log("method called");
		console.log(returns);
	}
}