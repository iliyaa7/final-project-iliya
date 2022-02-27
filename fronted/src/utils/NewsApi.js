const fetchFunction = (url, headers) => {
  return fetch(url, headers)
    .then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))

}

const apiKey = '33120026ecc346598c10b1d1792d2b47';

const date = new Date();
const last = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
const day = last.getDate();
const month = last.getMonth() + 1;
const year = last.getFullYear();
const from = year + '-' + month + '-' + day;
const to = date;

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this.headers = headers;
  }

  getArticles(searchData) {
    return fetchFunction(`${this._baseUrl}/v2/everything/?q=${searchData}&pageSize=100&from=${from}&to=${to}&apiKey=${apiKey}`);
  }
}
const searchNewsApi = new Api({
  baseUrl: "https://nomoreparties.co/news",
});


export default searchNewsApi

