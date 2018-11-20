
import Search from './models/Search.js';
import Recipe from './models/Recipe.js';
import * as searchView from './views/searchView.js';
import { elements } from './views/base.js';
import { renderLoader, clearLoader } from './views/loaderView';

/**
 * Global state of the app
 * -Current recipe object
 * -Shopping list object
 * -Liked recipes
 */
let state = {};


/**
 * Controls the search bar and adds the apporpriate items to
 * the state of the application. Should handle any errors.
 */
async function controlSearch(){
    
    // Get query from the view.
    const query = searchView.getInput();

    if(query){

        // Create new Search object and add to state.
        state.search = new Search(query);

        // Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.resultsDiv);
       
        // Search for recipes with the Search object we just created in 'state'.
        try{
            await state.search.getResults();

            // Render results to the UI
            clearLoader();
            searchView.renderResults(state.search.recipes);
        }catch(error){
            clearLoader();
            alert("Something went wrong with your search.");
            console.log(error);
        }
    }
}

/**
 * Controls the fetching, storage, and display of the 'recipe' object in
 * the 'state' object. Should handle any errors.
 */
async function controlRecipe(){

    // Get id from url and remove the '#'.
    const id = window.location.hash.replace('#', '');

    // Test that id exist
    if(id){        

        // Create a new Recipe object and get info from the server.
        state.recipe = new Recipe(id);
        try{
            await state.recipe.getRecipe();

            //Calculate relevent info.
            state.recipe.calcTime()
            state.recipe.calcServings();

            // Prepare the UI for changes.

            //Render results on UI.
            console.log(state.recipe);
        }catch(error){
            alert("Error processing recipe.");
            console.log(error);
        }
    }
}


// Add all the event listeners.

// Add event listener to the search bar.
elements.searchForm.addEventListener('submit', e =>{
    e.preventDefault();
    controlSearch();
});

// Add event listeners to the pagination buttons
elements.searchResPages.addEventListener('click', e =>{
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const page = parseInt(btn.dataset.goto);
        searchView.clearResults();
        searchView.renderResults(state.search.recipes, page);
    }
});

// Add event listener to the Global object for the links to individual recipes
// and check if a recipe is already present when the window is loaded.
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));