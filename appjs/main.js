(function() {

    var app = angular.module('MessageApp',['ngRoute']);

    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider, $location) {
        $routeProvider.when('/login', {
            templateUrl: 'pages/login.html',
            controller: 'LoginController',
            controllerAs : 'logingCtrl'
        }).when('/register', {
            templateUrl: 'pages/register.html',
            controller: 'RegisterController',
            controllerAs : 'registerCtrl'
        }).when('/chat', {
            templateUrl: 'pages/chat.html',
            controller: 'ChatController',
            controllerAs : 'chatCtrl'
        }).otherwise({
            redirectTo: '/chat'
        });
    }]);

})();
