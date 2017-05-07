'use strict';

function ConfigurationsCtrl(LoginService, $state, $ionicPopup) {
  let ctrl = this;

  ctrl.user = {};
  ctrl.user.email = window.localStorage.getItem('userEmail');

  ctrl.updateUser = function() {
    ctrl.user.password = '';
    ctrl.user.password_confirmation = '';

    $ionicPopup.show({
      title: 'Mocking user update password was successfuly',
      buttons: [
        {text: 'Ok', type: 'button-calm'}
      ]
    });
  };

  ctrl.logout = function() {
    window.localStorage.clear();
    LoginService.logoutUser();
    LoginService.setToken(null, null)
    $state.go('login');
    location.reload();
  };
}

angular.module('app.controllers').controller('ConfigurationsCtrl', ConfigurationsCtrl);
