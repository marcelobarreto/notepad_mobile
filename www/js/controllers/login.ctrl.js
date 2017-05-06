'use strict';

function LoginCtrl(LoginService, $ionicPopup, $state) {
  let ctrl = this;
  ctrl.user = {}

  ctrl.doLogin = function() {
    let user = {user: ctrl.user}

    LoginService.loginUser(user)
      .then(function(success) {
        if(success.data.token) {
          window.localStorage.token = success.data.token;
          window.localStorage.userEmail = ctrl.user.email;
          LoginService.setToken(success.data.token, ctrl.user.email);
          $state.go('tab.notes');
        } else {
          $ionicPopup.show({
            title: 'Wrong credentials',
            buttons: [
              {text: 'Ok', type: 'button-calm'}
            ]
          });
        }
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

angular.module('app.controllers').controller('LoginCtrl', LoginCtrl);
