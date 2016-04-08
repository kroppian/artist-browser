'use strict';

var staticCategories = {"n":"result","a":{"querytime_sec":0.015164,"query":"https://petscan.wmflabs.org/?language=en&project=wikipedia&depth=0&categories=French%20Impressionist%20painters&combination=subset&negcats=&ns%5B0%5D=1&larger=&smaller=&minlinks=&maxlinks=&before=&after=&max_age=&show_redirects=both&edits%5Bbots%5D=both&edits%5Banons%5D=both&edits%5Bflagged%5D=both&templates_yes=&templates_any=&templates_no=&outlinks_yes=&outlinks_any=&outlinks_no=&sparql=&manual_list=&manual_list_wiki=&pagepile=&common_wiki=cats&format=json&output_compatability=catscan&sortby=none&sortorder=ascending&wikidata_item=no&wikidata_label_language=&regexp_filter=&doit=Do%20it%21&interface_language=en&active_tab=tab_output"},"*":[{"n":"combination","a":{"type":"subset","*":[{"id":4233,"len":38352,"n":"page","namespace":0,"nstext":"","title":"Berthe_Morisot","touched":"20160405223414"}, {"id":6548,"len":49435,"n":"page","namespace":0,"nstext":"","title":"Claude_Monet","touched":"20160407202909"}, {"id":7434,"len":48292,"n":"page","namespace":0,"nstext":"","title":"Camille_Pissarro","touched":"20160407204606"}, {"id":47454019,"len":11649,"n":"page","namespace":0,"nstext":"","title":"Antoine_Guillemet","touched":"20160405223414"}, {"id":49052643,"len":6631,"n":"page","namespace":0,"nstext":"","title":"Étienne_Buffet","touched":"20160405223414"}]}}]};

describe('artistBrowserController', function() {

    beforeEach(function(){
      module('artist-browser');
    });

    var ctrlScope, testRootScope, _artistList, _reformatCategories, _artistMetadata, httpBackend;

    describe('opening main page the first time', function() {

        beforeEach(inject(function ($rootScope,$httpBackend,$controller,artistList,reformatCategories,artistMetadata) {

            ctrlScope = $rootScope.$new();


            httpBackend = $httpBackend

            _artistList = artistList;
            _reformatCategories = reformatCategories;
            _artistMetadata = artistMetadata;

            /*spyOn(artistList,'populateList').andCallThrough();
            spyOn(reformatCategories,'reformat').andCallThrough();
            spyOn(artistMetadata,'setArtistAbout').andCallThrough();
            spyOn(artistMetadata,'setImgSrc').andCallThrough();*/

            spyOn(artistList,'populateList');
            //spyOn(reformatCategories,'reformat');
            spyOn(artistMetadata,'setArtistAbout');
            spyOn(artistMetadata,'setImgSrc');


            // TODO make this multiline
            httpBackend.expectGET(/.*petscan.wmflabs.org\/?language=en&project=wikipedia&depth=0&categories=[^&]*&combination=subset&negcats=&ns%5B0%5D=1&larger=&smaller=&minlinks=&maxlinks=&before=&after=&max_age=&show_redirects=both&edits%5Bbots%5D=both&edits%5Banons%5D=both&edits%5Bflagged%5D=both&templates_yes=&templates_any=&templates_no=&outlinks_yes=&outlinks_any=&outlinks_no=&sparql=&manual_list=&manual_list_wiki=&pagepile=&common_wiki=cats&format=json&output_compatability=catscan&sortby=none&sortorder=ascending&wikidata_item=no&wikidata_label_language=&regexp_filter=&doit=Do%20it%21&interface_language=en&active_tab=tab_categories&callback=JSON_CALLBACK/).respond(staticCategories);
            //httpBackend.expectGET(/.*/).respond(staticCategories);
            //httpBackend.expectGET("https://bob.com").respond(staticCategories);


            $controller('artistBrowserController', {$scope: ctrlScope, 
                artistList: _artistList, reformatCategories: _reformatCategories, 
                artistMetadata: _artistMetadata,});

        })); // end -- beforeEach

        it('should call artistLists on creation of controller.', function () {

          expect(_artistList.populateList).toHaveBeenCalled();

          expect(ctrlScope.artisticPeriods.length).toBe(3);

        }); // end -- should call artistLists on creation of controller.

    }); // end -- opening main page the first time

    describe('opening main page the first time', function() {

        beforeEach(inject(function ($rootScope,$httpBackend,$controller,artistList,reformatCategories,artistMetadata) {

            _reformatCategories = reformatCategories;

        })); // end -- beforeEach


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

