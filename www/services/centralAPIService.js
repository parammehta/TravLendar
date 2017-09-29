(function () {
    'use strict';
    angular.module('travlendarApp').service('centralAPIService', centralAPIService);

    centralAPIService.$inject = ['$q', '$rootScope', 'authService'];

    function centralAPIService($q, $rootScope, authService) {
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

            $.ajax(settings).done(function (response) {
                deferred.resolve(response);
            }).fail(function(response){
                if(response.status === 401 && response.responseJSON.message === "Identity token has expired"){
                    authService.refresh().then(function(data){
                        console.log(data);
                        callAPI(module, payload, method);
                    })
                }
            });
            return deferred.promise;
        }
    }
})();
