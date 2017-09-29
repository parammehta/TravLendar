(function () {
    'use strict';
    angular.module('Profile').service('profileService', profileService);

    profileService.$inject = ['$http'];

    function profileService($http) {
        var vm = this;
        vm.fetchLocations = fetchLocations;
        
        function fetchLocations() {
            var payload = {

            };

            $http.post('url', payload).then(function (response) {
                console.log(response);
            })
        }
    }
})();
