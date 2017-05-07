'use strict';

function NotesCtrl($ionicModal, $scope, $state, $rootScope, NotesService, $ionicLoading) {
  let ctrl = this;
  ctrl.notes = [];
  ctrl.nextPage = 1;
  ctrl.canLoadMore = true;

  ctrl.newNote = {private_note: true};

  $ionicLoading.show({
    template: 'Loading...'
  });

  ctrl.createNote = function() {
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
      });
  };

  NotesService.getAllNotes().then(function(response) {
    setTimeout(function() {
      ctrl.notes = response.data.notes;
      ctrl.meta = response.data.meta;
      ctrl.nextPage = response.data.meta.next_page;
      $ionicLoading.hide();
    }, 1000);
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

  ctrl.selectNote = function(note) {
    $rootScope.note = note;
    $state.go('tab.note', {id: note.id})
  };

  ctrl.loadMore = function() {
    NotesService.nextPage(ctrl.nextPage)
      .then(function(success){
        ctrl.notes = ctrl.notes.concat(success.data.notes);
        ctrl.nextPage ++;
        ctrl.meta = success.data.meta;
        if(!ctrl.meta.next_page) {
          ctrl.canLoadMore = false
        };
      });

      $scope.$broadcast('scroll.infiniteScrollComplete');
  };

  $scope.$on('$stateChangeSuccess', function() {
    ctrl.loadMore();
  });
}

angular.module('app.controllers').controller('NotesCtrl', NotesCtrl);
