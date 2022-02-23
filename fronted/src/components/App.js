import React from 'react';
// import { Switch, Route, Redirect } from 'react-router-dom';
import '../index.css';
import Header from './Header.js'
import SearchForm from './SearchForm';
import PopupNav from './PopupNav';
import PopupAuth from './PopupAuth';
import Footer from './Footer';
import AboutAuthor from './AboutAuthor';
import Preloader from './Preloader';
import newsApi from '../utils/api';
import NewsCardsList from './NewCardsList';
import ProtectedRoute from './ProtectedRoute';
import { Switch, Route } from 'react-router';
import SavedNewsHeader from './SavedNewsHeader';

function App() {

  const [isPopupNavOpen, setIsPopupNavOpen] = React.useState(false);
  const [isPopupSigninOpen, setIsPopupSigninOpen] = React.useState(false);
  const [isPopupSignupOpen, setIsPopupSignupOpen] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);
  const [cardsToRender, setCardsToRender] = React.useState(false)
  const [nCardsToRender, setNCardsToRender] = React.useState(3);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [userName, setUserName] = React.useState('Iliya');
  const [savedCards, setSavedCards] = React.useState([])

  React.useEffect(() => {
    newsApi.getArticles('israel')
      .then((res) => setSavedCards(res.articles))
      .catch((err) => console.log(err));
  }, [])

  function showMoreCards() {
    setNCardsToRender(nCardsToRender + 3);
  }

  function handleSearchSubmit(searchData) {
    setNotFound(false);
    setIsSearching(true);
    newsApi.getArticles(searchData)
      .then((res) => {
        if (res.articles.length === 0) {
          setIsSearching(false);
          setNotFound(true);
          setCardsToRender(false);
        }
        setIsSearching(false);
        console.log(res);
        setCardsToRender(res.articles)
      })
      .catch((err) => {
        setIsSearching(false);
        setNotFound(true);
        setCardsToRender(false);
        console.log(err)
      })
      .finally(setNCardsToRender(3));
  }

  function handleOpenPopupSignin() {
    setIsPopupSignupOpen(false);
    setIsPopupNavOpen(false);
    setIsPopupSigninOpen(true);
  }

  function handleOpenPopupSignup() {
    setIsPopupSigninOpen(false);
    setIsPopupSignupOpen(true);
  }

  function handleOpenPopupNav() {
    setIsPopupNavOpen(true);
  }

  function closePopups() {
    setIsPopupNavOpen(false);
    setIsPopupSigninOpen(false);
    setIsPopupSignupOpen(false);
  }

  function handleLogout() {
    setIsLoggedIn(false);
    closePopups();
  }


  return (
    <div className='bodyy'>
      <PopupAuth isOpen={isPopupSigninOpen} onClose={closePopups} title={'Sign in'} submitBtnTitle={'Sign in'} isRegister={false} redirectBtn={'Sign up'} handleRedirect={handleOpenPopupSignup}/>
      <PopupAuth isOpen={isPopupSignupOpen} onClose={closePopups} title={'Sign up'} submitBtnTitle={'Sign up'} isRegister={true} redirectBtn={'Sign in'} handleRedirect={handleOpenPopupSignin}/>
      <PopupNav userName={userName} isLoggedIn={isLoggedIn} handleLogout={handleLogout} isOpen={isPopupNavOpen} onClose={closePopups} handleOpenPopupSignin={handleOpenPopupSignin}/>
      <Switch>
        <ProtectedRoute loggedIn={isLoggedIn} path='/saved-news'>
          <Header handleLogout={handleLogout} isLoggedIn={isLoggedIn} isSavedNews={true} userName={userName} isPopup={false} handleOpenPopupNav={handleOpenPopupNav} handleOpenPopupSignin={handleOpenPopupSignin}/>
          <SavedNewsHeader/>
          <NewsCardsList isSavedNews={true} handleShowMore={showMoreCards} nCardsToRender={nCardsToRender} cardsToRender={savedCards}/>
          <Footer/>
        </ProtectedRoute>
        <Route path='/'>
          <div className='upper-container'>
            <Header handleLogout={handleLogout} isSavedNews={false} isLoggedIn={isLoggedIn} userName={userName} isPopup={false} handleOpenPopupNav={handleOpenPopupNav} handleOpenPopupSignin={handleOpenPopupSignin}/>
            <h2 className='upper-container__heading'>What's going on in the world?</h2>
            <p className='upper-container__subtitle'>Find the latest news on any topic and save them in your personal account.</p>
            <SearchForm handleSubmit={handleSearchSubmit}/>
          </div>
          <Preloader isSearching={isSearching} notFound={notFound}/>
          {cardsToRender && <NewsCardsList isSavedNews={false} isLoggedIn={isLoggedIn} handleShowMore={showMoreCards} nCardsToRender={nCardsToRender} cardsToRender={cardsToRender}/>}
          <AboutAuthor/>
          <Footer/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
