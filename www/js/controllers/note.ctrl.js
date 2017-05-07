'use strict';

function NoteCtrl($ionicPopup, $rootScope, $state, NotesService) {
  let ctrl = this;

  ctrl.note = $rootScope.note;
  if(ctrl.note == undefined) {
    $state.go('tab.notes');
  } else {
    NotesService.increaseVisualization(ctrl.note)
  };

  ctrl.updateNote = function() {
    NotesService.updateNote(ctrl.note)
      .then(function(success) {
        $ionicPopup.show({
          title: 'Note was successfuly edited',
          buttons: [
            {text: 'Ok', type: 'button-calm'}
          ]
        });
      }, function(error) {
        $ionicPopup.show({
          title: 'An error has happened :(\n Try again later',
          buttons: [
            {text: 'Ok', type: 'button-calm'}
          ]
        });
      });
  }

  ctrl.deleteNote = function(note) {
    NotesService.deleteNote(note)
      .then(function(success) {
        $ionicPopup.show({
          title: 'Note deleted',
          buttons: [
            {text: 'Ok', type: 'button-calm'}
          ]
        });

        $state.go('tab.notes');
      }, function(error) {
        console.log(error);
      });
  };
}

angular.module('app.controllers').controller('NoteCtrl', NoteCtrl);
