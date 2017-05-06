'use strict';

function ConfigurationsCtrl(LoginService, $state) {
  let ctrl = this;

  ctrl.option = true;

  ctrl.logout = function() {
    window.localStorage.clear();
    LoginService.logoutUser();
    LoginService.setToken(null, null)
    $state.go('login');
  };
}

angular.module('app.controllers').controller('ConfigurationsCtrl', ConfigurationsCtrl);
