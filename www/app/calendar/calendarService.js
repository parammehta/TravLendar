(function () {
    angular.module('Calendar').service('CalendarService', CalendarService);

    CalendarService.$inject = ['$http', '$q'];

    function CalendarService($http, $q) {
        var vm = this;
        vm.fetchDummyAPIDetails = fetchDummyAPIDetails;

        function fetchDummyAPIDetails() {
            var deferred = $q.defer();
            $http.post(CALENDAR_API).then(function (data) {
                deferred.resolve(data);
            })
            return deferred.promise;
        }
    }
})();
