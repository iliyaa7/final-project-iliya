const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const InvalidDataError = require('../errors/invalid-data-err');

const NotFoundUserError = new NotFoundError('No user found with that id');

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      user.password = undefined;
      res.send({ message: 'user created succefuly', createdUser: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new InvalidDataError('invalid data passed to the server');
      } else if (err.code === 11000) {
        const UniqeEmailError = new Error('User with that email already exists');
        UniqeEmailError.statusCode = 409;
        throw UniqeEmailError;
      } throw err;
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;

  User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({ token: jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' }) });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw NotFoundUserError;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new InvalidDataError('invalid user id');
      } throw err;
    })
    .catch(next);
};
