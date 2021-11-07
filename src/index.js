const app = require('./app');
app.app.set('port', (process.env.PORT || 3030));
async function main() {
  await app.app.listen(app.app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.app.get('port'))
  })
}

main();
