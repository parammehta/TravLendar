/* global angular, navigator*/
(function () {
    'use strict';
    angular.module('Profile').service('profileService', profileService);

    profileService.$inject = ['$http', 'centralAPIService', '$rootScope'];

    function profileService($http, centralAPIService, $rootScope) {
        var vm = this;

        vm.currentUserLocation = null;
        vm.homeLocation = null;
        vm.workLocation = null;
        vm.lunchStart = ""; 
        vm.lunchEnd="";
        vm.dinnerStart=null;
        vm.dinnerEnd = null;
        vm.walkingDistance = 0;

        vm.fetchUserLocations = fetchUserLocations;
        vm.saveUserLocation = saveUserLocation;
        vm.getCurrentUserLocation = getCurrentUserLocation;

        function fetchUserLocations() {
            return centralAPIService.callAPI('profile', {}, "get");
        }

        function saveUserLocation(homeDetails, workDetails, lunchStart, lunchEnd, dinnerStart, dinnerEnd, walkingDetails) {

            var payload = {
                operation: "saveProfile",
                homeLocation: {
                    place_id: homeDetails.place_id,
                    formatted_address: homeDetails.formatted_address
                },
                workLocation: {
                    place_id: workDetails.place_id,
                    formatted_address: workDetails.formatted_address
                },
                
                lunchStart: lunchStart, 
                lunchEnd: lunchEnd,
                
                dinnerStart: dinnerStart,
                dinnerEnd:dinnerEnd,
                
                walkingDistance: walkingDetails
                
            }
            $rootScope.homeLocation = homeDetails;
            $rootScope.workLocation = workDetails;
            $rootScope.lunchStart=lunchStart;
            $rootScope.lunchEnd= lunchEnd;
            $rootScope.dinnerStart = dinnerStart;
            $rootScope.dinnerEnd= dinnerEnd; 
            $rootScope.walkingDistance=walkingDetails;
            
            return centralAPIService.callAPI('profile', payload, "post");
        }

        function getCurrentUserLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var geolocation = {
                        initialAddress: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    };
                    vm.currentUserLocation = geolocation;
                    return geolocation;
                });
            } else {
                return {};
            }
        }
    }
})();
