(function () {
    'use strict';
    angular.module('travlendarApp').service('centralAPIService', centralAPIService);

    centralAPIService.$inject = ['$q', '$rootScope'];

    function centralAPIService($q, $rootScope) {
        var vm = this;
        vm.callAPI = callAPI;

        function callAPI(module, payload, method) {
            var deferred = $q.defer();
            var url = CALENDAR_API;
            switch (module) {
                case "calendar":
                    url = CALENDAR_API
                    break;
                default:
                    url = CALENDAR_API
            }
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": url,
                "method": method,
                "headers": {
                    "Authorization": $rootScope.idToken
                },
                "data": payload
            }

            $.ajax(settings).then(function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }
    }
})();
