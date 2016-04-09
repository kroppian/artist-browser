
(function(){

  var module = angular.module('artist-browser', []);

  function Tester(){

    this.runMe = function(){
   
      console.log("Hello world!");

    }

  }

  module.service("tester",Tester);

});
