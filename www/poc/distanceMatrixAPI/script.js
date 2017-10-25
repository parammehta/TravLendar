var testApp = angular.module('testApp', []);


testApp.controller(
    'testController',
    function ($scope,$http) {
        $scope.home = "This is the homepage";
        console.log("Inside the controller");

        function callback(response, status) {
            if (status != google.maps.DistanceMatrixStatus.OK) {
                console.log("ERROR")
            } else {
                var origin = response.originAddresses[0];
                var destination = response.destinationAddresses[0];
                if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
                    console.log("Better get on a plane. There are no roads between "
                        + origin + " and " + destination);
                } else {
                    var distance = response.rows[0].elements[0].distance;
                    var distance_value = distance.value;
                    var distance_text = distance.text;
                    var miles = distance_text.substring(0, distance_text.length - 3);
                    console.log("It is " + miles + " miles from " + origin + " to " + destination);
                }
            }
        }

        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: ["Seattle  "],
                destinations: ["San Fransisco"],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.IMPERIAL,
                avoidHighways: false, avoidTolls: false
            }, callback);

    }
);