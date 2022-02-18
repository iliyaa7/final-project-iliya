const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const InvalidDataError = require('../errors/invalid-data-err');

const NotFoundArticleError = new NotFoundError('No article found with that id');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send(articles))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;
  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => {
      article.owner = undefined;
      res.send(article);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new InvalidDataError('invalid data passed to the server');
      } throw err;
    })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.isOwensArticle(req.user._id, req.params.articleId)
    .then((article) => {
      Article.findByIdAndRemove(article._id)
        .orFail(() => {
          throw NotFoundArticleError;
        })
        .then((deletedArticle) => {
          deletedArticle.owner = undefined;
          res.send({ deletedArticle });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new InvalidDataError('invalid article id');
      } throw err;
    })
    .catch(next);
};
