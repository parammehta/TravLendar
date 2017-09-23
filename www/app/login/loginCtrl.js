(function(){
    'use strict';
    angular.module('Login', []);
    angular.module('Login').controller('LoginCtrl', LoginCtrl);
    
    LoginCtrl.$inject = ['$state'];
    
    function LoginCtrl($state){
        var vm = this;
        vm.login = login;
        vm.message = "Hello from Login controller";
        
        function login(){
            $state.go('calendar');
        }
    }
})();