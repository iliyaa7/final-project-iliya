const router = require('express').Router();
const {
  getArticles, createArticle, deleteArticle,
} = require('../controllers/articles');
const { validateArticlePost, validateArticleId } = require('../middlewares/validateArticleData');

router.get('/articles', getArticles);

router.post('/articles', validateArticlePost, createArticle);

router.delete('/articles/:articleId', validateArticleId, deleteArticle);

module.exports = router;
