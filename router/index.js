const api = require('koa-router')();
const user = require('./user');
const info = require('./info');

api.use(user.routes());
api.use(info.routes());

module.exports = api.use('/api-front',api.routes(),api.allowedMethods());