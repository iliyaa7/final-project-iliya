const fetchFunction = (url, headers) => {
  return fetch(url, headers)
    .then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))

}

export default fetchFunction;