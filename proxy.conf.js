const backendUrl = process.env.BACKEND_URL || 'http://localhost:1337';
const strapiApiToken = process.env.STRAPI_API_TOKEN;

if (!strapiApiToken) {
  throw new Error('STRAPI_API_TOKEN must be set to proxy Strapi requests.');
}

const strapiHeaders = {
  Authorization: `Bearer ${strapiApiToken}`,
};

const strapiProxy = {
  target: backendUrl,
  secure: false,
  changeOrigin: true,
  headers: strapiHeaders,
};

module.exports = {
  '/api': strapiProxy,
  '/uploads': {
    target: backendUrl,
    secure: false,
    changeOrigin: true,
    headers: strapiHeaders,
  },
};
