'use strict';

function NotesCtrl($ionicModal, $scope, NotesService, $ionicLoading) {
  let ctrl = this;
  ctrl.notes = [];

  ctrl.newNote = {private_note: true};

  $ionicLoading.show({
    template: 'Loading...'
  });

  ctrl.createNote = function() {
    console.log(ctrl.newNote)
    NotesService.createNote({note: ctrl.newNote})
      .then(function(response) {
        ctrl.notes.unshift(response.data.note);
        $scope.closeModal();
        ctrl.newNote = {private_note: true};
      }, function(error) {
        $ionicPopup.show({
          title: 'Something has happened, try it later',
          buttons: [
            {text: 'Ok', type: 'button-calm'}
          ]
        });
      })
  };

  NotesService.getAllNotes().then(function(response) {
    setTimeout(function() {
      ctrl.notes = response.data.notes;
      ctrl.meta = response.data.meta;
      $ionicLoading.hide();
    }, 1000)
  });

  $ionicModal.fromTemplateUrl('templates/notes/new.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
}

angular.module('app.controllers').controller('NotesCtrl', NotesCtrl);
