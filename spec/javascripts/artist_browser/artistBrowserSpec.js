'use strict';

describe('artistBrowserController', function() {

    beforeEach(module('artist-browser'));
    var $scope, testRootScope;

    describe('opening main page the first time', function() {
        beforeEach(inject(function ($rootScope,$http,$controller) {
            $scope = $rootScope.$new();
            $controller('artistBrowserController', {$scope: $scope, $http: $http });

        }));

        it('should have the correct model value', function () {
            expect($scope.hiTest).toEqual('hello test!');
        });
    });
});





























































//describe('artistBrowserController',function(){



	      /*var scope, httpBackend, http, controller;



	      beforeEach(inject(function ($rootScope, $controller, $httpBackend, 
                          $http) {
	          scope = $rootScope.$new();
	          httpBackend = $httpBackend;
	          controller = $controller;
	          http = $http;
	          $controller('artistBrowserController', {
	              $scope: scope,
	              $http: $http
	          });
	      }));

	      it('should make a http GET request for contacts', function () {
          expect(scope.hiTest).toBe("hello test!");
	      });*/

/*  var windowMock, httpBackend, sharedMock;
  var ctrl; 
  var ctrlScope;
  var storedItems;


  beforeEach(inject(function ($rootScope, $httpBackend, $controller) {
      //Mock the services here
      ctrlScope = $rootScope.$new();
      windowMock = { location: { href: ""} };
      httpBackend = $httpBackend;
    
      ctrl = $controller(ShoppingCartCtrl, { $scope: ctrlScope, $window: windowMock, shared: sharedMock });

  }));

  it("Should be set up to test controller functions.",function(){

    expect(ctrlScope.messageCategoryList({})).toBe("hello test!");
  
  });*/

//});

