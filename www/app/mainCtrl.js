(function () {
    'use strict';
    angular.module('travlendarApp').controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$window', '$http', '$rootScope' , 'authService'];

    function MainCtrl($window, $http, $rootScope, authService) {
        var vm = this;
        vm.logout = logout
        vm.isUserAuthenticated = false;
        authService.authenticate().then(function(data){
            vm.isUserAuthenticated = data;
        })
        
        function logout(){
            authService.logout();
        }
    }
})();
