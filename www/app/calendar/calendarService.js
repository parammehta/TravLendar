/*global angular, GOOGLE_API_KEY, $*/

(function () {
    angular.module('Calendar').service('CalendarService', CalendarService);

    CalendarService.$inject = ['centralAPIService', '$rootScope', '$http', '$q'];

    function CalendarService(centralAPIService, $rootScope, $http, $q) {
        var vm = this;
        vm.fetchTransitDetails = fetchTransitDetails;

        function fetchTravelModeDetails(travelMode) {
            var deferredObject = $q.defer();
            $http({
                method: 'GET',
                url: "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=place_id:" + vm.originPlaceId + "&destinations=place_id:" + vm.destinationPlaceId + "&mode=" + travelMode + "&key=" + GOOGLE_API_KEY + "&callback",
                headers: {
                    'Authorization': undefined
                }
            }).then(function successCallback(response) {
                deferredObject.resolve(response);
            }, function errorCallback() {});
            return deferredObject.promise;
        }


        function fetchTransitDetails(originPlaceId, destinationPlaceId) {
            var deferredObject = $q.defer();
            vm.originPlaceId = originPlaceId;
            vm.destinationPlaceId = destinationPlaceId;
            $.when(fetchTravelModeDetails("driving"), fetchTravelModeDetails("walking"), fetchTravelModeDetails("bicycling"), fetchTravelModeDetails("transit"))
                .then(function (val1, val2, val3, val4) {
                    var travelModeArray = [];
                    travelModeArray.push({
                        mode : "driving",
                        icon : "car",
                        value : val1.data.rows[0].elements[0]
                    });
                    travelModeArray.push({
                        mode : "walking",
                        icon : "male",
                        value : val2.data.rows[0].elements[0]
                    })
                    travelModeArray.push({
                        mode : "bicycling",
                        icon : "bicycle",
                        value : val3.data.rows[0].elements[0]
                    })
                    travelModeArray.push({
                        mode : "transit",
                        icon : "bus",
                        value : val4.data.rows[0].elements[0]
                    })
                    deferredObject.resolve(travelModeArray);
                })
                .fail(function () {
                })
            return deferredObject.promise;
        }
    }
})();
