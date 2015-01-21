var koa = require('koa');
var app = koa();
var router = require('koa-router');

app.use(router(app));

var requestTime = function(headerName) {
  return function *(next){
    var start = new Date();
    yield next;
    var end = new Date();
    var ms = end - start;
    this.set(headerName, ms + 'ms');
  }
};

app.use(requestTime('Response-time'));

app.get('/', function *(){
  this.body = 'Hello from koajs using the router moddleware';
});

app.get('/date', function *(){
  this.body = new Date();
});

// app.use(function *(){
//   var url = this.request.url;
//   if(url === '/') {
//     this.body = 'Hello from koajs';
//   }
//   else if(url === '/date') {
//     this.body = new Date();
//   }
//   else {
//     this.status = 404;
//     this.body = 'Sorry friend, I don\'t know what you want';
//   }
// });

app.listen(3000);
