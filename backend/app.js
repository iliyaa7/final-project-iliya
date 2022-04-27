const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const articlesRoute = require('./routes/articles');
const usersRoute = require('./routes/users');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const { validateRegister, validateLogin } = require('./middlewares/validateUserData');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const centalizedErrHandler = require('./middlewares/centralizedHandler');
require('dotenv').config();

const app = express();
const { MONGOOSE_PATH = 'mongodb://localhost:27017/finalproject' } = process.env;

mongoose.connect(MONGOOSE_PATH);

const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.post('/signup', validateRegister, createUser);
app.post('/signin', validateLogin, login);
app.use(auth);
app.use('/', articlesRoute);
app.use('/', usersRoute);

app.use(errorLogger);
app.use(errors());
app.use(centalizedErrHandler);
app.use((req, res, next) => {
  res.status(404).send('Error 404 - Path not found on the server');
});

app.listen(PORT);


