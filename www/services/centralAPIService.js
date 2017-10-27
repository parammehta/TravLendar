/*global angular, CALENDAR_API, PROFILE_API, EVENTS_API*/

(function () {
    'use strict';
    angular.module('travlendarApp').service('centralAPIService', centralAPIService);

    centralAPIService.$inject = ['$q', '$rootScope', 'authService', '$http'];

    function centralAPIService($q, $rootScope, authService, $http) {
        var vm = this;
        vm.callAPI = callAPI;

        function callAPI(module, payload, method, deferred) {
            $rootScope.displayLoader = true;
            var deferredObject = deferred ? deferred : $q.defer();
            var url = CALENDAR_API;
            switch (module) {
                case "calendar":
                    url = CALENDAR_API;
                    break;
                case "profile":
                    url = PROFILE_API;
                    break;
                case "events":
                    url = EVENTS_API;
                    break;
                default:
                    url = CALENDAR_API;
            }

            $http[method](url, payload).then(function (response) {
                $rootScope.displayLoader = false;
                deferredObject.resolve(response);
            }, function (response) {
                authService.refresh().then(function () {
                    callAPI(module, payload, method, deferredObject);
                }, function (response) {
                    window.location.replace(AUTH_URL + REDIRECT_URI + "&response_type=code");
                });
                $rootScope.displayLoader = false;
            })
            return deferredObject.promise;
        }
    }
})();
