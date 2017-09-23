(function(){
    'use strict';
    angular.module('Calendar', []);
    angular.module('Calendar').controller('CalendarCtrl', CalendarCtrl);
    
    CalendarCtrl.$inject = ['CalendarService'];
    
    function CalendarCtrl(CalendarService){
        var vm = this;
        vm.Users = [];
        vm.fetchDummyAPIDetails = fetchDummyAPIDetails;
        this.message = "Hello from Calendar controller";
        
        function fetchDummyAPIDetails(){
            CalendarService.fetchDummyAPIDetails().then(function(data){
                vm.Users = data.data.Items;
            });
        }
    }
})();