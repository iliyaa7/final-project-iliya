import React from 'react';
import './SearchForm.css'

function SearchForm(props) {
  const [newsToSearch, setNewsToSearch] = React.useState('');
  const [isValid, setIsValid] = React.useState(true)
  const latestKeyword = localStorage.getItem('latest-search');

  React.useEffect(() => {
    if (!props.isLoggedIn) {
      setNewsToSearch('');
    } return
  }, [props.isLoggedIn])

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

   function customValidation(e) {
    e.target.setCustomValidity("Please enter a keyword")
  }

  return (
    <form className='search-form' onSubmit={handleSubmit}>
      <input onInvalid={customValidation} onChange={handleinputChange} type='text' name='news' className='search-form__input' placeholder='Enter topic' id='name' value={newsToSearch || ''} required/>
      <button type='submit' className='search-form__button'>Search</button >
    </form>
  );
}

export default SearchForm;
