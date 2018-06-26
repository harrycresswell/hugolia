// Example Javascript File with ES6 support
import {whoAmI} from "./imports"

const me = whoAmI()

console.log("Hello world! I'm " + me)
console.log("Find me in src/js/scripts.js")

// Set Algolia options
const options = {
  appId: 'B0AX7GJQ2W',
  apiKey: '1ba66e5f7ccc7b6be26026ea9c8c6f35',
  indexName: 'hugoalgolia',
  hitsPerPage: 10,
  routing: true
}

// Parse options to instantsearch
const search = instantsearch(options);

// initialize SearchBox
search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-box',
    placeholder: 'Search for post',
    reset: false,
    cssClasses: {
     root: 'Search-box__container',
     input: 'Search-box__input',
    }
  })
);

// create variable for custom hit template
var hitTemplate =
  '<a href="{{ relpermalink }}" class="List__item">' +
      '<div class="List-image">' +
        '<img data-src="https://res.cloudinary.com/dagngxlx5/image/upload/w_auto,dpr_auto,c_scale/{{{featuredimage}}}" class="cld-responsive" />'
    + '</div>' +
      '<div class="List-title">{{{_highlightResult.title.value}}}</div>' +
  '</a>' 
+ '<div class="List-summary">{{{summary}}}</div>';



// initialize hits widget
search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    cssClasses: {
      root:'Search-hits',
      empty:'Search-hits--empty'
    },
    templates:{
      // call custom hit template
      item: hitTemplate,
      empty: 'Didn’t find any results for the search <em>\"{{query}}\"</em>'
    }
  })
);

// initialize RefinementList
search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#refinement-list',
    attributeName: 'categories'
  })
);

search.start();
