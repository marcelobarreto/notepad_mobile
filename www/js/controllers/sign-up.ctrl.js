'use strict';

function SignUpCtrl(LoginService, $ionicPopup, $state) {
  let ctrl = this;
  ctrl.user = {}

  ctrl.createAccount = function() {
    let user = {user: ctrl.user}

    LoginService.createUser(user)
      .then(function(success) {
        window.localStorage.token = success.data.token;
        window.localStorage.userEmail = ctrl.user.email;
        LoginService.setToken(success.data.token, ctrl.user.email);
        $state.go('tab.notes');
      }, function(error) {
        $ionicPopup.show({
          title: 'Email ' + error.data.errors.email[0],
          buttons: [
            {text: 'Ok', type: 'button-calm'}
          ]
        });
      });
  }
}

angular.module('app.controllers').controller('SignUpCtrl', SignUpCtrl);
