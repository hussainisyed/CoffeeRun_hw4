(function (window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  FormHandler.prototype.addSubmitHandler = function (fn) {
    console.log('Setting submit handler for form');
    this.$formElement.on('submit', function (event) {
      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function (item) {
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      });
      console.log(data);
      fn(data);
      this.reset();
      this.elements[0].focus();
    });
  };

  FormHandler.prototype.addInputHandler = function (fn) {
    console.log('Setting input handler for form');

    //Attach the listener for the input event using jQuery’s on method.
    //Event delegation pattern to filter out events created by anything
    //but the [name="emailAddress"] field.
    this.$formElement.on('input', '[name="emailAddress"]', function (event) {

      //extract the value of the email field from the event.target object
      var emailAddress = event.target.value;

      //variable for a warning message
      var message = '';
      //If true, clear the custom validity of the field.
      //If it returns false, assign the message variable to a string with the warning message
      //and set the custom validity to message.
      if (fn(emailAddress)) {
        event.target.setCustomValidity('');
      } else {
        message = emailAddress + ' is not an authorized email address!';
        event.target.setCustomValidity(message);
      }
    });
  };

  $('#paymentstyles').on('submit', function (event) {
    event.preventDefault();

    var data = {};
    $(this).serializeArray().forEach(function (item) {
      data[item.name] = item.value;
      console.log(item.name + ' is ' + item.value);
    });

    $('#payMsg').text('Thank you for your payment, ' + data.title + ' ' + data.username);

    $('#popup').modal({});

    this.reset();
    this.elements[0].focus();
  });

  App.FormHandler = FormHandler;
  window.App = App;

})(window);
