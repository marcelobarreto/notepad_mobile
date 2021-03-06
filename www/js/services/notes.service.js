'use strict';

function NotesService ($http) {
  let url = "http://notepadapi.herokuapp.com/api/v1/";

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

  this.getNote = function(id) {
    return $http.get(url + 'notes/' + id, config);
  };

  this.increaseVisualization = function(note) {
    note.visualizations_count ++
    return $http.put(url + 'notes/' + note.id, note, config);
  };

  this.updateNote = function(note) {
    return $http.put(url + 'notes/' + note.id, note, config);
  };

  this.deleteNote = function(note) {
    return $http.delete(url + 'notes/' + note.id, config);
  };

  this.nextPage = function(page) {
    return $http.get(url + 'notes?page=' + page, config);
  };

  this.search = function(q) {
    return $http.get(url + 'notes/search/' + q, config);
  };
};

angular.module('app.services').service('NotesService', NotesService);
