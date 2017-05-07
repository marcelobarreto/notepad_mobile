'use strict';

function SearchCtrl(NotesService, $scope, $ionicModal) {
  let ctrl = this;

  ctrl.notes = [];
  ctrl.nextPage = 1;
  ctrl.canLoadMore = false;

  ctrl.search = function() {
    if(ctrl.q && ctrl.notes.length == 0) {
      NotesService.search(ctrl.q)
        .then(function(success) {
          ctrl.notes = success.data.notes;
          ctrl.meta = success.data.meta;
          ctrl.nextPage = success.data.meta.next_page;
          if(success.data.meta.next_page) {
            ctrl.canLoadMore = true;
          } else {
            ctrl.canLoadMore = false;
          };
        }, function(error) {
          console.log(error)
        });
    }
  };

  ctrl.loadMore = function() {
    if(ctrl.canLoadMore) {
      NotesService.search(ctrl.q + '?page=' + ctrl.nextPage)
      .then(function(success){
        ctrl.notes = ctrl.notes.concat(success.data.notes);
        ctrl.nextPage ++;
        ctrl.meta = success.data.meta;
        if(!ctrl.meta.next_page) {
          ctrl.canLoadMore = false
        };
      });

      $scope.$broadcast('scroll.infiniteScrollComplete');
    }
  };

  $scope.$on('$stateChangeSuccess', function() {
    ctrl.loadMore();
  });

  ctrl.clear = function() {
    ctrl.q = '';
    ctrl.notes = [];
    ctrl.meta = [];
    ctrl.nextPage = 1;
  };

  $ionicModal.fromTemplateUrl('templates/search/show.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function(note) {
    ctrl.note = note;
    NotesService.increaseVisualization(note)
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
}

angular.module('app.controllers').controller('SearchCtrl', SearchCtrl);
