export const API_URL = process.env.REACT_APP_API_URL;
export const AUTH_CONFIG = {
    "domain": process.env.REACT_APP_AUTH0_DOMAIN,
    "clientId": process.env.REACT_APP_AUTH0_CLIENT_ID,
    "audience": API_URL
};
