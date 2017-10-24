/*global angular, GOOGLE_API_KEY, $*/
(function () {
    angular.module('Calendar').service('CalendarService', CalendarService);
    CalendarService.$inject = ['centralAPIService', '$rootScope', '$http', '$q'];

    function CalendarService(centralAPIService, $rootScope, $http, $q) {
        var vm = this;
        vm.fetchTransitDetails = fetchTransitDetails


        /*
        function callback2(response, status) {
            if (status != google.maps.DistanceMatrixStatus.OK) {
                console.log("ERROR")
            } else {
                if (response.rows[0].elements[0].status === "ZERO_RESULTS") {

                } else {
                    var distance = response.rows[0].elements[0].distance;
                    var distance_value = distance.value;
                    var distance_text = distance.text;
                    var miles = distance_text.substring(0, distance_text.length - 3);
                    console.log("It is " + miles + " miles from " + origin + " to " + destination);

                    val1x=response.rows[0].elements[0];
                }
            }
        }

        function callback1(response, status) {
           answer ="--"
            if (status != google.maps.DistanceMatrixStatus.OK) {
                console.log("ERROR")
            } else {
                if (!(response.rows[0].elements[0].status === "ZERO_RESULTS")) {
                    var distance = response.rows[0].elements[0].distance;
                    var distance_value = distance.value;
                    var distance_text = distance.text;
                    var miles = distance_text.substring(0, distance_text.length - 3);
                    answer=distance_text
                }
            }
            // dic["DRIVING"] = answer
            // fetchTravelModeDetails2("WALKING")
        }

        function callback2(response, status) {
            answer ="--"
            if (status != google.maps.DistanceMatrixStatus.OK) {
                console.log("ERROR")
            } else {
                if (!(response.rows[0].elements[0].status === "ZERO_RESULTS")) {
                    var distance = response.rows[0].elements[0].distance;
                    var distance_value = distance.value;
                    var distance_text = distance.text;
                    var miles = distance_text.substring(0, distance_text.length - 3);
                    answer = distance_value
                }
            }
            dic["WALKING"] = answer

        }

        function fetchTravelModeDetails2(travelMode) {
            var service = new google.maps.DistanceMatrixService();
            parameter = requestParameter(vm.originPlaceId, vm.destinationPlaceId, travelMode)
            service.getDistanceMatrix(parameter,callback2);
        }


        function fetchTravelModeDetails(travelMode) {
            var service = new google.maps.DistanceMatrixService();
            parameter = requestParameter(vm.originPlaceId, vm.destinationPlaceId, travelMode)
            service.getDistanceMatrix(parameter,callback1);
        }
    */

        var d = $.Deferred();
        function requestParameter(origins, destination, travelMode){

            return {
                origins: ["place_id:"+origins],
                destinations: ["place_id:"+destination],
                travelMode: travelMode,
                unitSystem: google.maps.UnitSystem.IMPERIAL,
                avoidHighways: false, avoidTolls: false
            }
        }

        function fetchTransitDetails(originPlaceId, destinationPlaceId) {
            var deferredObject = $q.defer();
            vm.originPlaceId = originPlaceId;
            vm.destinationPlaceId = destinationPlaceId;

            var service = new google.maps.DistanceMatrixService();
            parameter = requestParameter(vm.originPlaceId, vm.destinationPlaceId, "DRIVING")

            service.getDistanceMatrix(parameter,  function(response, status){
                if (status != google.maps.DistanceMatrixStatus.OK) {
                    d.reject(status);
                } else {
                    var travelModeArray = [];

                    travelModeArray.push({
                        mode : "DRIVING",
                        icon : "car",
                        value : response
                    });
                    travelModeArray.push({
                        mode : "WALKING",
                        icon : "male",
                        value : response
                    })
                    travelModeArray.push({
                        mode : "BICYCLING",
                        icon : "bicycle",
                        value : response
                    })
                    travelModeArray.push({
                        mode : "TRANSIT",
                        icon : "bus",
                        value : response
                    })
                    d.resolve(travelModeArray);
                }
            });
            return d.promise();
        }


            // $.when(fetchTravelModeDetails("DRIVING"))
            //     .then(function() {
            //
            //         deferredObject.resolve(travelModeArray);
            //     })
            //     .fail(function () {
            //     })
            //
//            return deferredObject.promise;
        }

})();
