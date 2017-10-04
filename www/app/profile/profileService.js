/* global angular*/
(function () {
    'use strict';
    angular.module('Profile').service('profileService', profileService);

    profileService.$inject = ['$http', 'centralAPIService'];

    function profileService($http, centralAPIService) {
        var vm = this;
        vm.fetchUserLocations = fetchUserLocations;
        vm.saveUserLocation = saveUserLocation;

        function fetchUserLocations() {
            return centralAPIService.callAPI('profile', {}, "get");
        }

        function saveUserLocation(homeDetails, workDetails) {
            var payload = {
                operation : "saveLocation",
                homeLocation: {
                    place_id: homeDetails.place_id,
                    formatted_address: homeDetails.formatted_address
                },
                workLocation: {
                    place_id: workDetails.place_id,
                    formatted_address: workDetails.formatted_address
                }
            }
            return centralAPIService.callAPI('profile', payload, "post");
        }
    }
})();
