(function () {
    'use strict';
    angular.module('Calendar', []);
    angular.module('Calendar').controller('CalendarCtrl', CalendarCtrl);

    CalendarCtrl.$inject = ['CalendarService', 'calendarConfig'];

    function CalendarCtrl(CalendarService, calendarConfig) {
        var vm = this;
        vm.Users = [];
        vm.calendarView = "month";
        vm.viewDate = new Date();

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
