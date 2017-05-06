'use strict';

function NotesService ($http) {
  let url = "http://localhost:3000/";

  this.getAllNotes = function() {
    return $http.get(url + 'notes', config)
  };
}

angular.module('app.services').service('NotesService', NotesService);
