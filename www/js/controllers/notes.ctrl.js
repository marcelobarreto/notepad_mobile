'use strict';

function NotesCtrl() {
  let ctrl = this;

  ctrl.myEvent = function() {
    console.log(123);
  };
}

angular.module('app.controllers').controller('NotesCtrl', NotesCtrl);
