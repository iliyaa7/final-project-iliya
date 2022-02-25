import React from 'react';
// import { Switch, Route, Redirect } from 'react-router-dom';
import '../index.css';
import './App.css'
import Header from './Header.js'
import SearchForm from './SearchForm';
import PopupNav from './PopupNav';
import PopupAuth from './PopupAuth';
import Footer from './Footer';
import AboutAuthor from './AboutAuthor';
import Preloader from './Preloader';
import searchNewsApi from '../utils/searchNewsApi';
import savedNewsApi from '../utils/savedNewsApi'
import NewsCardsList from './NewsCardsList';
import ProtectedRoute from './ProtectedRoute';
import { Switch, Route } from 'react-router';
import SavedNewsHeader from './SavedNewsHeader';
import InfoTooltip from './InfoTooltip';

function App() {

  const [isPopupNavOpen, setIsPopupNavOpen] = React.useState(false);
  const [isPopupSigninOpen, setIsPopupSigninOpen] = React.useState(false);
  const [isPopupSignupOpen, setIsPopupSignupOpen] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);
  const [cardsToRender, setCardsToRender] = React.useState(false)
  const [nCardsToRender, setNCardsToRender] = React.useState(3);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userName, setUserName] = React.useState('');
  const [savedCards, setSavedCards] = React.useState([])
  const [isInfoPopupOpened, setIstInfoPopupOpened]= React.useState(false);

  React.useEffect(() => {
    searchNewsApi.getArticles('israel')
      .then((res) => setSavedCards(res.articles))
      .catch((err) => console.log(err));
  }, [])

  React.useEffect(() => {
    savedNewsApi.getUserInfo(localStorage.getItem('token'))
    .then(() => {
      setIsLoggedIn(true);
    })
    .then(() => {
      savedNewsApi.getUserInfo(localStorage.getItem('token'))
      .then((res) => {
        setUserName(res.name);
      })
    })
    .then(() => {
      savedNewsApi.getArticles(localStorage.getItem('token'))
      .then((res) => {
        console.log(res);
        // setSavedCards(res);
      })
    })
    .catch((err) => console.log(err));
  }, [])


  function handleSignin(newUserData) {
    savedNewsApi.signin(newUserData)
    .then((res) => {
      localStorage.setItem('token', res.token);
    })
    .then(() => {
      savedNewsApi.getUserInfo(localStorage.getItem('token')).then((res) => {
        setUserName(res.name)
        setIsLoggedIn(true);
        setIsPopupSigninOpen(false)
      })
    })
    .catch((err) => {
      console.log(err);
  });
  }

  function handleRegister(UserData) {
    savedNewsApi.signup(UserData)
    .then((res) => {
      console.log(res);
      setIsPopupSignupOpen(false);
      setIstInfoPopupOpened(true);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function showMoreCards() {
    setNCardsToRender(nCardsToRender + 3);
  }

  function handleSearchSubmit(searchData) {
    setNotFound(false);
    setIsSearching(true);
    searchNewsApi.getArticles(searchData)
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
    closePopups();
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
    setIstInfoPopupOpened(false);
  }

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    closePopups();
  }


  return (
    <div className='bodyy'>
      <PopupAuth isOpen={isPopupSigninOpen} handleSignin={handleSignin} onClose={closePopups} title={'Sign in'} submitBtnTitle={'Sign in'} isRegister={false} redirectBtn={'Sign up'} handleRedirect={handleOpenPopupSignup}/>
      <PopupAuth isOpen={isPopupSignupOpen} handleRegister={handleRegister} onClose={closePopups} title={'Sign up'} submitBtnTitle={'Sign up'} isRegister={true} redirectBtn={'Sign in'} handleRedirect={handleOpenPopupSignin}/>
      <InfoTooltip handleRedirect={handleOpenPopupSignin} isOpen={isInfoPopupOpened} onClose={closePopups}/>
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
