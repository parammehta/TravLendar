/*global angular*/

(function () {
    'use strict';
    angular.module('Profile', []);
    angular.module('Profile').controller('ProfileCtrl', ProfileCtrl);

    ProfileCtrl.$inject = ['profileService', '$rootScope'];

    function ProfileCtrl(profileService, $rootScope) {
        var vm = this;
        
        //variables for home address
        vm.homeAutocomplete = $rootScope.homeLocation.formatted_address;
        vm.homeOptions = {};
        vm.homeDetails = $rootScope.homeLocation;
        vm.initialHomeAddress = null;

        //variables for work address
        vm.workAutocomplete = $rootScope.workLocation.formatted_address;
        vm.workOptions = {};
        vm.workDetails = $rootScope.workLocation;
        vm.initialWorkAddress = null;

        vm.saveUserLocation = saveUserLocation;

        function saveUserLocation() {
            if (vm.homeDetails.place_id) {
                profileService.saveUserLocation(vm.homeDetails, vm.workDetails).then(function () {
                   $rootScope.homeLocation = vm.homeDetails;
                   $rootScope.workLocation = vm.workDetails;
                })
            }
        }
    }
})();
