const appl = require('./app');

const port = process.env.PORT || 3000;
appl.app.listen(port, () => console.log(`Aplicació inicada al port ${port}`))
