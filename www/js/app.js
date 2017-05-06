angular.module('starter', ['ionic', 'app.services', 'app.controllers', 'ion-floating-menu'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('onboarding', {
    url: '/onboarding',
    templateUrl: 'templates/onboarding/onboarding.html',
    controller: 'OnboardingCtrl',
    controllerAs: '$ctrl'
  });

  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'templates/login/login.html',
    controller: 'LoginCtrl',
    controllerAs: '$ctrl'
  });

  $stateProvider.state('sign-up', {
    url: '/sign-up',
    templateUrl: 'templates/sign-up/sign-up.html',
    controller: 'SignUpCtrl',
    controllerAs: '$ctrl'
  });

  $stateProvider.state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  });

  $stateProvider.state('tab.notes', {
    url: '/notes',
    views: {
      'tab-notes': {
        templateUrl: 'templates/notes/notes.html',
        controller: 'NotesCtrl',
        controllerAs: '$ctrl'
      }
    }
  });

  $stateProvider.state('tab.search', {
    url: '/search',
    views: {
      'tab-search': {
        templateUrl: 'templates/search/search.html',
        controller: 'SearchCtrl',
        controllerAs: '$ctrl'
      }
    }
  });

  $stateProvider.state('tab.configurations', {
    url: '/configurations',
    views: {
      'tab-configurations': {
        templateUrl: 'templates/configurations/configurations.html',
        controller: 'ConfigurationsCtrl',
        controllerAs: '$ctrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/onboarding');
});
