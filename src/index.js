const app = require('./app');

const port = process.env.PORT || 3000;

app.app.listen(port, () => console.log(`Aplicació inicada al port ${port}`))
