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
        
        vm.lunchDetails= new Date();
        vm.dinnerDetails= new Date();
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
                        profileService.lunchTime = data.data.Item.lunchTime;
                        profileService.dinnerTime = data.data.Item.dinnerTime;
                        profileService.walkingDistance = data.data.Item.walkingDistance;
                            
                        $rootScope.homeLocation = data.data.Item.homeLocation;
                        $rootScope.workLocation = data.data.Item.workLocation;
                        $rootScope.lunchTime=data.data.Item.lunchTime;
                        $rootScope.dinnerTime= data.data.Item.dinnerTime;
                        $rootScope.walkingDistance= data.data.Item.walkingDistance;
                    }
                })
            }
        })

        function saveUserLocation() {
            profileService.saveUserLocation(vm.homeDetails, vm.workDetails, vm.lunchDetails, vm.dinnerDetails, vm.walkingDistance).then(function () {
                
                profileService.homeLocation = vm.homeDetails;
                profileService.workLocation = vm.workDetails;
                profileService.lunchTime = vm.lunchTime;
                profileService.dinnerTime=vm.dinnerTime;
                profileService.walkingDistance= vm.walkingDistance;
                
                $rootScope.homeLocation = vm.homeDetails;
                $rootScope.workLocation = vm.workDetails;
                $rootScope.lunchTime = vm.lunchTime;
                $rootScope.dinnerTime= vm.dinnerTime;
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
