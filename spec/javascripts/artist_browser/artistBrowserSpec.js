'use strict';

var staticCategories = {"n":"result","a":{"querytime_sec":0.015164,"query":"https://petscan.wmflabs.org/?language=en&project=wikipedia&depth=0&categories=French%20Impressionist%20painters&combination=subset&negcats=&ns%5B0%5D=1&larger=&smaller=&minlinks=&maxlinks=&before=&after=&max_age=&show_redirects=both&edits%5Bbots%5D=both&edits%5Banons%5D=both&edits%5Bflagged%5D=both&templates_yes=&templates_any=&templates_no=&outlinks_yes=&outlinks_any=&outlinks_no=&sparql=&manual_list=&manual_list_wiki=&pagepile=&common_wiki=cats&format=json&output_compatability=catscan&sortby=none&sortorder=ascending&wikidata_item=no&wikidata_label_language=&regexp_filter=&doit=Do%20it%21&interface_language=en&active_tab=tab_output"},"*":[{"n":"combination","a":{"type":"subset","*":[{"id":4233,"len":38352,"n":"page","namespace":0,"nstext":"","title":"Berthe_Morisot","touched":"20160405223414"}, {"id":6548,"len":49435,"n":"page","namespace":0,"nstext":"","title":"Claude_Monet","touched":"20160407202909"}, {"id":7434,"len":48292,"n":"page","namespace":0,"nstext":"","title":"Camille_Pissarro","touched":"20160407204606"}, {"id":47454019,"len":11649,"n":"page","namespace":0,"nstext":"","title":"Antoine_Guillemet","touched":"20160405223414"}, {"id":49052643,"len":6631,"n":"page","namespace":0,"nstext":"","title":"Étienne_Buffet","touched":"20160405223414"}]}}]};

var staticArtistAbout = {"batchcomplete":"","query":{"normalized":[{"from":"Berthe_Morisot","to":"Berthe Morisot"}],"pages":{"4233":{"pageid":4233,"ns":0,"title":"Berthe Morisot","extract":"Berthe Marie Pauline Morisot (French: [m\u0254\u0281izo]; January 14, 1841 \u2013 March 2, 1895) was a painter and a member of the circle of painters in Paris who became known as the Impressionists. She was described by Gustave Geffroy in 1894 as one of \"les trois grandes dames\" of Impressionism alongside Marie Bracquemond and Mary Cassatt.\nIn 1864, she exhibited for the first time in the highly esteemed Salon de Paris. Sponsored by the government, and judged by Academicians, the Salon was the official, annual exhibition of the Acad\u00e9mie des beaux-arts in Paris. Her work was selected for exhibition in six subsequent Salons until, in 1874, she joined the \"rejected\" Impressionists in the first of their own exhibitions, which included Paul C\u00e9zanne, Edgar Degas, Claude Monet, Camille Pissarro, Pierre-Auguste Renoir, and Alfred Sisley. It was held at the studio of the photographer Nadar.\nShe was married to Eug\u00e8ne Manet, the brother of her friend and colleague \u00c9douard Manet."}}}};

var staticAristThumb = {"batchcomplete":"","query":{"normalized":[{"from":"Berthe_Morisot","to":"Berthe Morisot"}],"pages":{"4233":{"pageid":4233,"ns":0,"title":"Berthe Morisot","thumbnail":{"source":"https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Morisot_TheArtistsDaughterJulieWithHerNanny_MIA_9640.jpg/100px-Morisot_TheArtistsDaughterJulieWithHerNanny_MIA_9640.jpg","width":100,"height":83},"pageimage":"Morisot_TheArtistsDaughterJulieWithHerNanny_MIA_9640.jpg"}}}};



describe('artistBrowserController', function() {

    beforeEach(function(){
      module('artist-browser');
    });

    var ctrlScope, testRootScope, _artistList, _reformatCategories, _artistMetadata, httpBackend;

    describe('opening main page the first time', function() {

        beforeEach(inject(function ($rootScope,$httpBackend,$controller,artistList,reformatCategories,artistMetadata) {

            ctrlScope = $rootScope.$new();

            httpBackend = $httpBackend;

            _artistList = artistList;
            _reformatCategories = reformatCategories;
            _artistMetadata = artistMetadata;

            spyOn(artistList,'populateList').and.callThrough();
            spyOn(artistMetadata,'setArtistAbout').and.callThrough();
            spyOn(artistMetadata,'setImgSrc').and.callThrough();


            // TODO make the regex multiline
            var categoryApiUrl=/https:\/\/petscan.wmflabs.org\/\?language=en&project=wikipedia&depth=0&categories=.*&combination=subset&negcats=&ns%5B0%5D=1&larger=&smaller=&minlinks=&maxlinks=&before=&after=&max_age=&show_redirects=both&edits%5Bbots%5D=both&edits%5Banons%5D=both&edits%5Bflagged%5D=both&templates_yes=&templates_any=&templates_no=&outlinks_yes=&outlinks_any=&outlinks_no=&sparql=&manual_list=&manual_list_wiki=&pagepile=&common_wiki=cats&format=json&output_compatability=catscan&sortby=none&sortorder=ascending&wikidata_item=no&wikidata_label_language=&regexp_filter=&doit=Do%20it%21&interface_language=en&active_tab=tab_categories&callback=JSON_CALLBACK/;
            httpBackend.whenJSONP(categoryApiUrl).respond(staticCategories);

            var thumbnailApiUrl=/https:\/\/en.wikipedia.org\/w\/api.php\?action=query&titles=.*&prop=pageimages&format=json&pithumbsize=100&callback=JSON_CALLBACK/;
            httpBackend.whenJSONP(thumbnailApiUrl).respond(staticAristThumb);

            var aboutApiUrl=/https:\/\/en.wikipedia.org\/w\/api.php\?format=json&action=query&prop=extracts&exintro=&explaintext=&callback=JSON_CALLBACK&titles=.*/;
            httpBackend.whenJSONP(aboutApiUrl).respond(staticArtistAbout);

            $controller('artistBrowserController', {$scope: ctrlScope, 
                artistList: _artistList, reformatCategories: _reformatCategories, 
                artistMetadata: _artistMetadata});


        })); // end -- beforeEach

        it('should call artistLists to populate the artistic periods on creation of controller.', function () {

          expect(_artistList.populateList).toHaveBeenCalled();
          httpBackend.flush();
          expect(ctrlScope.artisticPeriods.length).toBe(3);
          
          for(var i = 0; i < ctrlScope.artisticPeriods.length; i++){

            expect(ctrlScope.artisticPeriods[i].artists).toEqual(
              [{'name':'Berthe_Morisot',
              'portraitSrc':'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Morisot_TheArtistsDaughterJulieWithHerNanny_MIA_9640.jpg/100px-Morisot_TheArtistsDaughterJulieWithHerNanny_MIA_9640.jpg',
              'portraitAlt':'Artist Thumbnail',
              'about':'Berthe Marie Pauline Morisot was a painter and a member of the circle of painters in Paris who became known as the Impressionists. She was described by Gustave Geffroy...'},
              {'name':'Claude_Monet',
              'portraitSrc':'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Morisot_TheArtistsDaughterJulieWithHerNanny_MIA_9640.jpg/100px-Morisot_TheArtistsDaughterJulieWithHerNanny_MIA_9640.jpg',
              'portraitAlt':'Artist Thumbnail',
              'about':'Berthe Marie Pauline Morisot was a painter and a member of the circle of painters in Paris who became known as the Impressionists. She was described by Gustave Geffroy...'},
              {'name':'Camille_Pissarro',
              'portraitSrc':'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Morisot_TheArtistsDaughterJulieWithHerNanny_MIA_9640.jpg/100px-Morisot_TheArtistsDaughterJulieWithHerNanny_MIA_9640.jpg',
              'portraitAlt':'Artist Thumbnail',
              'about':'Berthe Marie Pauline Morisot was a painter and a member of the circle of painters in Paris who became known as the Impressionists. She was described by Gustave Geffroy...'},
              {'name':'Antoine_Guillemet',
              'portraitSrc':'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Morisot_TheArtistsDaughterJulieWithHerNanny_MIA_9640.jpg/100px-Morisot_TheArtistsDaughterJulieWithHerNanny_MIA_9640.jpg',
              'portraitAlt':'Artist Thumbnail',
              'about':'Berthe Marie Pauline Morisot was a painter and a member of the circle of painters in Paris who became known as the Impressionists. She was described by Gustave Geffroy...'},
              {'name':'Étienne_Buffet',
              'portraitSrc':'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Morisot_TheArtistsDaughterJulieWithHerNanny_MIA_9640.jpg/100px-Morisot_TheArtistsDaughterJulieWithHerNanny_MIA_9640.jpg',
              'portraitAlt':'Artist Thumbnail',
              'about':'Berthe Marie Pauline Morisot was a painter and a member of the circle of painters in Paris who became known as the Impressionists. She was described by Gustave Geffroy...'},
              ]
            );
          } 

        }); // end -- should call artistLists on creation of controller.

        it('should display the name of the artists on the page', function () {

          /*var artists = ['Berthe Morisot', 'Claude Monet', 'Camille Pissarro', 'Antoine Guillemet', 'Étienne Buffet'];
          console.log($('h4')); 
          for(var i = 0; i < artists.length; i++){
            console.log(artists[i]); 
            //expect($('<h4 class = "media-heading">' + artists[i] + '</h4>')).toExist();
            expect($('h4')).toExist();

          }*/
          // TODO get this to work

        }); // end -- should display the name of the artists on the page

    }); // end -- opening main page the first time

    /*
     * Reformatting the JSON category api output
     */

    describe('reformatting category information from category api', function() {

        beforeEach(inject(function ($rootScope,$httpBackend,$controller,artistList,reformatCategories,artistMetadata) {

            _reformatCategories = reformatCategories;

        })); // end -- beforeEach

        // TODO blank artist names?
        it('returns an empty array if given the kitchen sink (non objects)',function(){
          expect(_reformatCategories.reformat(44)).toEqual([]); 

          expect(_reformatCategories.reformat("asdfad")).toEqual([]); 

          expect(_reformatCategories.reformat(undefined)).toEqual([]); 

        }); // end -- returns an empty array if given the kitchen sink (non objects)

        it('returns an empty array if given improperly formatted objects',function(){

          // empty object
          expect(_reformatCategories.reformat({})).toEqual([]); 

          // categories sans astericks
          var intactJSON = JSON.parse(JSON.stringify(staticCategories));
          var badJSON = {'lol': 'nope' };
          expect(_reformatCategories.reformat(badJSON)).toEqual([]); 

          // categories sans random array
          intactJSON = JSON.parse(JSON.stringify(staticCategories));
          badJSON = intactJSON['*'] = {'Man': 'Secret Agent'};
          expect(_reformatCategories.reformat(badJSON)).toEqual([]); 

          // categories sans a 
          intactJSON = JSON.parse(JSON.stringify(staticCategories));
          badJSON = intactJSON['*'][0] = {'Can u dig it?': true};
          expect(_reformatCategories.reformat(badJSON)).toEqual([]); 

          // categories sans a second asterisk 
          intactJSON = JSON.parse(JSON.stringify(staticCategories));
          badJSON = intactJSON['*'][0].a = {'problems':99};
          expect(_reformatCategories.reformat(badJSON)).toEqual([]); 


        }); // end -- returns an empty array if given improperly formatted objects

        it('reformat works with well formatted json',function(){
          expect(_reformatCategories.reformat(staticCategories)).toEqual([
        
            {'name':'Berthe_Morisot',
            'portraitSrc':'/assets/Tripod_easel.jpg',
            'portraitAlt':'Artist Thumbnail',
            'about':'A god damn good artist!'},
            {'name':'Claude_Monet',
            'portraitSrc':'/assets/Tripod_easel.jpg',
            'portraitAlt':'Artist Thumbnail',
            'about':'A god damn good artist!'},
            {'name':'Camille_Pissarro',
            'portraitSrc':'/assets/Tripod_easel.jpg',
            'portraitAlt':'Artist Thumbnail',
            'about':'A god damn good artist!'},
            {'name':'Antoine_Guillemet',
            'portraitSrc':'/assets/Tripod_easel.jpg',
            'portraitAlt':'Artist Thumbnail',
            'about':'A god damn good artist!'},
            {'name':'Étienne_Buffet',
            'portraitSrc':'/assets/Tripod_easel.jpg',
            'portraitAlt':'Artist Thumbnail',
            'about':'A god damn good artist!'}

          ]); 

        }); // end -- reformat works with well formatted json

    }); // end -- describe reformat works with well formatted json

}); // end -- artistBrowserController

