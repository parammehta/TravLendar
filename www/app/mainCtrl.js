/*global angular, $*/

(function () {
    'use strict';
    angular.module('travlendarApp').controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$window', '$http', '$rootScope' , 'authService', 'profileService'];

    function MainCtrl($window, $http, $rootScope, authService, profileService) {
        var vm = this;
        
        //variables
        vm.isUserAuthenticated = false;
        
        
        //variables for home address
        vm.homeAutocomplete = '';
        vm.homeOptions = {};
        vm.homeDetails = {};
        vm.initialHomeAddress = null;
        
        //variables for work address
        vm.workAutocomplete = '';
        vm.workOptions = {};
        vm.workDetails = {};
        vm.initialWorkAddress = null;
        
        //functions
        vm.logout = logout
        vm.saveUserLocation = saveUserLocation
        
        authService.authenticate().then(function(data){
            vm.isUserAuthenticated = data;
            if(vm.isUserAuthenticated){
                profileService.fetchUserLocations().then(function(data){
                    if(!data.data.Item){
                        $('#locationModal').modal('show');
                    } else {
                        $rootScope.homeLocation = data.data.Item.homeLocation;
                        $rootScope.workLocation = data.data.Item.workLocation;
                    }
                })
            }
        })
        
        function saveUserLocation(){
            profileService.saveUserLocation(vm.homeDetails, vm.workDetails).then(function(){
                $('#locationModal').modal('hide');
            })
        }
        
        function logout(){
            authService.logout();
        }
    }
})();
