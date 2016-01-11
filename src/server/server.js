require('babel-core/register'); //enables ES6 ('import'.. etc) in Node
if (process.env.NODE_ENV === 'production') {
  require('./server.prod')
} else {
  require('./server.dev');
}
