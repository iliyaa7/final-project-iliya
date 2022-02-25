const fetchFunction = (url, headers) => {
  return fetch(url, headers)
    .then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))

}




class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this.headers = headers;
  }

  getArticles(searchData) {
    return fetchFunction(`${this._baseUrl}/v2/everything/?q=${searchData}&pageSize=100`, {
      headers: this.headers,
    });
  }
}
const searchNewsApi = new Api({
  baseUrl: "https://newsapi.org",
  headers: {
    authorization: '33120026ecc346598c10b1d1792d2b47',
  }
});


export default searchNewsApi

