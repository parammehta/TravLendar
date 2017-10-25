/*global angular, google, $*/

(function () {
    angular.module('Calendar').service('CalendarService', CalendarService);

    CalendarService.$inject = ['centralAPIService', '$rootScope', '$http', '$q'];

    function CalendarService(centralAPIService, $rootScope, $http, $q) {
        var vm = this;
        vm.fetchTransitDetails = fetchTransitDetails;

        function fetchTravelModeDetails(travelMode) {
            var deferredObject = $q.defer();
            var service = new google.maps.DistanceMatrixService();
            var parameter = {
                origins: ["Seattle"], //vm.originPlaceId
                destinations: ["San Fransisco"], //vm.destinationPlaceId
                travelMode: travelMode.toUpperCase(),
                unitSystem: google.maps.UnitSystem.IMPERIAL,
                avoidHighways: false,
                avoidTolls: false
            }
            service.getDistanceMatrix(parameter, function (response, status) {
                if (status != google.maps.DistanceMatrixStatus.OK) {
                    deferredObject.reject(status);
                } else {
                    deferredObject.resolve(response)
                }
            });
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
                        mode: "driving",
                        icon: "car",
                        value: val1.rows[0].elements[0]
                    });
                    travelModeArray.push({
                        mode: "walking",
                        icon: "male",
                        value: val2.rows[0].elements[0]
                    })
                    travelModeArray.push({
                        mode: "bicycling",
                        icon: "bicycle",
                        value: val3.rows[0].elements[0]
                    })
                    travelModeArray.push({
                        mode: "transit",
                        icon: "bus",
                        value: val4.rows[0].elements[0]
                    })
                    deferredObject.resolve(travelModeArray);
                })
                .fail(function () {})
            return deferredObject.promise;
        }
    }
})();
