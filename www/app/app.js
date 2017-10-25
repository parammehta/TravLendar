/*global angular*/

(function () {
    'use strict'
    angular.module('travlendarApp', ['Calendar', 'Profile', 'ui.router', 'mwl.calendar', 'ui.bootstrap', 'ngPlacesAutocomplete']);

    angular.module('travlendarApp').config(config);
    angular.module('travlendarApp').run(run);

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
        }).state('profile', {
            url: '/profile',
            templateUrl: 'app/profile/profile.html',
            controller: 'ProfileCtrl as profileCtrl'
        });
    }

    run.$inject = ['$rootScope', '$state', '$stateParams'];

    function run($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
})();
