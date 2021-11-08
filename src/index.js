const appl = require('./app');

app.listen(process.env.PORT || 3001, '0.0.0.0', () => {
  console.log("Server is running.");
});
