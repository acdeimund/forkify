import { elements } from './base';

/**
 * Returns the content of the search box.
 */
function getInput(){
    return elements.searchInput.value;
}

/**
 * Clears the search box.
 */
function clearInput(){
    elements.searchInput.value = "";
}

function limitRecipeTitle(title, limit = 22){
    let titleArray = Array.from(title);
    let postfix = title.length > limit ? '...' : '';
    while (titleArray.length > limit){
        titleArray.length = titleArray.lastIndexOf(" ");
    }
    return titleArray.join('') + postfix;
}

/**
 * Renders the recipe passed in to the screen.
 * Private function used in the renderResults function
 * @param {Object} recipe - Expects an Object representing a recipe.
 */
function renderRecipe(recipe){

    const markup =`
                <li>
                    <a class="results__link results__link--active" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="${recipe.title}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>`;
    elements.searchResList.insertAdjacentHTML("beforeend", markup);
}

/**
 * Iterates through the Array of recipes and displays them.
 * @param {Array} recipes - Expects an array of recipes to be rendered. 
 */
function renderResults(recipes){
    recipes.forEach(renderRecipe);
}

/**
 * Clears the search results list.
 */
function clearResults(){
    elements.searchResList.innerHTML = '';
}

export { getInput, clearInput, renderResults, clearResults };