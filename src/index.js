const app = require('./app');
const PORT = process.env.PORT || 3030
async function main() {
  await app.app.listen(PORT, () => console.log('App iniciada'));
}
main();
