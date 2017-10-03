(function () {
    'use strict';
    angular.module('Profile', []);
    angular.module('Profile').controller('ProfileCtrl', ProfileCtrl);

    ProfileCtrl.$inject = ['profileService'];

    function ProfileCtrl(profileService) {
        var vm = this;
        
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

        vm.submitForm = submitForm;

        function submitForm() {
            console.log(vm.homeDetails);
            console.log(vm.workDetails);
        }
    }
})();
