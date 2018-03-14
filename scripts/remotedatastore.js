//In remotedatastore.js, import the App namespace and jQuery,
//then create an IIFE module with a constructor named RemoteDataStore.
//The constructor should accept an argument for a remote server URL and
//throw an error if a URL is not passed in. At the end of the module definition,
//export the RemoteDataStore to the App namespace
(function (window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error('No remote URL supplied.');
    }

    this.serverUrl = url;
  }

  //store customer order data on the remote web service.
  //Like DataStore’s add method, it will accept arguments called key and val
  RemoteDataStore.prototype.add = function (key, val) {
    //This method sends a POST request in the background as an XMLHttpRequest object
    //requires the URL of the server to send the request to and what data to include.
    //this.remove(key);
    $.post(this.serverUrl, val, function (serverResponse) {
      console.log(serverResponse);
    });
  };

  //retrieve all orders from the server
  RemoteDataStore.prototype.getAll = function (cb) {
    //pass it a function argument so that it knows what to do with the data when it comes back from the server
    $.get(this.serverUrl, function (serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.get = function (key, cb) {
    //'?emailAddress='
    $.get(this.serverUrl + '/' + key, function (serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.remove = function (key) {
    //<--this.get(key, (function(response)) {
    //key --> response.id 
    $.ajax(this.serverUrl + '/' + key, {
      type: 'DELETE' //,
    });
    //}).bind(this));
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;

})(window);
