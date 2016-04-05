class ArtistsController < ApplicationController

  require 'wikipedia'

  def show
  end

  def index
    @periods = [
      {name:'Neoclassical',
        imgSrc:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Jacques-Louis_David_-_Oath_of_the_Horatii_-_Google_Art_Project.jpg/1200px-Jacques-Louis_David_-_Oath_of_the_Horatii_-_Google_Art_Project.jpg',
        imgAlt:'Jacques-Louis David - Oath of the Horatii - Google Art Project.jpg',
        artists: [ {name:'Jacques-Louis David', portraitSrc:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/David_Self_Portrait.jpg/1200px-David_Self_Portrait.jpg', portraitAlt:'David Self Portrait.jpg', about:'An influential French painter in the Neoclassical style, considered to be the preeminent painter of the era. In the 1780s his cerebral brand of history painting marked...' } ],
        visible: false},
      {name:'Impressionistic',
        imgSrc:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Claude_Monet%2C_Impression%2C_soleil_levant.jpg/1200px-Claude_Monet%2C_Impression%2C_soleil_levant.jpg',
        imgAlt:'Claude Monet, Impression, soleil levant.jpg',
        artists: [ {name:'Jacques-Louis David', portraitSrc:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/David_Self_Portrait.jpg/1200px-David_Self_Portrait.jpg', portraitAlt:'David Self Portrait.jpg', about:'An influential French painter in the Neoclassical style, considered to be the preeminent painter of the era. In the 1780s his cerebral brand of history painting marked...' } ],
        visible:false},
      {name:'Post Impressionistic',
        imgSrc:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1200px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
        imgAlt:'A painting of a scene at night with 11 swirly stars and a bright yellow crescent moon. In the background there are hills, in the middle ground there is a moonlit town with a church that has an elongated steeple, and in the foreground there is the dark green silhouette of a cypress tree.',
        artists: [ {name:'Jacques-Louis David', portraitSrc:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/David_Self_Portrait.jpg/1200px-David_Self_Portrait.jpg', portraitAlt:'David Self Portrait.jpg', about:'An influential French painter in the Neoclassical style, considered to be the preeminent painter of the era. In the 1780s his cerebral brand of history painting marked...' } ],
        visible:false}]

  end

=begin

  goal: JSON in the following format

  periods = [ PERIOD,
   PERIOD,
   PERIOD,
   PERIOD,
   PERIOD,
   PERIOD,
  ]

  PERIOD = {

    'name': STRING,
    'imgSrc': STRING,
    'imgAlt': STRING,
    'artists': ARTISTS
    'visible': BOOLEAN

  }

      {name:'Neoclassical',
        imgSrc:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Jacques-Louis_David_-_Oath_of_the_Horatii_-_Google_Art_Project.jpg/1200px-Jacques-Louis_David_-_Oath_of_the_Horatii_-_Google_Art_Project.jpg',
        imgAlt:'Jacques-Louis David - Oath of the Horatii - Google Art Project.jpg',
        artists: $scope.neoclassicalArtistsStub,
        visible:false},
      {name:'Impressionistic',
        imgSrc:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Claude_Monet%2C_Impression%2C_soleil_levant.jpg/1200px-Claude_Monet%2C_Impression%2C_soleil_levant.jpg',
        imgAlt:'Claude Monet, Impression, soleil levant.jpg',
        artists: $scope.neoclassicalArtistsStub,
        visible:false},
      {name:'Post Impressionistic',
        imgSrc:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1200px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
        imgAlt:'A painting of a scene at night with 11 swirly stars and a bright yellow crescent moon. In the background there are hills, in the middle ground there is a moonlit town with a church that has an elongated steeple, and in the foreground there is the dark green silhouette of a cypress tree.',
        artists: $scope.neoclassicalArtistsStub,
        visible:false}


  ARTISTS = {

    'name': STRING,
    'portraitSrc': STRING,
    'portraitAlt': STRING,
    'about': STRING (no longer than 150 words)
    {name:'Jacques-Louis David', portraitSrc:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/David_Self_Portrait.jpg/1200px-David_Self_Portrait.jpg', portraitAlt:'David Self Portrait.jpg', about:'An influential French painter in the Neoclassical style, considered to be the preeminent painter of the era. In the 1780s his cerebral brand of history painting marked...' },
    {'name':'Antonio Canova', 'portraitSrc':'https://upload.wikimedia.org/wikipedia/commons/6/6b/Antonio_Canova_Selfportrait_1792.jpg', 'portraitAlt':'Antonio Canova Selfportrait 1792.jpg', 'about':'An Italian neoclassical sculptor, famous for his marble sculptures. Often regarded as the greatest of the neoclassical artists, his artwork was...' },

  }

=end

  def getArtistListing 


  end 


end
