// ---------- MODULS I VARIABELES -------------
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const firebase = require("firebase-admin");
// Declaració de l'aplicació
const app = express();

// Dues hores en milisegons
const duesHores = 1000 * 60 * 60 * 2;


const PORT = process.env.PORT || 3030
// ----------- OPCIONS --------------
app.set("views", path.join(__dirname, "views")); // On es troben les views

app.use(express.static(path.join(__dirname, "public"))); // On es troben els assets


// Declarem el motor de parcials
app.engine(
  ".hbs", // Extensio a utlitzar
  exphbs({
    defaultLayout: "main",
    extname: ".hbs",
    partialsDir: __dirname + "/views/layouts", // Ubicació
  })
);


// Establim el motor de render a handlebars
app.set("view engine", ".hbs");


// ------------- RUTES ---------------

app.use(require("./routes/routes"));

// ------------- MIDDLEWARE ----------
// Que sols s'ens pugui retornar stings i arrays
app.use(express.urlencoded({ extended: false }));
// ---------- Funcions de middleware -------------------------
const redireccionaLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect('/login')
  } else {
    next();
  }
}
const redireccionaAdmin = (req, res, next) => {
  if (req.session.userId) {
    console.log('🍪: Té una cookie')
    console.log('🍪 actual:', req.session.id)
    res.redirect('/admin')
  } else {
    console.log('🍪: No te una cookie')
    next()
  }
}

// -------------------- FIREBASE -----------------------
const fireConfig = {
  apiKey: "AIzaSyBKz8ENSpk_Zo490y-5y6Gqq9J64ULVtP8",
  authDomain: "bibliotecamartirgras.firebaseapp.com",
  projectId: "bibliotecamartirgras",
  storageBucket: "bibliotecamartirgras.appspot.com",
  messagingSenderId: "115890519251",
  appId: "1:115890519251:web:2c031eaff7cf9e6673a826"
};

firebase.initializeApp(fireConfig);

// Sesió
app.use(
  session({
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    secret: '739328421r883770',
    cookie: {
      maxAge: duesHores,
      sameSite: true,
      secure: false,
    },
  })
);



// INICI DE SESSIÓ
const users = [
  { id: 1, name: 'admin', password: 'admin' }
]

app.get("/admin", redireccionaLogin, (req, res) => {
  res.render("admin", {
    title: "Administrador",
    active: { admin: true },
  })
})

app.get('/login', redireccionaAdmin, (req, res) => {
  res.render("login", {
    title: "Inici de sessió",
    active: { login: true },
  });
})


app.post('/login', redireccionaAdmin, (req, res) => {
  const { user, password } = req.body
  if (user && password) {
    const usuario = users.find(
      usuario => usuario.name === user && usuario.password === password
    )
    if (usuario) {
      console.log('DM: Autentificació correcta!')
      req.session.userId = usuario.id;
      return res.redirect('/admin')
    }
  }

  res.redirect('/login')
})
app.post('/logout', redireccionaLogin, (req, res) => {

  req.session.destroy(err => {
    if (err) {
      return res.redirect('/admin')
    }
    res.clearCookie('sid')
    console.log('🍪 esborrada. Redirigint a login')
    res.redirect('/login')
  }
  )
})

app.listen(PORT, () => {
  console.log(`Servidor funcionant en ${PORT}!`)
});

module.exports = app;
