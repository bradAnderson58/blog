//(function() {
angular.module('app').controller(HomeController, "HomeController");

HomeController.$inject = ['RestApi'];

function HomeController(RestApi) {
	console.log("imma home controller yo");
	
	var vm = this;
	
	vm.deleteNode = deleteNode;
	vm.addNode = addNode;
	vm.showChildrens = showChildrens;
	vm.openArchive = openArchive;
	
	RestApi.getBlogsData();
	
	vm.tree = [
		{
			name: '2016',
			nodes: [
				{
					name: 'first poast',
					nodes: []
				}
			]
		}
	]
	
	var treeShow = {};
	for (data in vm.tree)
		treeShow[vm.tree[data].name] = false;
	
	function deleteNode() {
		// TODO expresses
	}
	function addNode() {
		// TODO expresses
	}
	
	function showChildrens(data) {
		treeShow[data.name] = !treeShow[data.name];
	}
	
	function openArchive(data) {
		return treeShow[data.name];
	}
}
	//})();