
  angular
    .module('app',['ngRoute'])
    .config(config);
 // .controller('BlogController', BlogController);

config.$inject = ['$routeProvider'];

  function config($routeProvider) {

    $routeProvider
      // Home
      .when("/", {
		templateUrl: "partials/home.html",
	//	controller: "HomeController",
	//	controllerAs: 'homectrl'
	})
  
      // Pages
      .when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl"})
      .when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
  
      // Blog
      .when("/blog", {templateUrl: "partials/blog.html", controller: "BlogCtrl"})
      .when("/blog/post", {templateUrl: "partials/blog_item.html", controller: "BlogCtrl"})
  
      // else 404
      .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
  }

/**
 * Controls the Blog
 */
//function BlogController() {
//  console.log("Blog Controller reporting for duty.");
//}

/*
 * Controls all other Pages
 
app.controller('PageCtrl', function () {
  console.log("Page Controller reporting for duty.");

  // Activates the Carousel
  $('.carousel').carousel({
    interval: 5000
  });

  // Activates Tooltips for Social Links
  $('.tooltip-social').tooltip({
    selector: "a[data-toggle=tooltip]"
  })
});*/