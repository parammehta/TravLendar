(function(){
    'use strict';
    angular.module('travlendarApp').controller('MainCtrl', MainCtrl);
    
    MainCtrl.$inject = [];
    
    function MainCtrl(){
        var vm = this;
        this.message = "Hello from main controller";
    }
})();