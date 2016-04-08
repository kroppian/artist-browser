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
//= require angular-mocks

// TODO make more pretty getters with the objects

(function(){

  var module = angular.module('artist-browser', []);

  function ArtistList(){

    this.populateList = function(period, categoryToSearch, reformatCategories,artistMetadata, $http){
    
      categoryApiUrl="https://petscan.wmflabs.org/?language=en&project=wikipedia&depth=0&categories=" + categoryToSearch + "&combination=subset&negcats=&ns%5B0%5D=1&larger=&smaller=&minlinks=&maxlinks=&before=&after=&max_age=&show_redirects=both&edits%5Bbots%5D=both&edits%5Banons%5D=both&edits%5Bflagged%5D=both&templates_yes=&templates_any=&templates_no=&outlinks_yes=&outlinks_any=&outlinks_no=&sparql=&manual_list=&manual_list_wiki=&pagepile=&common_wiki=cats&format=json&output_compatability=catscan&sortby=none&sortorder=ascending&wikidata_item=no&wikidata_label_language=&regexp_filter=&doit=Do%20it%21&interface_language=en&active_tab=tab_categories&callback=JSON_CALLBACK"

      $http.jsonp(categoryApiUrl,{headers:{"Accept":"application/json;charset=utf-8",
        "Accept-Charset":"charset=utf-8"}}).success(function(data,status,headers,config){
         
        // convert the artist JSON to 
        data=reformatCategories.reformat(data);
        for(artistInd = 0; artistInd < data.length; artistInd++) {

          period.artists.push(data[artistInd]);
          artistMetadata.setImgSrc(period, artistInd,$http);
          artistMetadata.setArtistAbout(period, artistInd,$http);

        }
        
      }).error(function(data,status,headers,config){

        // do nothing. Do not add any artist to the list
        console.log("Failed to find " + categoryToSearch + "...");

      });
         
    
    }

  } 

  function ArtistMetadata(){

    this.setImgSrc = function(period, artistInd, $http){
   
      var artistName = period.artists[artistInd].name;
      imageMetadataUrl='https://en.wikipedia.org/w/api.php?action=query&titles=' + artistName + '&prop=pageimages&format=json&pithumbsize=100&callback=JSON_CALLBACK&';
      $http.jsonp(imageMetadataUrl,{headers:{"Accept":"application/json;charset=utf-8",
        "Accept-Charset":"charset=utf-8"}}).success(function(data,status,headers,config){

         var pages = data.query.pages;

         // get the artistMetadata of the first page found
         if ( 'thumbnail' in pages[Object.keys(pages)[0]]){
         
           period.artists[artistInd].portraitSrc = pages[Object.keys(pages)[0]].thumbnail.source;

         }

      }).error(function(data,status,headers,config){

        console.log("~~~");
        console.log("No thumbnail is available for artist" + period.artists[artistInd].name);
        console.log("~~~");

      });
    
    } 

    this.setArtistAbout = function(period, artistInd, $http){
    
      // return our page name in the artistMetadata url
      var artistName = period.artists[artistInd].name;
      imageMetadataUrl='https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&callback=JSON_CALLBACK&titles=' + artistName;
      $http.jsonp(imageMetadataUrl,{headers:{"Accept":"application/json;charset=utf-8",
        "Accept-Charset":"charset=utf-8"}}).success(function(data,status,headers,config){

         var pages = data.query.pages;

         // get the artistMetadata of the first page found
         if ( 'extract' in pages[Object.keys(pages)[0]]){

           var rawExtract = pages[Object.keys(pages)[0]].extract;

           period.artists[artistInd].about = rawExtract.replace(
             /\([^)]*\)/,'').substring(
               0,170).replace(
                 / \w+$/,'') + "...";


         }

      }).error(function(data,status,headers,config){

        console.log("~~~");
        console.log("No artistMetadata is available for artist" + period.artists[artistInd].name);
        console.log("~~~");

      });
    
    }  

  }

  /*
   * Take the nasty JSON of wikipedia categories and message the JSON back into 
   * sanity.
   */
  module.factory("reformatCategories",function(){

    return {
      
      reformat: function(rawCatList){

        //if (typeof(rawCatList) != 'object' || 
        //    Object.keys(rawCatList).length == 0 || 
        //    ! Array.isArray(rawCatList['*'][0].a['*'])){

        if (typeof(rawCatList) == 'undefined' ||
          typeof(rawCatList['*']) == 'undefined' || 
          typeof(rawCatList['*'][0]) == 'undefined' ||
          typeof(rawCatList['*'][0].a) == 'undefined' ||
          typeof(rawCatList['*'][0].a['*']) == 'undefined' ||
          ! Array.isArray(rawCatList['*'][0].a['*'])){
            
          console.log('WARNING: Returning empty String due to bad parameter given to' +
              'reformatCategories ');

          return [];
         
        }

        // ge to the meat of the monstrosity
        rawCatList = rawCatList['*'][0].a['*'];
        // replace each artist with the JSON format we're looking for
        return rawCatList.map(function(currentArtist){
        
          return {'name':currentArtist.title,
            'portraitSrc':'/assets/Tripod_easel.jpg',
            'portraitAlt':'Artist Thumbnail',
            'about':'A god damn good artist!'}
        
        });
      
      } 
    
    }

  });

  module.service("artistMetadata",ArtistMetadata);
  module.service("artistList",ArtistList);

  module.config(['$httpProvider',function($httpProvider){

    $httpProvider.defaults.headers.get = {
      "Accept":"application/json;charset=utf-8",
      "Accept-Charset":"charset=utf-8"
    };

  }]);

  module.controller('artistBrowserController', function($scope, artistList, reformatCategories, artistMetadata, $http){

    $scope.loadingImages = true;

    $scope.artisticPeriods = [
      {'name':'Neoclassical',
        'categoryPages':['French neoclassical painters'],
        'imgSrc':'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Jacques-Louis_David_-_Oath_of_the_Horatii_-_Google_Art_Project.jpg/1200px-Jacques-Louis_David_-_Oath_of_the_Horatii_-_Google_Art_Project.jpg',
        'imgAlt':'Jacques-Louis David - Oath of the Horatii - Google Art Project.jpg',
        'artists': [],
        'visible':false},
      {'name':'Impressionistic',
        'categoryPages':['French Impressionist painters'],
        'imgSrc':'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Claude_Monet%2C_Impression%2C_soleil_levant.jpg/1200px-Claude_Monet%2C_Impression%2C_soleil_levant.jpg',
        'imgAlt':'Claude Monet, Impression, soleil levant.jpg',
        'artists': [],
        'visible':false},
      {'name':'Cubist',
        'categoryPages':['Cubist artists'],
        'imgSrc':'https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Pablo_Picasso%2C_1910%2C_Girl_with_a_Mandolin_%28Fanny_Tellier%29%2C_oil_on_canvas%2C_100.3_x_73.6_cm%2C_Museum_of_Modern_Art_New_York..jpg/1200px-Pablo_Picasso%2C_1910%2C_Girl_with_a_Mandolin_%28Fanny_Tellier%29%2C_oil_on_canvas%2C_100.3_x_73.6_cm%2C_Museum_of_Modern_Art_New_York..jpg',
        'imgAlt':'Pablo Picasso, 1910, Girl with a Mandolin (Fanny Tellier), oil on canvas, 100.3 x 73.6 cm, Museum of Modern Art New York..jpg',
        'artists': [],
        'visible':false},
    ];
    
    $scope.hiTest = "hello test!";

    /*
     * Main loop
     */
    for(pInd = 0; pInd < $scope.artisticPeriods.length; pInd++){
     
      var period = $scope.artisticPeriods[pInd];

      for(cInd = 0; cInd < period.categoryPages.length; cInd++){

        var categoryPage = period.categoryPages[cInd];
       
        // change this to just pass the category name 
        artistList.populateList(period, categoryPage,reformatCategories,artistMetadata,$http);


      }

    } // end -- Main loop

    $scope.cleanName = function(name){

      return name.replace(/_/g,' ').replace(/(Artist)/g,'')
    
    }

    $scope.switchPeriod = function(period){

      var wasVisible = period.visible;

      for (i = 0; i < $scope.artisticPeriods.length; i++) {
        
        $scope.artisticPeriods[i].visible = false; 

      }

      if (! wasVisible){
        period.visible = true;
      }

    };


  }); // end -- artistBrowserController


})();
