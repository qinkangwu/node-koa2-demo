const Koa = require('koa');
const app = new Koa();
const router = require('./router');
const logMiddleware = require('./middlewares/logMiddleware.js');
const checkSession = require('./middlewares/checkSessionMiddleware');
const bodyParser = require('koa-bodyparser');
const Eureka = require('eureka-js-client').Eureka;
const numCPUs = require('os').cpus().length;
console.log(numCPUs);
const client = new Eureka({
    // application instance information
    instance: {
      app: 'node-api-server',
      hostName: 'localhost',
      ipAddr: '127.0.0.1',
      port: {
        '$': 3000,
        '@enabled': true,
      },
      vipAddress: 'test.something.com',
      statusPageUrl : 'http://localhost:3000/info',
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      },
      healthCheckUrl : 'http://localhost:3000/info',
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

//启动erueka注册
client.start((err)=>{
    console.log(err || 'node app erueka register completed ~');
})

app.use(logMiddleware());
//app.use(checkSession());
app.use(bodyParser())
app.use(router.routes());

app.listen(3000);
console.log('starting at port 3000');