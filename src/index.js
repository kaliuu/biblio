const app = require('./app');
async function main() {
  app.app.listen(process.env.PORT || 5000)
  console.log('App iniciada')
}

main();
