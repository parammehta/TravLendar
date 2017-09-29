(function(){
    'use strict';
    angular.module('Profile', []);
    angular.module('Profile').controller('ProfileCtrl', ProfileCtrl);
    
    ProfileCtrl.$inject = ['profileService'];
    
    function ProfileCtrl(profileService){
        var vm = this;
        vm.message = "hello";
        vm.fetchLocations = fetchLocations;
        
        function fetchLocations(){
            profileService.fetchLocations();
        }
    }
})();