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

    $scope.stubbedCategoryJSON = [
      {"n":"result","a":{"querytime_sec":0.141519,"query":"https://petscan.wmflabs.org/?language=en&project=wikipedia&depth=0&categories=American%20Impressionist%20painters&combination=subset&negcats=&ns%5B0%5D=1&larger=&smaller=&minlinks=&maxlinks=&before=&after=&max_age=&show_redirects=both&edits%5Bbots%5D=both&edits%5Banons%5D=both&edits%5Bflagged%5D=both&templates_yes=&templates_any=&templates_no=&outlinks_yes=&outlinks_any=&outlinks_no=&sparql=&manual_list=&manual_list_wiki=&pagepile=&common_wiki=cats&format=json&output_compatability=catscan&sortby=none&sortorder=ascending&wikidata_item=no&wikidata_label_language=&regexp_filter=&doit=Do%20it%21&interface_language=en&active_tab=tab_categories"},"*":[{"n":"combination","a":{"type":"subset","*":[
      {"id":20308,"len":47211,"n":"page","namespace":0,"nstext":"","title":"Mary_Cassatt","touched":"20160405223414"},
      {"id":74097,"len":78986,"n":"page","namespace":0,"nstext":"","title":"James_Abbott_McNeill_Whistler","touched":"20160405223414"},
      {"id":383639,"len":8398,"n":"page","namespace":0,"nstext":"","title":"John_Henry_Twachtman","touched":"20160405223414"},
      {"id":47939620,"len":4620,"n":"page","namespace":0,"nstext":"","title":"Elmer_Wachtel","touched":"20160404143142"},
      {"id":49280853,"len":2621,"n":"page","namespace":0,"nstext":"","title":"Carl_Thorp","touched":"20160326222635"},
      {"id":49329401,"len":11035,"n":"page","namespace":0,"nstext":"","title":"Samuel_Burtis_Baker","touched":"20160404143142"}]}}]},

      {"n":"result","a":{"querytime_sec":0.602016,"query":"https://petscan.wmflabs.org/?language=en&project=wikipedia&depth=0&categories=French%20Impressionist%20painters&combination=subset&negcats=&ns%5B0%5D=1&larger=&smaller=&minlinks=&maxlinks=&before=&after=&max_age=&show_redirects=both&edits%5Bbots%5D=both&edits%5Banons%5D=both&edits%5Bflagged%5D=both&templates_yes=&templates_any=&templates_no=&outlinks_yes=&outlinks_any=&outlinks_no=&sparql=&manual_list=&manual_list_wiki=&pagepile=&common_wiki=cats&format=json&output_compatability=catscan&sortby=none&sortorder=ascending&wikidata_item=no&wikidata_label_language=&regexp_filter=&doit=Do%20it%21&interface_language=en&active_tab=tab_categories"},"*":[{"n":"combination","a":{"type":"subset","*":[
      {"id":4233,"len":38352,"n":"page","namespace":0,"nstext":"","title":"Berthe_Morisot","touched":"20160405223414"},
      {"id":6548,"len":49738,"n":"page","namespace":0,"nstext":"","title":"Claude_Monet","touched":"20160406170412"},
      {"id":7434,"len":48292,"n":"page","namespace":0,"nstext":"","title":"Camille_Pissarro","touched":"20160405223414"},
      {"id":9615,"len":37274,"n":"page","namespace":0,"nstext":"","title":"Édouard_Manet","touched":"20160405233635"},
      {"id":11459,"len":7647,"n":"page","namespace":0,"nstext":"","title":"Frédéric_Bazille","touched":"20160405223414"},
      {"id":41458992,"len":3940,"n":"page","namespace":0,"nstext":"","title":"Marcel_Dyf","touched":"20160404143142"},
      {"id":44664479,"len":3683,"n":"page","namespace":0,"nstext":"","title":"Ludovic_Piette","touched":"20160405223414"},
      {"id":47454019,"len":11649,"n":"page","namespace":0,"nstext":"","title":"Antoine_Guillemet","touched":"20160405223414"},
      {"id":49052643,"len":6631,"n":"page","namespace":0,"nstext":"","title":"Étienne_Buffet","touched":"20160405223414"}]}}]}
    
    
    ];

    $scope.loadingImages = true;

    $scope.artisticPeriods = [];

    $scope.artisticPeriodsToFind = [
      {'name':'Impressionistic',
        'categoryPages':['American Impressionist painters', 'French Impressionist painters'],
        'imgSrc':'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Claude_Monet%2C_Impression%2C_soleil_levant.jpg/1200px-Claude_Monet%2C_Impression%2C_soleil_levant.jpg',
        'imgAlt':'Claude Monet, Impression, soleil levant.jpg',
        'artists': [],
        'visible':false}
    ];

    $scope.getAristList = function(categoryToSearch){
  
      imageMetadataUrl='https://en.wikipedia.org/w/api.php?action=query&titles=Claude_Monet&prop=pageimages&format=json&pithumbsize=100&callback=JSON_CALLBACK&';
      $http.jsonp(imageMetadataUrl,{headers:{"Accept":"application/json;charset=utf-8",
        "Accept-Charset":"charset=utf-8"}}).success(function(data,status,headers,config){
        
        // convert the artist JSON to 
        console.log("hello there! Looking for " + categoryToSearch);


      }).error(function(data,status,headers,config){

        // do nothing. Do not add any artist to the list
        console.log("Failed to find " + categoryToSearch + "...");


      });
         

    } 

    for(pInd = 0; pInd < $scope.artisticPeriodsToFind.length; pInd++){
     
      var period = $scope.artisticPeriodsToFind[pInd];

      for(cInd = 0; cInd < period.categoryPages.length; cInd++){

        var categoryPage = period.categoryPages[cInd];
        
        $scope.getAristList(categoryPage);

      }

    }


    /*$scope.neoclassicalArtistsStub = [
      {'name':'Jacques-Louis David', 'portraitSrc':'', 'portraitAlt':'David Self Portrait.jpg', 'about':'An influential French painter in the Neoclassical style, considered to be the preeminent painter of the era. In the 1780s his cerebral brand of history painting marked...' },
      {'name':'Antonio Canova', 'portraitSrc':'', 'portraitAlt':'Antonio Canova Selfportrait 1792.jpg', 'about':'An Italian neoclassical sculptor, famous for his marble sculptures. Often regarded as the greatest of the neoclassical artists, his artwork was...' },
      {'name':'Jean-Auguste-Dominique Ingres', 'portraitSrc':'', 'portraitAlt':'Ingres, Self-portrait.jpg', 'about':' A French Neoclassical painter. Although he considered himself to be a painter of history in the tradition of Nicolas Poussin...' },
      {'name':'Jacques-Louis David', 'portraitSrc':'', 'portraitAlt':'David Self Portrait.jpg', 'about':'An influential French painter in the Neoclassical style, considered to be the preeminent painter of the era. In the 1780s his cerebral brand of history painting marked...' },
      {'name':'Antonio Canova', 'portraitSrc':'', 'portraitAlt':'Antonio Canova Selfportrait 1792.jpg', 'about':'An Italian neoclassical sculptor, famous for his marble sculptures. Often regarded as the greatest of the neoclassical artists, his artwork was...' },
      {'name':'Jean-Auguste-Dominique Ingres', 'portraitSrc':'', 'portraitAlt':'Ingres, Self-portrait.jpg', 'about':' A French Neoclassical painter. Although he considered himself to be a painter of history in the tradition of Nicolas Poussin...' },
      {'name':'Jacques-Louis David', 'portraitSrc':'', 'portraitAlt':'David Self Portrait.jpg', 'about':'An influential French painter in the Neoclassical style, considered to be the preeminent painter of the era. In the 1780s his cerebral brand of history painting marked...' },
      {'name':'Claude Monet', 'portraitSrc':'', 'portraitAlt':'Antonio Canova Selfportrait 1792.jpg', 'about':'An Italian neoclassical sculptor, famous for his marble sculptures. Often regarded as the greatest of the neoclassical artists, his artwork was...' },
      {'name':'Jean-Auguste-Dominique Ingres', 'portraitSrc':'', 'portraitAlt':'Ingres, Self-portrait.jpg', 'about':' A French Neoclassical painter. Although he considered himself to be a painter of history in the tradition of Nicolas Poussin...' }
    ];*/

    /*$scope.artisticPeriods = [
      {'name':'Neoclassical',
        'imgSrc':'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Jacques-Louis_David_-_Oath_of_the_Horatii_-_Google_Art_Project.jpg/1200px-Jacques-Louis_David_-_Oath_of_the_Horatii_-_Google_Art_Project.jpg',
        'imgAlt':'Jacques-Louis David - Oath of the Horatii - Google Art Project.jpg',
        'artists': $scope.neoclassicalArtistsStub,
        'visible':false},
      {'name':'Impressionistic',
        'imgSrc':'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Claude_Monet%2C_Impression%2C_soleil_levant.jpg/1200px-Claude_Monet%2C_Impression%2C_soleil_levant.jpg',
        'imgAlt':'Claude Monet, Impression, soleil levant.jpg',
        'artists': $scope.neoclassicalArtistsStub,
        'visible':false},
      {'name':'Post Impressionistic',
        'imgSrc':'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1200px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
        'imgAlt':'A painting of a scene at night with 11 swirly stars and a bright yellow crescent moon. In the background there are hills, in the middle ground there is a moonlit town with a church that has an elongated steeple, and in the foreground there is the dark green silhouette of a cypress tree.',
        'artists': $scope.neoclassicalArtistsStub,
        'visible':false}
      ] */




    $scope.getThumbnail = function(artistName,index){
    // sanitize artist name
    // return our page name in the thumbnail url
      artistName = artistName.replace(/ /g, '_');
      imageMetadataUrl='https://en.wikipedia.org/w/api.php?action=query&titles=' + artistName + '&prop=pageimages&format=json&pithumbsize=100&callback=JSON_CALLBACK&';
      $http.jsonp(imageMetadataUrl,{headers:{"Accept":"application/json;charset=utf-8",
        "Accept-Charset":"charset=utf-8"}}).success(function(data,status,headers,config){

         var pages = data.query.pages;

         // get the thumbnail of the first page found
         // TODO if name is not found??
         $scope.neoclassicalArtistsStub[index].portraitSrc =  pages[Object.keys(pages)[0]].thumbnail.source;

      }).error(function(data,status,headers,config){

        // TODO more than one error type?
        console.log("~~~");
        console.log("Server Error"+ "Server 79 not responsive.");
        console.log("~~~");

      });
      $scope.loadingImages = false;      
    };

    var artistName;
    var imageMetadataUrl;
    /*for (i = 0; i < $scope.neoclassicalArtistsStub.length; i++){
      
      $scope.getThumbnail($scope.neoclassicalArtistsStub[i].name,i);

    }*/

    $scope.switchPeriod = function(period){

      var wasVisible = period.visible;

      for (i = 0; i < $scope.artisticPeriods.length; i++) {
        
        $scope.artisticPeriods[i].visible = false; 

      }

      if (! wasVisible){
        period.visible = true;
      }

    };


  } // end -- artistBrowserController

  );
 
})();
