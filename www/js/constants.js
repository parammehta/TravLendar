STAGE = "dev";

DOMAIN_URL = "https://travlendar.auth.us-west-2.amazoncognito.com/";
CLIENT_ID = "6bupvvcgul3khv72jsmaa8mnno";
AUTH_URL = "https://travlendar.auth.us-west-2.amazoncognito.com/login?client_id=6bupvvcgul3khv72jsmaa8mnno&redirect_uri=";
REDIRECT_URI = (STAGE == "prod") ? "https://travlendar.com" :"https://localhost:4443";


//API's

CALENDAR_API = "https://xbfmz7x8c7.execute-api.us-west-2.amazonaws.com/" + STAGE + "/calendar";
PROFILE_API = "https://xbfmz7x8c7.execute-api.us-west-2.amazonaws.com/" + STAGE + "/profile";