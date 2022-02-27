import React from 'react';
import '../index.css';
import './App.css'
import Header from './Header.js'
import SearchForm from './SearchForm';
import PopupNav from './PopupNav';
import PopupAuth from './PopupAuth';
import Footer from './Footer';
import AboutAuthor from './AboutAuthor';
import Preloader from './Preloader';
import searchNewsApi from '../utils/NewsApi';
import savedNewsApi from '../utils/MainApi'
import NewsCardsList from './NewsCardsList';
import ProtectedRoute from './ProtectedRoute';
import { Switch, Route } from 'react-router';
import SavedNewsHeader from './SavedNewsHeader';
import InfoTooltip from './InfoTooltip';
import CurrentUserContext from '../contexts/CurrentUserContext';

function App() {

  const [isPopupNavOpen, setIsPopupNavOpen] = React.useState(false);
  const [isPopupSigninOpen, setIsPopupSigninOpen] = React.useState(false);
  const [isPopupSignupOpen, setIsPopupSignupOpen] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);
  const [cardsToRender, setCardsToRender] = React.useState(false)
  const [nCardsToRender, setNCardsToRender] = React.useState(3);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState('');
  const [savedArticles, setSavedArticles] = React.useState([])
  const [isInfoPopupOpened, setIstInfoPopupOpened] = React.useState(false);
  const [keyword, setKeyword] = React.useState('');
  const [searchError, setSearchError] = React.useState(false);
  const [isUniqeMaillError, setIsUniqeMailErrror] = React.useState(false);
  const [isIncorrectError, setIsIncorrectError] = React.useState(false);
  const [serverError, setServerError] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      savedNewsApi.getUserInfo(localStorage.getItem('token'))
    .then((res) => {
      setIsLoggedIn(true);
      setCurrentUser(res);
    })
    .then(() => {
      savedNewsApi.getArticles(localStorage.getItem('token'))
      .then((res) => {
        setSavedArticles(res);
      })
    })
    .then(() => {
      if (localStorage.getItem('latest-search')) {
        handleSearchSubmit(localStorage.getItem('latest-search'));
      } return
    })
    .catch((err) => console.log(err));
    }
  }, [])


  function handleSignin(newUserData) {
    resetAuthErrors();
    savedNewsApi.signin(newUserData)
    .then((res) => {
      localStorage.setItem('token', res.token);
    })
    .then(() => {
      savedNewsApi.getUserInfo(localStorage.getItem('token')).then((res) => {
        setCurrentUser(res)
        setIsLoggedIn(true);
        setIsPopupSigninOpen(false)
      })
    })
    .then(() => {
      savedNewsApi.getArticles(localStorage.getItem('token'))
      .then((res) => setSavedArticles(res))
    })
    .catch((err) => {
      if (err.message.includes(401)) {
        setIsIncorrectError(true);
      } else {
        setServerError(true);
      }
      console.log(err)
    });
  }

  function handleRegister(UserData) {
    resetAuthErrors();
    savedNewsApi.signup(UserData)
    .then((res) => {
      console.log(res);
      setIsPopupSignupOpen(false);
      setIstInfoPopupOpened(true);
    })
    .catch((err) => {
      if (err.message.includes(409)) {
        setIsUniqeMailErrror(true);
      } else {
        setServerError(true);
      }
      console.log(err)
    });
  }

  function resetAuthErrors() {
    setIsUniqeMailErrror(false);
    setServerError(false);
    setIsIncorrectError(false);
  }

  function showMoreCards() {
    setNCardsToRender(nCardsToRender + 3);
  }

  function handleSearchSubmit(searchData) {
    setNotFound(false);
    setSearchError(false);
    setIsSearching(true);
    searchNewsApi.getArticles(searchData)
      .then((res) => {
        if (res.articles.length === 0) {
          setIsSearching(false);
          setNotFound(true);
          setCardsToRender(false);
        } else {
          setIsSearching(false);
          setCardsToRender(res.articles);
          localStorage.setItem('latest-search', searchData);
          setKeyword(searchData);
        }
      })
      .catch((err) => {
        setIsSearching(false);
        setSearchError(true);
        setCardsToRender(false);
        console.log(err)
      })
      .finally(setNCardsToRender(3));
  }

  function handleSaveArticle(articleData) {
    savedNewsApi.saveArticle(localStorage.getItem('token'), articleData)
    .then((res) => setSavedArticles([...savedArticles, res]))
     .catch((err) => console.log(err));
  }

  function handleDeleteArticle(articleId) {
    savedNewsApi.deleteSavedArticle(localStorage.getItem('token'), articleId)
    .then((res) => setSavedArticles(savedArticles.filter(article => article._id !== res.deletedArticle._id)))
     .catch((err) => console.log(err));
  }

  function handleOpenPopupSignin() {
    closePopups();
    setIsPopupSigninOpen(true);
  }

  function handleOpenPopupSignup() {
    closePopups();
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
    localStorage.removeItem('latest-search');
    setCardsToRender(false);
    setSavedArticles([]);
    setKeyword('');
    closePopups();
  }


  return (
    <div className='bodyy'>
      <PopupAuth isIncorrectError={isIncorrectError} serverError={serverError} isOpen={isPopupSigninOpen} handleSignin={handleSignin} onClose={closePopups} title={'Sign in'} submitBtnTitle={'Sign in'} isRegister={false} redirectBtn={'Sign up'} handleRedirect={handleOpenPopupSignup}/>
      <PopupAuth isUniqeMaillError={isUniqeMaillError} serverError={serverError} isOpen={isPopupSignupOpen} handleRegister={handleRegister} onClose={closePopups} title={'Sign up'} submitBtnTitle={'Sign up'} isRegister={true} redirectBtn={'Sign in'} handleRedirect={handleOpenPopupSignin}/>
      <InfoTooltip handleRedirect={handleOpenPopupSignin} isOpen={isInfoPopupOpened} onClose={closePopups}/>
      <CurrentUserContext.Provider value={currentUser}>
        <PopupNav isLoggedIn={isLoggedIn} handleLogout={handleLogout} isOpen={isPopupNavOpen} onClose={closePopups} handleOpenPopupSignup={handleOpenPopupSignup}/>
        <Switch>
          <ProtectedRoute loggedIn={isLoggedIn} path='/saved-news'>
            <Header handleLogout={handleLogout} isLoggedIn={isLoggedIn} isSavedNews={true} isPopup={false} handleOpenPopupNav={handleOpenPopupNav}/>
            <SavedNewsHeader keyword={keyword} savedArticles={savedArticles}/>
            {savedArticles.length > 0 && <NewsCardsList handleDeleteArticle={handleDeleteArticle} isSavedNews={true} handleShowMore={showMoreCards} nCardsToRender={nCardsToRender} cardsToRender={savedArticles}/>}
            <Footer/>
          </ProtectedRoute>
          <Route path='/'>
            <div className='upper-container'>
              <Header handleLogout={handleLogout} isSavedNews={false} isLoggedIn={isLoggedIn} isPopup={false} handleOpenPopupNav={handleOpenPopupNav} handleOpenPopupSignup={handleOpenPopupSignup}/>
              <h2 className='upper-container__heading'>What's going on in the world?</h2>
              <p className='upper-container__subtitle'>Find the latest news on any topic and save them in your personal account.</p>
              <SearchForm  handleSubmit={handleSearchSubmit} isLoggedIn={isLoggedIn}/>
            </div>
            <Preloader searchError={searchError} isSearching={isSearching} notFound={notFound}/>
            {cardsToRender && <NewsCardsList handleDeleteArticle={handleDeleteArticle} handleSaveArticle={handleSaveArticle} keyword={keyword} isSavedNews={false} isLoggedIn={isLoggedIn} handleShowMore={showMoreCards} nCardsToRender={nCardsToRender} cardsToRender={cardsToRender} savedArticles={savedArticles}/>}
            <AboutAuthor/>
            <Footer/>
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
