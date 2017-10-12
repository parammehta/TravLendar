/*global angular, moment, $*/

(function () {
    'use strict';
    angular.module('Calendar', []);
    angular.module('Calendar').controller('CalendarCtrl', CalendarCtrl);

    CalendarCtrl.$inject = ['CalendarService', 'calendarConfig', 'profileService'];

    function CalendarCtrl(CalendarService, calendarConfig, profileService) {
        var vm = this;
        vm.Users = [];
        vm.calendarView = "month";
        vm.selectedPriorLocation = "home";
        vm.viewDate = new Date();
        
        //variables for work address
        vm.meetingAutocomplete = '';
        vm.meetingLocationDetails = {};
        vm.initialAddress = profileService.currentUserLocation ? profileService.currentUserLocation : profileService.getCurrentUserLocation();
                
        $('#meetingStart').datetimepicker({
            allowInputToggle : true,
            sideBySide : true
        });
        $('#meetingEnd').datetimepicker({
            useCurrent: false,
            allowInputToggle : true,
            sideBySide : true
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
    }
})();
