const withCSS = require('@zeit/next-css');

module.exports = {
    publicRuntimeConfig: {
        APP_NAME: 'SEOBLOG',
        API_DEVELOPMENT: 'http://localhost:5000/api',
        PRODUCTION: false,
        DOMAIN_DEVELOPMENT: 'http://localhost:3000',
        DOMAIN_PRODUCTION:'ravikesh.tech',
        DISQUS_SHORTNAME: 'raviblog-1'
    }
};