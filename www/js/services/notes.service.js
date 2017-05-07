'use strict';

function NotesService ($http) {
  let url = "http://localhost:3000/api/v1/";

  let headers = {
    'X-User-Token': window.localStorage.getItem('token'),
    'X-User-Email': window.localStorage.getItem('userEmail')
  };

  let config = { headers: headers };

  this.getAllNotes = function() {
    return $http.get(url + 'notes', config);
  };

  this.createNote = function(note) {
    return $http.post(url + 'notes', note, config);
  };
};

angular.module('app.services').service('NotesService', NotesService);
