/*global angular*/

(function () {
    'use strict';
    angular.module('Profile', []);
    angular.module('Profile').controller('ProfileCtrl', ProfileCtrl);
    
    ProfileCtrl.$inject = ['profileService', '$timeout', '$scope'];
    

    function ProfileCtrl(profileService, $timeout) {
        var vm = this;
        vm.displaySuccess = false;
        vm.saveUserLocation = saveUserLocation;
        vm.valueEntered=false;
        
        vm.value=10;
        vm.walkingOptions={
            floor: 0,
            ceil: 10,
            step: 1,
            showTicksValues: 1
        
        }
        
        var lunchTime=[];
        lunchTime.push(new Date((2017,1,1)+ 11*60*60*1000).toLocaleTimeString('en-US', { timeZone: 'UTC',hour: 'numeric', hour12: true, minute: 'numeric' }));
        for (var i = 1; i <= 16; i++) {
            lunchTime.push(new Date((2017, 1, 1)+ 11*60*60*1000 + 15*i*60*1000).toLocaleTimeString('en-US', { timeZone: 'UTC', hour: 'numeric', hour12: true, minute: 'numeric' }));
        }
        
        vm.lunchStart=lunchTime[0]
        vm.lunchEnd=lunchTime[2]
        vm.LunchOptions = {
                floor: lunchTime[0],
                ceil: lunchTime[16],
                stepsArray: lunchTime,
             draggableRangeOnly:true,
        };
        
        var dinnerTime=[];
        dinnerTime.push(new Date((2017,1,1)+ 18*60*60*1000 ).toLocaleTimeString('en-US', { timeZone: 'UTC',hour: 'numeric', hour12: true, minute: 'numeric' }));
        for (i = 1; i <= 16; i++) {
            dinnerTime.push(new Date((2017, 1, 1)+ 18*60*60*1000 + 15*i*60*1000).toLocaleTimeString('en-US', { timeZone: 'UTC', hour: 'numeric', hour12: true, minute: 'numeric' }));
        }
        
        vm.dinnerStart=dinnerTime[0]
        vm.dinnerEnd=dinnerTime[2]
        vm.DinnerOptions = {
                floor: dinnerTime[0],
                ceil: dinnerTime[16],
                stepsArray: dinnerTime,
             draggableRangeOnly:true,
               
        };
        
        if (!profileService.homeLocation) {
            profileService.fetchUserLocations().then(function (data) {
                if (data.data.Item) {
                    profileService.homeLocation = data.data.Item.homeLocation;
                    profileService.workLocation = data.data.Item.workLocation;
                    profileService.lunchStart = data.data.Item.lunchStart;
                    profileService.lunchEnd=data.data.Item.lunchEnd;
                    profileService.dinnerStart = data.data.Item.dinnerStart;
                    profileService.dinnerEnd= data.data.Item.dinnerEnd;
                    profileService.walkingDistance = data.data.Item.walkingDistance;
                    initializeAddress();
                }
            });
        } else {
            initializeAddress();
        }
        
        function initializeAddress() {
            //variables for home address
            vm.homeAutocomplete = profileService.homeLocation.formatted_address;
            vm.homeDetails = profileService.homeLocation;
            
            //variables for work address
            vm.workAutocomplete = profileService.workLocation.formatted_address;
            vm.workDetails = profileService.workLocation;
            vm.initialAddress = profileService.currentUserLocation ? profileService.currentUserLocation : profileService.getCurrentUserLocation();
            
            //variable for lunch time
            vm.lunchStart= profileService.lunchStart;
            vm.lunchEnd= profileService.lunchEnd;
            
            //variable for walkingDistance
            vm.walkingDistance= profileService.walkingDistance;
            
            //variable for dinner time
            vm.dinnerStart= profileService.dinnerStart;
            vm.dinnerEnd=profileService.dinnerEnd;
        }


        function saveUserLocation() {
            if (vm.homeDetails.place_id) {
                profileService.saveUserLocation(vm.homeDetails, vm.workDetails, vm.lunchStart, vm.lunchEnd, vm.dinnerStart, vm.dinnerEnd, vm.walkingDistance).then(function () {
                    profileService.homeLocation = vm.homeDetails;
                    profileService.workLocation = vm.workDetails;
                    profileService.lunchStart = vm.lunchStart;
                    profileService.lunchEnd= vm.lunchEnd;
                    profileService.dinnerStart= vm.dinnerStart;
                    profileService.dinnerEnd=vm.dinnerEnd;
                    profileService.walkingDistance = vm.walkingDistance;
                    
                    vm.displaySuccess = true;
                    $timeout(function () {
                        vm.displaySuccess = false;
                    }, 5000)
                })
            }
        }
    }
})();
