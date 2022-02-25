import React from 'react';
import './SearchForm.css'

function SearchForm(props) {
  const [newsToSearch, setNewsToSearch] = React.useState('');;
  const latestKeyword = localStorage.getItem('latest-search');

  React.useEffect(() => {
    if (latestKeyword) {
      setNewsToSearch(latestKeyword);
    } return
  }, [latestKeyword])

  function handleinputChange(e) {
    setNewsToSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.handleSubmit(
      newsToSearch
    );
  }

  return (
    <form className='search-form' onSubmit={handleSubmit}>
      <input onChange={handleinputChange} type='text' name='news' className='search-form__input' placeholder='Enter topic' id='name' value={newsToSearch || ''} minLength='2' maxLength='40' required/>
      <button type='submit' className='search-form__button'>Search</button >
    </form>
  );
}

export default SearchForm;
