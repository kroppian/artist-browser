# artist-browser

## Overview

I was asked in my Mutually Human interview to make a project that presented an interesting API. Since I'm visiting my art-loving parents this weekend, I thought it would be fun to make something that would make them smile. So, I decided to leverage wikipedia to help them discover new artists in certain eras. 

## APIs used 

I originally planned to get a listing of artists from Wikipedia's category pages (like [this one](https://en.wikipedia.org/wiki/Category:French_Impressionist_painters)) from the [wikpidia api](https://www.mediawiki.org/wiki/API:Main_page). However, there isn't an straigtforward API url for wikipedia categories because they're different from average wiki pages. Where wiki pages are typically represented by wiki markdown for that particular article, the category pages are aggregated by all existing articles that claim to be member of that category. However, I found a decent wrapper API http://petscan.wmflabs.org/ which allowed me to query wikipedia categories easily. 

The rest of the page pulls data from the main wikpedia api. I pull thumbail images and about portions of the webpages. I only pull the images at 100x100 to speed up the loading process. 

## Technologies Used 

I used rails as my webserver. However, almost all of the logic in the page is written in Angular. I chose Angular because:
1. It's a single page application
2. It would have a fairly complex user interface with dynamic dom changes
3. The frequent API calls would be sped up with asynchronus functions
4. It makes more sense for the data to go straight to the client browswer. Otherwise the application server is acting as a middle man for all transactions.

Finally, I used jasmine as my test frame work, along with jasmine-rails as my very helpful test runner. 

## Usage

1. Clone repo
2. run `bundle install` to get gems
3. run `bin/rake jasmine` to run tests, and visit localhost:8888 on your browser to see results
4. run `bin/rails server` to start the server
5. open localhost:3000 to visit page!

## Future Improvements

I'd like to show a loading splash while the API data is being loaded. That way, users won't try to click on the eras before they're loaded. 

