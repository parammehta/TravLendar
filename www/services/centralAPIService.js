/*global angular, CALENDAR_API, PROFILE_API*/

(function () {
    'use strict';
    angular.module('travlendarApp').service('centralAPIService', centralAPIService);

    centralAPIService.$inject = ['$q', '$rootScope', 'authService', '$http'];

    function centralAPIService($q, $rootScope, authService, $http) {
        var vm = this;
        vm.callAPI = callAPI;

        function callAPI(module, payload, method, deferred) {
            var deferredObject = deferred ? deferred : $q.defer();
            var url = CALENDAR_API;
            switch (module) {
                case "calendar":
                    url = CALENDAR_API;
                    break;
                case "profile":
                    url = PROFILE_API;
                    break;
                default:
                    url = CALENDAR_API;
            }
            
            $http[method](url, payload).then(function(response){
                deferredObject.resolve(response);
            }, function(response){
                if (response.status === 401 && response.data.message === "Identity token has expired") {
                    authService.refresh().then(function () {
                        callAPI(module, payload, method, deferredObject);
                    });
                }
            })
            /*var settings = {
                "async": true,
                "crossDomain": true,
                "url": url,
                "method": method,
                "headers": {
                    "Authorization": $rootScope.idToken
                },
                "data": payload
            };

            $.ajax(settings).done(function (response) {
                deferredObject.resolve(response);
            }).fail(function (response) {
                if (response.status === 401 && response.responseJSON.message === "Identity token has expired") {
                    authService.refresh().then(function () {
                        callAPI(module, payload, method, deferredObject);
                    });
                }
            });*/
            return deferredObject.promise;
        }
    }
})();
