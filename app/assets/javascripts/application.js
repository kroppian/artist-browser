// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
//= require bootstrap-sprockets
//= require angular

(function(){

  var adminApp = angular.module('artist-browser', []);

  adminApp.config(['$httpProvider',function($httpProvider){

    $httpProvider.defaults.headers.get = {
      "Accept":"application/json;charset=utf-8",
      "Accept-Charset":"charset=utf-8"
    };

  }]);

  adminApp.controller('artistBrowserController', function($scope,$http,$location){

    $scope.loadingImages = true;

    $scope.neoclassicalArtistsStub = [
      {'name':'Jacques-Louis David', 'portraitSrc':'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/David_Self_Portrait.jpg/1200px-David_Self_Portrait.jpg', 'portraitAlt':'David Self Portrait.jpg', 'about':'An influential French painter in the Neoclassical style, considered to be the preeminent painter of the era. In the 1780s his cerebral brand of history painting marked...' },
      {'name':'Antonio Canova', 'portraitSrc':'https://upload.wikimedia.org/wikipedia/commons/6/6b/Antonio_Canova_Selfportrait_1792.jpg', 'portraitAlt':'Antonio Canova Selfportrait 1792.jpg', 'about':'An Italian neoclassical sculptor, famous for his marble sculptures. Often regarded as the greatest of the neoclassical artists, his artwork was...' },
      {'name':'Jean-Auguste-Dominique Ingres', 'portraitSrc':'https://upload.wikimedia.org/wikipedia/commons/9/94/Ingres%2C_Self-portrait.jpg', 'portraitAlt':'Ingres, Self-portrait.jpg', 'about':' A French Neoclassical painter. Although he considered himself to be a painter of history in the tradition of Nicolas Poussin...' },
      {'name':'Jacques-Louis David', 'portraitSrc':'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/David_Self_Portrait.jpg/1200px-David_Self_Portrait.jpg', 'portraitAlt':'David Self Portrait.jpg', 'about':'An influential French painter in the Neoclassical style, considered to be the preeminent painter of the era. In the 1780s his cerebral brand of history painting marked...' },
      {'name':'Antonio Canova', 'portraitSrc':'https://upload.wikimedia.org/wikipedia/commons/6/6b/Antonio_Canova_Selfportrait_1792.jpg', 'portraitAlt':'Antonio Canova Selfportrait 1792.jpg', 'about':'An Italian neoclassical sculptor, famous for his marble sculptures. Often regarded as the greatest of the neoclassical artists, his artwork was...' },
      {'name':'Jean-Auguste-Dominique Ingres', 'portraitSrc':'https://upload.wikimedia.org/wikipedia/commons/9/94/Ingres%2C_Self-portrait.jpg', 'portraitAlt':'Ingres, Self-portrait.jpg', 'about':' A French Neoclassical painter. Although he considered himself to be a painter of history in the tradition of Nicolas Poussin...' },
      {'name':'Jacques-Louis David', 'portraitSrc':'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/David_Self_Portrait.jpg/1200px-David_Self_Portrait.jpg', 'portraitAlt':'David Self Portrait.jpg', 'about':'An influential French painter in the Neoclassical style, considered to be the preeminent painter of the era. In the 1780s his cerebral brand of history painting marked...' },
      {'name':'Antonio Canova', 'portraitSrc':'https://upload.wikimedia.org/wikipedia/commons/6/6b/Antonio_Canova_Selfportrait_1792.jpg', 'portraitAlt':'Antonio Canova Selfportrait 1792.jpg', 'about':'An Italian neoclassical sculptor, famous for his marble sculptures. Often regarded as the greatest of the neoclassical artists, his artwork was...' },
      {'name':'Jean-Auguste-Dominique Ingres', 'portraitSrc':'https://upload.wikimedia.org/wikipedia/commons/9/94/Ingres%2C_Self-portrait.jpg', 'portraitAlt':'Ingres, Self-portrait.jpg', 'about':' A French Neoclassical painter. Although he considered himself to be a painter of history in the tradition of Nicolas Poussin...' }
    ];

    $scope.artisticPeriods = [
      {'name':'Neoclassical',
        'imgSrc':'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Jacques-Louis_David_-_Oath_of_the_Horatii_-_Google_Art_Project.jpg/1200px-Jacques-Louis_David_-_Oath_of_the_Horatii_-_Google_Art_Project.jpg',
        'imgAlt':'Jacques-Louis David - Oath of the Horatii - Google Art Project.jpg',
        'artists': $scope.neoclassicalArtistsStub},
      {'name':'Impressionistic',
        'imgSrc':'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Claude_Monet%2C_Impression%2C_soleil_levant.jpg/1200px-Claude_Monet%2C_Impression%2C_soleil_levant.jpg',
        'imgAlt':'Claude Monet, Impression, soleil levant.jpg',
        'artists': $scope.neoclassicalArtistsStub }
      ] 
  }   

  );
 
})();
