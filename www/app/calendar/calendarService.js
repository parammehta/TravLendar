(function () {
    angular.module('Calendar').service('CalendarService', CalendarService);

    CalendarService.$inject = ['centralAPIService', '$rootScope'];

    function CalendarService(centralAPIService, $rootScope) {
        var vm = this;
        vm.fetchDummyAPIDetails = fetchDummyAPIDetails;

        function fetchDummyAPIDetails() {
            return centralAPIService.callAPI("calendar", {}, "post");
        }
    }
})();
