(function () {
    'use strict'
    angular.module('travlendarApp', ['Login', 'Calendar', 'ui.router']);

    angular.module('travlendarApp').config(config);
    //angular.module('travlendarApp').run(run);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/login");
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'app/login/login.html',
            controller: 'LoginCtrl as loginCtrl'
        }).state('calendar', {
            url: '/calendar',
            templateUrl: 'app/calendar/calendar.html',
            controller: 'CalendarCtrl as calendarCtrl'
        });
    }
})();
