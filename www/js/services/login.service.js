'use strict';

function LoginService ($http) {
  let url = "http://notepadapi.herokuapp.com/";

  let headers = {
    'X-User-Token': window.localStorage.getItem('token'),
    'X-User-Email': window.localStorage.getItem('userEmail')
  }

  let config = { headers: headers }

  this.setToken = function(token, email) {
    config.headers['X-User-Token'] = token;
    config.headers['X-User-Email'] = email;
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('userEmail', email);
  };

  this.createUser = function(user) {
    return $http.post(url + 'users', user, config)
  };

  this.loginUser = function(user) {
    return $http.post(url + 'users/sign_in', user, config)
  };

  this.logoutUser = function() {
    return window.localStorage.clear()
  };
}

angular.module('app.services').service('LoginService', LoginService);
