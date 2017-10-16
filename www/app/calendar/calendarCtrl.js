/*global angular, moment, $*/

(function () {
    'use strict';
    angular.module('Calendar', []);
    angular.module('Calendar').controller('CalendarCtrl', CalendarCtrl);

    CalendarCtrl.$inject = ['CalendarService', 'calendarConfig', 'profileService', '$scope'];

    function CalendarCtrl(CalendarService, calendarConfig, profileService, $scope) {
        var vm = this;
        vm.Users = [];
        vm.calendarView = "month";
        vm.selectedPriorLocation = "home";
        vm.viewDate = new Date();
        vm.travelModeArray = [];
        vm.displayTravelModes = false;

        //variables for work address
        vm.meetingAutocomplete = '';
        vm.meetingLocationDetails = {};
        vm.initialAddress = profileService.currentUserLocation ? profileService.currentUserLocation : profileService.getCurrentUserLocation();
        
        vm.changePriorLocation = changePriorLocation;

        $('#meetingStart').datetimepicker({
            allowInputToggle: true,
            sideBySide: true
        });
        $('#meetingEnd').datetimepicker({
            useCurrent: false,
            allowInputToggle: true,
            sideBySide: true
        });
        $("#meetingStart").on("dp.change", function (e) {
            $('#meetingEnd').data("DateTimePicker").minDate(e.date);
        });
        $("#meetingEnd").on("dp.change", function (e) {
            $('#meetingStart').data("DateTimePicker").maxDate(e.date);
        });

        vm.events = [{
                title: 'Draggable event',
                color: calendarConfig.colorTypes.warning,
                startsAt: moment().startOf('month').toDate()
        },
            {
                title: 'Non-draggable event',
                color: calendarConfig.colorTypes.info,
                startsAt: moment().startOf('month').add(1, 'day').toDate()
            }
        ];
        
        function changeLocation(){
            vm.displayTravelModes = false;
            vm.selectedTravelMode = null;
            if(!vm.originPlaceId){
                vm.originPlaceId = profileService.homeLocation.place_id;
            }
            CalendarService.fetchTransitDetails(vm.originPlaceId, vm.destinationPlaceId).then(function(data){
                vm.travelModeArray = data;
                vm.displayTravelModes = true;
            })
        }

        $scope.$watch(function () {
            return vm.meetingLocationDetails.place_id;
        }, function (newValue) {
            if(newValue){
                vm.destinationPlaceId = newValue;
                changeLocation();  
            }
        });
        
        $scope.$watch(function () {
            return vm.otherLocationDetails.place_id;
        }, function (newValue) {
            if(newValue){
                vm.originPlaceId = newValue;
                changeLocation();  
            }
        });
        
        function changePriorLocation(){
            vm.displayTravelModes = false;
            vm.selectedTravelMode = null;
            vm.otherLocation = null;
            vm.otherLocationDetails = null;
            switch(vm.selectedPriorLocation){
                case "home" :
                    vm.originPlaceId = profileService.homeLocation.place_id;
                    changeLocation();
                    break;
                case "work" :
                    vm.originPlaceId = profileService.workLocation.place_id;
                    changeLocation();
                    break;     
            }
        }
    }
})();
