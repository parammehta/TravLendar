/*global angular, $*/

(function () {
    'use strict';
    angular.module('travlendarApp').controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$window', '$http', 'authService', 'profileService', '$timeout', '$rootScope'];

    function MainCtrl($window, $http, authService, profileService, $timeout, $rootScope) {
        var vm = this;

        //variables
        vm.isUserAuthenticated = false;
        vm.displayLocationModal = false;


        //variables for home address
        vm.homeAutocomplete = '';
        vm.homeDetails = {};
        //variables for work address
        vm.workAutocomplete = '';
        vm.workDetails = {};
        vm.initialAddress = profileService.currentUserLocation ? profileService.currentUserLocation : profileService.getCurrentUserLocation();
        
        vm.lunchStart="11:00 AM";
        vm.lunchEnd= "11:30 AM";
        vm.dinnerStart="6:00 PM";
        vm.dinnerEnd="6:30 PM";
        vm.walkingDistance=0;

        //functions
        vm.logout = logout
        vm.saveUserLocation = saveUserLocation

        authService.authenticate().then(function (data) {
            vm.isUserAuthenticated = data;
            if (vm.isUserAuthenticated) {
                profileService.fetchUserLocations().then(function (data) {
                    if (!data.data.Item) {
                        vm.displayLocationModal = true;
                        $timeout(function () {
                            $('#locationModal').modal('show');
                        })

                    } else {
                        profileService.homeLocation = data.data.Item.homeLocation;
                        profileService.workLocation = data.data.Item.workLocation;
                        profileService.lunchStart = data.data.Item.lunchStart;
                        profileService.lunchEnd=data.data.Item.lunchEnd;
                        profileService.dinnerStart = data.data.Item.dinnerStart;
                        profileService.dinnerEnd= data.data.Item.dinnerEnd;
                        profileService.walkingDistance = data.data.Item.walkingDistance;
                            
                        $rootScope.homeLocation = data.data.Item.homeLocation;
                        $rootScope.workLocation = data.data.Item.workLocation;
                        $rootScope.lunchStart=data.data.Item.lunchStart;
                        $rootScope.lunchEnd=data.data.Item.lunchEnd;
                        $rootScope.dinnerStart= data.data.Item.dinnerStart;
                        $rootScope.dinnerEnd=data.data.Item.dinnerEnd;
                        $rootScope.walkingDistance= data.data.Item.walkingDistance;
                    }
                })
            }
        })

        function saveUserLocation() {

            profileService.saveUserLocation(vm.homeDetails, vm.workDetails, vm.lunchStart, vm.lunchEnd, vm.dinnerStart, vm.dinnerEnd , vm.walkingDistance).then(function () {

          
                
                profileService.homeLocation = vm.homeDetails;
                profileService.workLocation = vm.workDetails;
                profileService.lunchStart = vm.lunchStart;
                profileService.lunchEnd=vm.lunchEnd;
                profileService.dinnerStart=vm.dinnerStart;
                profileService.dinnerEnd=vm.dinnerEnd;
                profileService.walkingDistance= vm.walkingDistance;
                
                $rootScope.homeLocation = vm.homeDetails;
                $rootScope.workLocation = vm.workDetails;
                $rootScope.lunchStart = vm.lunchStart;
                $rootScope.lunchEnd=vm.lunchEnd;
                $rootScope.dinnerStart=vm.dinnerStart;
                $rootScope.dinnerEnd= vm.dinnerEnd;
                $rootScope.walkingDistance = vm.walkingDistance;
                
                $('#locationModal').modal('hide');
                $timeout(function () {
                    vm.displayLocationModal = false;
                },3000)
            })
        }

        function logout() {
            authService.logout();
        }
    }
})();
