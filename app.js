const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = 8000;
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use(session({
  secret: "power",
  resave: false,
  saveUninitialized: false,
  name: 'sesid',
  cookie: {
    httpOnly: true,
    maxAge: 3600000,
    sameSite: true,
    secure: false
  }
}));

const redirectLogin = (req, res, next) => {
  if (!req.session.userID) {
    res.redirect('/login');
  } else {
    next();
  }
}

const redirectHome = (req, res, next) => {
  if (req.session.userID) {
    res.redirect('/home');
  } else {
    next();
  }
}

const users = [
  {
    id: 1,
    name: "marius",
    email: "marius@gmail.com",
    password: "123"
  },
  {
    id: 2,
    name: "daniel",
    email: "dan@gmail.com",
    password: "secret"
  },
  {
    id: 3,
    name: "claudiu",
    email: "claudiu@gmail.com",
    password: "secret"
  }
]


app.get('/', redirectLogin, (req, res) => {
  //const userID = req.session.userID;
  const { userID } = req.session;
  //const userID = 1;

  res.send(`
    <h1>Welcome!<h1>
    ${userID ? `
    <a href="/home">Home</a>
    <form method="POST" action="/logout">
      <input type="submit" value="Logout">
    </form>
    ` : `
    <a href="/login">Login</a>
    <a href="/register">Register</a>
    `}
  `)
});

app.get('/home', redirectLogin, (req, res) => {
  res.render("home", { user: users[req.session.userID - 1].name });
});

app.get('/movies', redirectLogin, (req, res) => {
  res.render("movies", { user: users[req.session.userID - 1].name });
});

app.get('/booktickets', redirectLogin, (req, res) => {
  res.render("booktickets", { user: users[req.session.userID - 1].name });
});

app.get('/bar_menu', redirectLogin, (req, res) => {
  res.render("bar_menu", { user: users[req.session.userID - 1].name });
});

// a = true;
app.get('/prizes', redirectLogin, (req, res) => {
  res.render("prizes",
    {
      winnerCode: "Unavailable",
      prize: "No prizes won yet. Order tickets to get a winner code!",
      path: "",
      msg: "",
      user: users[req.session.userID - 1].name
    });
});

// app.get("/validare", (req, res) => {
//   a = false;
// });


app.post('/prizes', redirectLogin, (req, res) => {
  let randomCode, prize, path, msg, c;
  // if (a == false) {
  randomCode = (Math.floor(Math.random() * 0xffff + 1)).toString(16);
  prize = "Congrats, you won 1x ";
  path, msg;
  c = parseInt("0x" + randomCode);
  if (c < 10000) {
    prize += "Popcorn!";
    path = "images/popcorn.jpg";
    msg = "Claim your prize in the last 30min before the movie starts. See you at the Marbal Cinema!";
  } else if (c < 20000) {
    prize += "Cola!";
    path = "images/cola.png";
    msg = "Claim your prize in the last 30min before the movie starts. See you at the Marbal Cinema!";
  } else if (c < 30000) {
    prize += "Popcorn + Cola(Menu)!";
    path = "images/cola_popcorn.png";
    msg = "Claim your prize in the last 30min before the movie starts. See you at the Marbal Cinema!";
  } else if (c < 40000) {
    prize = "Very unlucky, you didn't win anything! Sorry, maybe next time.";
  } else if (c < 50000) {
    prize += "Nachos!";
    path = "images/nachos.png";
    msg = "Claim your prize in the last 30min before the movie starts. See you at the Marbal Cinema!";
  } else if (c < 60000) {
    prize += "Nachos + Cola(Menu)!";
    path = "images/nachos_cola.png";
    msg = "Claim your prize in the last 30min before the movie starts. See you at the Marbal Cinema!";
  } else {
    prize = "Very unlucky, you didn't win anything! Sorry, maybe next time.";
    // }
    // a = true;
  }

  res.render("prizes", {
    winnerCode: randomCode,
    prize: prize,
    path: path,
    msg: msg,
    user: users[req.session.userID - 1].name
  });

});

app.listen(port, () => {
  console.log(`Serverul rulează la adresa http://localhost:8000`);
});


app.get('/login', (req, res) => {
  res.render("login");
})

app.get('/register', (req, res) => {
  res.render("register");
})

app.post('/login', redirectHome, (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const user = users.find(
      user => user.email === email && user.password === password
    )
    if (user) {
      req.session.userID = user.id;
      return res.redirect('/home');
    }
  }
  res.redirect('/login');
})

app.post('/register', redirectHome, (req, res) => {
  const { name, email, password } = req.body;

  if (name && email && password) {
    const exists = users.some(
      user => user.email === email
    )
    if (!exists) {
      const user = {
        id: users.length + 1,
        name,
        email,
        password
      }
      users.push(user);
      req.session.userID = user.id;
      return res.redirect('/login');
    }
  };
  res.redirect('/register');
})

app.post('/logout', redirectLogin, (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/home');
    }
  })
  res.clearCookie('sesid');
  res.redirect('/login');
})