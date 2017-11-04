/*global angular, $, moment*/

(function () {
    'use strict';
    angular.module('Calendar', []);
    angular.module('Calendar').controller('CalendarCtrl', CalendarCtrl);

    CalendarCtrl.$inject = ['CalendarService', 'calendarConfig', 'profileService', '$scope', '$timeout'];

    function CalendarCtrl(CalendarService, calendarConfig, profileService, $scope, $timeout) {
        var vm = this;
        vm.events = [];
        vm.calendarView = "month";
        vm.viewDate = new Date();
        vm.eventLocationDetails = {};
        vm.travelMode = null;
        vm.displayDeleteModal = false;
        vm.displaySuccess = false;
        vm.initialAddress = profileService.currentUserLocation || profileService.getCurrentUserLocation();

        vm.changePriorLocation = changePriorLocation;
        vm.closeMeetingModal = closeMeetingModal;
        vm.closeDeleteModal = closeDeleteModal;
        vm.saveEvent = saveEvent;
        vm.deleteEvent = deleteEvent;
        vm.eventAction = [
            {
                label: '<i class=\'glyphicon glyphicon-pencil event-icon\' title="Delete"></i>'
            },{
                label: '<i class=\'glyphicon glyphicon-trash event-icon\' title="Delete"></i>',
                onClick: function (args) {
                    vm.displayDeleteModal = true;

                    $timeout(function () {
                        $("#modal2").modal('show');
                    }, 100);

                    vm.currentEventId = args.calendarEvent.id;
                }
        }];

        function closeDeleteModal() {
            $("#modal2").modal('hide');
            $timeout(function () {
                vm.displayDeleteModal = false;
            }, 1000);
        }

        init();

        function init() {

            $('#eventStart').datetimepicker({
                allowInputToggle: true,
                sideBySide: true
            });

            $('#eventEnd').datetimepicker({
                useCurrent: false,
                allowInputToggle: true,
                sideBySide: true
            });
            $("#eventStart").on("dp.change", function (e) {
                $('#eventStart').data("DateTimePicker").minDate(moment());
                $('#eventEnd').data("DateTimePicker").minDate(e.date);
                vm.eventForm.eventStart = new Date(e.date).getTime();
                vm.eventStartDate = e.date.format('MM/DD/YYYY h:mm A');
            });
            $("#eventEnd").on("dp.change", function (e) {
                $('#eventStart').data("DateTimePicker").maxDate(e.date);
                vm.eventForm.eventEnd = new Date(e.date).getTime();
                vm.eventEndDate = e.date.format('MM/DD/YYYY h:mm A');
            });

            initEventModal();

            CalendarService.fetchEvents().then(function (data) {
                var eventList = data.data.Items;
                for (var i = 0; i < eventList.length; i++) {
                    vm.events.push({
                        id: eventList[i].id,
                        title: eventList[i].eventTitle,
                        color: calendarConfig.colorTypes.info,
                        startsAt: new Date(eventList[i].eventStart),
                        endsAt: new Date(eventList[i].eventEnd),
                        actions: vm.eventAction
                    });
                }
            })
        }

        function initEventModal() {
            vm.selectedPriorLocation = "home";
            vm.travelModeArray = [];
            vm.otherLocationDetails = {};
            vm.destinationPlaceId = null;
            vm.originPlaceId = null;
            vm.eventStartDate = '';
            vm.eventEndDate = '';
            vm.displayTravelModes = false;
            vm.eventAutocomplete = '';
            vm.otherLocation = '';
            vm.eventForm = {
                eventTitle: "",
                eventStart: null,
                eventEnd: null
            };
            $('#eventStart').data("DateTimePicker").maxDate(false);
            $('#eventStart').data("DateTimePicker").useCurrent(true);
            $('#eventEnd').data("DateTimePicker").minDate(false);
        }

        function closeMeetingModal() {
            $("#eventModal").modal('hide');
            initEventModal();
        }



        function changeLocation() {
            vm.displayTravelModes = false;
            vm.travelMode = null;
            if (!vm.originPlaceId) {
                vm.originPlaceId = profileService.homeLocation.place_id;
            }
            CalendarService.fetchTransitDetails(vm.originPlaceId, vm.destinationPlaceId).then(function (data) {
                vm.travelModeArray = data;
                vm.displayTravelModes = true;
            });
        }

        $scope.$watch(function () {
            return vm.eventLocationDetails.place_id;
        }, function (newValue) {
            if (newValue) {
                vm.destinationPlaceId = newValue;
                changeLocation();
            }
        });

        $scope.$watch(function () {
            return vm.otherLocationDetails.place_id;
        }, function (newValue) {
            if (newValue) {
                vm.originPlaceId = newValue;
                changeLocation();
            }
        });

        function changePriorLocation() {
            vm.displayTravelModes = false;
            vm.travelMode = null;
            vm.otherLocation = null;
            vm.otherLocationDetails = {};
            switch (vm.selectedPriorLocation) {
                case "home":
                    vm.originPlaceId = profileService.homeLocation.place_id;
                    changeLocation();
                    break;
                case "work":
                    vm.originPlaceId = profileService.workLocation.place_id;
                    changeLocation();
                    break;
            }
        }

        function saveEvent() {
            vm.eventForm.originPlaceId = vm.originPlaceId;
            vm.eventForm.destinationPlaceId = vm.destinationPlaceId;
            vm.eventForm.travelMode = {
                mode: vm.travelMode.mode,
                distance: vm.travelMode.value.distance,
                time: vm.travelMode.value.duration
            };
            CalendarService.saveMeeting(vm.eventForm).then(function (data) {
                var id = data.data;
                vm.events.push({
                    id: id,
                    title: vm.eventForm.eventTitle,
                    color: calendarConfig.colorTypes.info,
                    startsAt: new Date(vm.eventForm.eventStart),
                    endsAt: new Date(vm.eventForm.eventEnd),
                    actions: vm.eventAction
                });
                closeMeetingModal();
            });
        }

        function deleteEvent() {
            CalendarService.deleteEvent(vm.currentEventId).then(function (data) {
                if (!data.data.errorMessage) {
                    for (var i = 0; i < vm.events.length; i++) {
                        if (vm.events[i].id === vm.currentEventId) {
                            vm.events.splice(i, 1);
                            vm.successMessage = "Event has been successfully deleted";
                            vm.displaySuccess = true;
                            closeDeleteModal();
                            $timeout(function () {
                                vm.displaySuccess = false;
                            }, 3000)
                            break;
                        }
                    }
                }
            });
        }
    }
})();
