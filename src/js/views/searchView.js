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

function createButton(page, type){
    const markup =
`
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`
return markup;
}

function renderButtons(page, numResults, resPerPage){
    const pages = Math.ceil(numResults / resPerPage);

    let button;
    if (page === 1 && pages > 1) {
        // Only button to go to next page
        button = createButton(page, 'next');
    } else if (page < pages) {
        // Both buttons
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        // Only button to go to prev page
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
}



/**
 * Iterates through the Array of recipes and displays them.
 * @param {Array} recipes - Expects an array of recipes to be rendered. 
 */
function renderResults(recipes, page = 1, resPerPage = 10){
    
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    renderButtons(page, recipes.length, resPerPage);
}

/**
 * Clears the search results list and buttons.
 */
function clearResults(){
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

export { getInput, clearInput, renderResults, clearResults };