/*global angular, $, moment */

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
        vm.displayEditModal = false;
        vm.displaySuccess = false;
        vm.initialAddress = profileService.currentUserLocation || profileService.getCurrentUserLocation();
        vm.editEventObject = [];

        vm.changePriorLocation = changePriorLocation;
        vm.closeMeetingModal = closeMeetingModal;
        vm.closeDeleteModal = closeDeleteModal;
        vm.editEvent = editEvent;
        vm.saveEvent = saveEvent;
        vm.deleteEvent = deleteEvent;
        vm.alterEventStart = alterEventStart;
        vm.eventAction = [
            {
                label: '<i class=\'glyphicon glyphicon-pencil event-icon\' title="Edit"></i>',
                onClick: function (args) {
                    vm.displayEditModal = true;
                    vm.currentEventId = args.calendarEvent.id;

                    for (var i = 0; i < vm.events.length; i++) {
                        if (vm.events[i].id === vm.currentEventId) {
                            console.log(vm.events[i]);
                            var editEvent = vm.events[i]
                            vm.selectedPriorLocation = "";
                            vm.travelModeArray = [];
                            vm.otherLocationDetails = {};
                            vm.destinationPlaceId = null;
                            vm.originPlaceId = null;
                            vm.eventStartDate = '';
                            vm.eventEndDate = '';
                            vm.displayTravelModes = true;
                            vm.forceSaveEvent = false;
                            vm.displayModalError = false;
                            vm.scheduleModalError = false;
                            vm.eventAutocomplete = editEvent.destinationPlaceId;
                            vm.otherLocation = '';
                            vm.eventForm = {
                                eventTitle: editEvent.eventTitle,
                                eventStart: null,
                                eventEnd: null
                            };

                            vm.eventStart = new Date(editEvent.eventStart);
                            vm.eventEnd = new Date(editEvent.eventEnd);//moment().add("hours", 1);
                            vm.startDateOptions = {
                                minDate: new Date()
                            }
                            vm.endDateOptions = {
                                minDate: vm.eventStart
                            }
                            break;
                        }
                    }

                    $timeout(function () {
                        $("#eventModal").modal('show');
                    }, 100);

                }
            }, {
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
        
        function closeEditModal() {
            $("#eventModal").modal('hide');
            $timeout(function () {
                vm.displayEditModal = false;
            }, 1000);
            initEventModal();
        }


        init();

        function init() {

            initEventModal();

            CalendarService.fetchEvents().then(function (data) {
                var eventList = data.data.Items;
                for (var i = 0; i < eventList.length; i++) {
                    vm.events.push({
                        id: eventList[i].id,
                        title:eventList[i].eventTitle,
                        color: calendarConfig.colorTypes.info,
                        startsAt: new Date(eventList[i].eventStart),
                        endsAt: new Date(eventList[i].eventEnd),
                        eventTitle: eventList[i].eventTitle,
                        eventStart: eventList[i].eventStart,
                        eventEnd: eventList[i].eventEnd,
                        destinationPlaceId: eventList[i].destination,
                        origin: eventList[i].origin,
                        travelMode: eventList[i].travelMode,
                        actions: vm.eventAction,
                        draggable: true,
                        resizable:true
                    });
                }
            })
        }
        
   vm.eventTimesChanged = function(event) {
        vm.viewDate = event.startsAt;
    CalendarService.saveMeeting(event, vm.forceSaveEvent).then(function (data) {
        console.log(data);
    });
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
            vm.forceSaveEvent = false;
            vm.displayModalError = false;
            vm.scheduleModalError = false;
            vm.eventAutocomplete = '';
            vm.otherLocation = '';
            vm.eventForm = {
                eventTitle: "",
                eventStart: null,
                eventEnd: null
            };

            vm.eventStart = new Date();
            vm.eventEnd = moment().add("hours", 1);
            vm.startDateOptions = {
                minDate: new Date()
            }
            vm.endDateOptions = {
                minDate: vm.eventStart
            }
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
            vm.eventForm.eventStart = new Date(vm.eventStart).getTime();
            vm.eventForm.eventEnd = new Date(vm.eventEnd).getTime();
            vm.eventForm.travelMode = {
                mode: vm.travelMode.mode,
                distance: vm.travelMode.value.distance,
                time: vm.travelMode.value.duration
            };
            CalendarService.saveMeeting(vm.eventForm, vm.forceSaveEvent).then(function (data) {
                if (data.data.errorMessage && data.data.errorMessage == "Conflict") {
                    vm.displayModalError = true;
                    vm.forceSaveEvent = true;
                    vm.scheduleModalError = "This event conflicts with another scheduled event. Click Continue to proceed anyways."
                } else {
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
                    vm.successMessage = "Event has been added successfully";
                    vm.displaySuccess = true;
                    $timeout(function () {
                        vm.displaySuccess = false;
                    }, 3000)
                }
            });
        }

        function alterEventStart() {
            if (new Date(vm.eventStart).getTime() > new Date(vm.eventEnd).getTime()) {
                vm.eventEnd = moment(vm.eventStart).add("hours", 1);
            }
            vm.endDateOptions.minDate = vm.eventStart;
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
        
        function editEvent() {
            console.log("Edit meeting pressed");
            console.log(vm.currentEventId)
            
        }
    }
})();
