import React from 'react';
import './SavedNewsHeader.css'
import CurrentUserContext from '../contexts/CurrentUserContext';

function SavedNewsHeader(props) {
  const CurrentUser = React.useContext(CurrentUserContext)


  return(
    <div className='saved-news__header-container'>
      <h2 className='saved-news__title'>Saved articles</h2>
      <h3 className='saved-news__discription'>{CurrentUser.name}{props.savedArticles.length > 0 ?  `, you have ${props.savedArticles.length} saved articles` : ', you have no saved articles yet'} </h3>
      <p className='saved-news__keywords'>By keywords:<span className='saved-news__keywords saved-news__keywords_type_bold'> Nature, Yellowstone, and 2 other</span></p>
    </div>

  )
}

export default SavedNewsHeader;