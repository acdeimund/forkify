import axios from 'axios';

export default class Search{
    constructor(query){
        this.query = query;
    }

    async getResults() {
        const apiKey = '66d7e73566772defde7a2fc14df7e856';
        const searchQuery = 'https://www.food2fork.com/api/search?key=';
        try{
            const result = await axios(searchQuery + apiKey + '&q=' + this.query );
            this.recipes = result.data.recipes;
            // console.log(this.result);
        }catch (error){
            alert(error);
        }
    }
}