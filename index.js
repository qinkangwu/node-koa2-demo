const Koa = require('koa');
const app = new Koa();
const router = require('./router');
const logMiddleware = require('./lib/logMiddleware.js');
const bodyParser = require('koa-bodyparser');
const Eureka = require('eureka-js-client').Eureka;
const client = new Eureka({
    // application instance information
    instance: {
      app: 'qkw_test',
      hostName: 'localhost',
      ipAddr: '127.0.0.1',
      port: {
        '$': 3000,
        '@enabled': true,
      },
      vipAddress: 'test.something.com',
      statusPageUrl : 'http://localhost:3000/api-front/info',
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      },
      healthCheckUrl : 'http://localhost:3000/api-front/info',
    },
    eureka: {
        heartbeatInterval : 20000,
        serviceUrls : {
            default : [
                'http://172.16.1.96:8761/eureka/apps/',
                'http://172.16.1.97:8761/eureka/apps/'
            ]
        }
    },
});

client.start((err)=>{
    console.log(err || 'node app erueka register completed ~');
})

app.use(logMiddleware());
app.use(bodyParser())
app.use(router.routes());

app.listen(3000);
console.log('starting at port 3000');