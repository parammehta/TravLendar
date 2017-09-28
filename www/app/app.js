(function () {
    'use strict'
    angular.module('travlendarApp', ['Login', 'Calendar', 'ui.router', 'mwl.calendar', 'ui.bootstrap']);

    angular.module('travlendarApp').config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/calendar");
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
