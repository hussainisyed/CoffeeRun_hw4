//IIFE module that creates an empty object literal, assigns it to a variable named Validation,
//and then exports that variable to the App namespace.
(function (window) {
  'use strict';
  var App = window.App || {};

  var Validation = {
    //This method will test an email address against a regular expression and return true or false.
    isCompanyEmail: function (email) {
      return /.+@b\.com$/.test(email);
    }
  };

  App.Validation = Validation;
  window.App = App;
})(window);
