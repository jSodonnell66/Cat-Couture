const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");

const checkJwt = auth({
  audience: "https://catcouture/api",
  issuerBaseURL: "https://dev-wjcsfhytf22o14mk.us.auth0.com/",
});

const checkScopes = requiredScopes("read:reports");

module.exports = {
  checkJwt,
  checkScopes,
};
