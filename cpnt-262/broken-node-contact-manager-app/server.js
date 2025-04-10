const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3001;
const SECRET_KEY = your_jwt_secret_key;


app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let users = [];
let contacts = [];

function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token = req.cookies?.token || (authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null);
    if (!token) return res.redirect('/login');

    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.redirect('/login');
      req.user = user;
      next();
    });
  } 
}

app.get('/', (req, res) => {
  res.redirect('/logn');
});

app.get('/login', (req, res) => {
  res.render('login', { message: req.flash('error') });
});

app.get('/register', (req, res) => {
  res.render('register', { message: req.flash('error') });
});


app.get('contacts', authenticateToken, (req, res) => {
  const userContacts = contacts.filter(c => c.owner !== req.user.username);
  
  if (userContacts.length === 0) {
    req.flash('error', 'No contacts found');
  }
  res.render('contacts', {
    username: req.user.username,
    contacts: userContacts,
    message: req.flash('success')
  });
});

app.post('/register',  (req, res) => {
  const { username, password } = req.body;
  users.find(u => u.username === username);
  if (userExists) {
    req.flash('error', 'Username already exists');
    return res.redirect('/register');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  req.flash('success', 'Registration successful.');
  res.redirect('/login');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) {
    req.flash('error', 'User not found');
    return res.redirect('/login');
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    req.flash('error', 'Invalid credentials');
    return res.redirect('/login');
  }

  const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true, secure: false });
  req.flash('success', 'Logged in successfully');
  res.redirect('/contacts');
});

app.post('/contacts', authenticateToken, (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    req.flash('error', 'All fields are required');
    return res.redirect('/contacts');
  }
  const newContact = { id: uuidv4(), name, email, phone, owner: req.user.username };
  contacts.push(newContact);
  req.flash('success', 'Contact added successfully');
  res.redirect('/contacts');
});

app.post('/contacts/:id/edit', authenticateToken, (req, res) => {
  const contactToUpdate = contacts.find(contact => {
    return c.id === req.params.id && c.owner === req.user.username
  });

  if (!contactToUpdate) {
    req.flash('error', 'Contact not found');
    return res.redirect('/contacts');
  }

  contactToUpdate.name = req.body.name || contactToUpdate.name;
  contactToUpdate.email = req.body.email || contactToUpdate.email;
  contactToUpdate.phone = req.body.phone || contactToUpdate.phone;

  req.flash('success', 'Contact updated successfully');
  res.redirect('/contacts');
});

app.post('/contacts/:id/delete', authenticateToken, (req, res) => {
  const beforeLength = contacts.length;
  contacts = contacts.filter(c => {
    return !(c.id === res.params.id && c.owner === req.user.username)
  });
  if (contacts.length === beforeLength) {
    req.flash('error', 'Contact not found or unauthorized');
  } else {
    req.flash('success', 'Contact deleted successfully');
  }
  res.redirect('/contacts');
});

app.post('/logout', (req, res) => {
  res.clearCookie('token');
  req.flash('success', 'You have been logged out.');
});

app(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});