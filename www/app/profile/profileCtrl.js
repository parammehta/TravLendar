/*global angular*/

(function () {
    'use strict';
    angular.module('Profile', []);
    angular.module('Profile').controller('ProfileCtrl', ProfileCtrl);

    ProfileCtrl.$inject = ['profileService', '$timeout'];

    function ProfileCtrl(profileService, $timeout) {
        var vm = this;
        vm.displaySuccess = false;
        vm.saveUserLocation = saveUserLocation;

        if (!profileService.homeLocation) {
            profileService.fetchUserLocations().then(function (data) {
                if (data.data.Item) {
                    profileService.homeLocation = data.data.Item.homeLocation;
                    profileService.workLocation = data.data.Item.workLocation;
                    initializeAddress();
                }
            })
        } else {
            initializeAddress();
        }

        function initializeAddress() {
            //variables for home address
            vm.homeAutocomplete = profileService.homeLocation.formatted_address;
            vm.homeDetails = profileService.homeLocation;

            //variables for work address
            vm.workAutocomplete = profileService.workLocation.formatted_address;
            vm.workDetails = profileService.workLocation;
            vm.initialAddress = profileService.currentUserLocation ? profileService.currentUserLocation : profileService.getCurrentUserLocation();
        }


        function saveUserLocation() {
            if (vm.homeDetails.place_id) {
                profileService.saveUserLocation(vm.homeDetails, vm.workDetails).then(function () {
                    profileService.homeLocation = vm.homeDetails;
                    profileService.workLocation = vm.workDetails;
                    vm.displaySuccess = true;
                    $timeout(function () {
                        vm.displaySuccess = false;
                    }, 5000)
                })
            }
        }
    }
})();
