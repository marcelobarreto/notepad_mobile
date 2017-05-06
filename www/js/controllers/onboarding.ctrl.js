'use strict';

function OnboardingCtrl($ionicSlideBoxDelegate, $scope) {
  let ctrl = this;
  ctrl.currentSlide = 0;

  ctrl.slideHasChanged = function(index) {
     ctrl.currentSlide = index;
  };

  ctrl.next = function() {
    ctrl.currentSlide ++;
    $ionicSlideBoxDelegate.slide(ctrl.currentSlide);
  };

  ctrl.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };
}

angular.module('app.controllers').controller('OnboardingCtrl', OnboardingCtrl);
