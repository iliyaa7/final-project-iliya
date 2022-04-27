const mongoose = require('mongoose');
const NotFoundError = require('../errors/not-found-err');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(v);
      },
      message: 'Error, not a valid url',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(v);
      },
      message: 'Error, not a valid url',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

articleSchema.statics.isOwensArticle = function isOwensArticle(owner, _id) {
  return this.findById({ _id })
    .orFail(() => {
      throw new NotFoundError('No article found with that id');
    })
    .then((article) => {
      if (JSON.stringify(article.owner).slice(1, -1) !== owner) {
        const CustomError = new Error('You are not the owner of this article');
        CustomError.statusCode = 403;
        throw CustomError;
      }
      return article;
    });
};

module.exports = mongoose.model('article', articleSchema);
