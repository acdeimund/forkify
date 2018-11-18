// const apiKey = '66d7e73566772defde7a2fc14df7e856';
// const proxy = 'https://crossorigin.me/'
// const searchQuery = 'https://www.food2fork.com/api/search?key=';
// const getQuery = 'https://www.food2fork.com/api/get?key=';

import Search from './models/Search.js';
import * as searchView from './views/searchView.js';
import { elements } from './views/base.js';

/**
 * Global state of the app
 * -Current recipe object
 * -Shopping list object
 * -Liked recipes
 */
const state = {};


/**
 * Controls the search bar and adds the apporpriate items to
 * the state of the application.
 */
async function controlSearch(){
    
    // Get query from the view.
    const query = searchView.getInput();

    if(query){

        // Create new Search object and add to state.
        state.search = new Search(query);

        // Prepare UI for results
        //TODO

        // Search for recipes with the Search object we just created in 'state'.
        await state.search.getResults();

        // Render results to the UI
        console.log(state.search.recipes); //TODO
    }
}


elements.searchForm.addEventListener('submit', e =>{
    e.preventDefault();
    controlSearch();
});