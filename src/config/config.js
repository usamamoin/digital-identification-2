// const environment = "production";
const environment = "development";
let url = 'https://erp.mezanbeverages.com/live/index.php?route=api';


const config = {
    production: {
        AUTH_URL: "",
        API_URL: ""
    },
    development: {
        AUTH_URL: url+"/login",
        API_URL: url+"/account"
    }
};

Object.freeze(config);
export default config[environment]