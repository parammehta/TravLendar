/*global angular, $*/

(function () {
    'use strict';
    angular.module('travlendarApp').controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$window', '$http', 'authService', 'profileService'];

    function MainCtrl($window, $http, authService, profileService) {
        var vm = this;

        //variables
        vm.isUserAuthenticated = false;


        //variables for home address
        vm.homeAutocomplete = '';
        vm.homeDetails = {};
        vm.initialHomeAddress = null;

        //variables for work address
        vm.workAutocomplete = '';
        vm.workDetails = {};
        vm.initialAddress = profileService.currentUserLocation ? profileService.currentUserLocation : profileService.getCurrentUserLocation();

        //functions
        vm.logout = logout
        vm.saveUserLocation = saveUserLocation

        authService.authenticate().then(function (data) {
            vm.isUserAuthenticated = data;
            if (vm.isUserAuthenticated) {
                profileService.fetchUserLocations().then(function (data) {
                    if (!data.data.Item) {
                        $('#locationModal').modal('show');
                    } else {
                        profileService.homeLocation = data.data.Item.homeLocation;
                        profileService.workLocation = data.data.Item.workLocation;
                    }
                })
            }
        })

        function saveUserLocation() {
            profileService.saveUserLocation(vm.homeDetails, vm.workDetails).then(function () {
                profileService.homeLocation = vm.homeDetails;
                profileService.workLocation = vm.workDetails;
                $('#locationModal').modal('hide');
            })
        }

        function logout() {
            authService.logout();
        }
    }
})();
