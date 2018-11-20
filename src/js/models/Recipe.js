import axios from 'axios';
import { apiStrings } from './config.js'

/**
 * Recipe class handels the data and ajax calls for the selection of individual recipes.
 */
export default class Recipe{
    
    /**
     * Creates a Recipe object to store relevent information.
     * @param {string} id - The id to be used in the query, usually a string.
     */
    constructor(id){
        this.id = id;
    }

    /**
     * Submits the query. Errors will be handled by the controler.
     */
    async getRecipe(){
        const res = await axios(apiStrings.getURL + apiStrings.apiKey + apiStrings.getPrefix + this.id);
        this.title = res.data.recipe.title;
        this.author = res.data.recipe.publisher;
        this.img = res.data.recipe.image_url;
        this.url = res.data.recipe.source_url;
        this.ingredients = res.data.recipe.ingredients;
    }

    /**
     * Simple calculation of prep time. Assumes 15 minutes per 3 ingredients.
     */
    calcTime(){
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    /**
     * Simple calculation of the number of servings the recipe yeilds.
     */
    calcServings(){
        this.servings = 4;
    }


}