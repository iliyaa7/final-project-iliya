const fetchFunction = (url, headers) => {
  return fetch(url, headers)
    .then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))

}


class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  signup(newUserData) {
    return fetchFunction(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUserData)
    });
  }

  signin(userData) {
    return fetchFunction(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });
  }

  getUserInfo(token) {
    return fetchFunction(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    });
  }

  getArticles(token) {
    return fetchFunction(`${this._baseUrl}/articles`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    });
  }

  saveArticle(token, articleData) {
    return fetchFunction(`${this._baseUrl}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify(articleData)
    });
  }

  deleteSavedArticle(token, articleId) {
    return fetchFunction(`${this._baseUrl}/articles/${articleId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    });
  }


}
const savedNewsApi = new Api({
  baseUrl: "https://api.iliyaa7-final-project.students.nomoreparties.sbs"
});

export default savedNewsApi


