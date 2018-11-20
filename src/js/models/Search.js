import axios from 'axios';
import{ apiStrings } from './config.js';

/**
 * Search class handels the data and ajax calls for the initial search.
 */
export default class Search{
    
    /**
     * Creates a Search object for the query recieved.
     * @param {string} query - The query recived from the searchView module.
     */
    constructor(query){
        this.query = query;
    }

    /**
     * Submits the query. Errors will be handled by the controler.
     */
    async getResults() {
        const result = await axios(apiStrings.searchURL + apiStrings.apiKey + apiStrings.queryPrefix + this.query );
        this.recipes = result.data.recipes;
    }
}