// import clean from 'clean-tagged-string';
import axios from 'axios';

class Api {

    constructor() {
    }

    getMovies() {
        // const query = clean`{
        //         movie(index:1) {
        //         title,
        //         cover
        //         }
        //     }`
        // axios.get(`/q?query=${query}`).then(response => console.log(response));
    }
}





export let api = new Api();
