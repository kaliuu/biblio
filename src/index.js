const app = require('./app');
async function main() {
  await app.app.listen(process.env.PORT || 3030);
}
main();
