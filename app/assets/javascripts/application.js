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

// TODO make unit tests
// TODO make more pretty getters with the objects

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

    $scope.artisticPeriods = [];

    $scope.artisticPeriodsToFind = [
      {'name':'Impressionistic',
        'categoryPages':['American Impressionist painters', 'French Impressionist painters'],
        'imgSrc':'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Claude_Monet%2C_Impression%2C_soleil_levant.jpg/1200px-Claude_Monet%2C_Impression%2C_soleil_levant.jpg',
        'imgAlt':'Claude Monet, Impression, soleil levant.jpg',
        'artists': [],
        'visible':false}
    ];


    /*
     * Take the nasty JSON of wikipedia categories and message the JSON back into 
     * sanity.
     */
    $scope.messageCategoryList = function(rawCatList){
      console.log("++++");
      // geto the meat of the monstrosity
      rawCatList = rawCatList['*'][0].a['*'];

      // replace each artist with the JSON format we're looking for
      return rawCatList.map(function(currentArt){
      
        return {'name':currentArt.title,
          'portraitSrc':'',
          'portraitAlt':'Artist Thumbnail',
          'about':'A god damn good artist!'}
      
      });

    }

    $scope.getAristList = function(period, categoryToSearch){
  
      categoryApiUrl="https://petscan.wmflabs.org/?language=en&project=wikipedia&depth=0&categories=American%20Impressionist%20painters&combination=subset&negcats=&ns%5B0%5D=1&larger=&smaller=&minlinks=&maxlinks=&before=&after=&max_age=&show_redirects=both&edits%5Bbots%5D=both&edits%5Banons%5D=both&edits%5Bflagged%5D=both&templates_yes=&templates_any=&templates_no=&outlinks_yes=&outlinks_any=&outlinks_no=&sparql=&manual_list=&manual_list_wiki=&pagepile=&common_wiki=cats&format=json&output_compatability=catscan&sortby=none&sortorder=ascending&wikidata_item=no&wikidata_label_language=&regexp_filter=&doit=Do%20it%21&interface_language=en&active_tab=tab_categories&callback=JSON_CALLBACK"

      $http.jsonp(categoryApiUrl,{headers:{"Accept":"application/json;charset=utf-8",
        "Accept-Charset":"charset=utf-8"}}).success(function(data,status,headers,config){
        
        // convert the artist JSON to 
        console.log("hello there! Looking for " + categoryToSearch);
        console.log($scope.messageCategoryList(data));
        console.log("~~~~~~~~~"); 

      }).error(function(data,status,headers,config){

        // do nothing. Do not add any artist to the list
        console.log("Failed to find " + categoryToSearch + "...");

      });
         

    } 


    /*
     * Main loop
     */
    for(pInd = 0; pInd < $scope.artisticPeriodsToFind.length; pInd++){
     
      var period = $scope.artisticPeriodsToFind[pInd];

      for(cInd = 0; cInd < period.categoryPages.length; cInd++){

        var categoryPage = period.categoryPages[cInd];
       
        // change this to just pass the category name 
        $scope.getAristList(period, cInd);

      }

    } // end -- Main loop


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
