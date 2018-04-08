const api = require('koa-router')();
const user = require('./user');

api.use(user.routes());

module.exports = api.use('/api-front',api.routes(),api.allowedMethods());