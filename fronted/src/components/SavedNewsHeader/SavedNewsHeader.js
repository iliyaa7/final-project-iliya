import React from 'react';
import './SavedNewsHeader.css'
import CurrentUserContext from '../../contexts/CurrentUserContext';

function SavedNewsHeader(props) {
  const CurrentUser = React.useContext(CurrentUserContext)
  const [sortedKeywords, setSortedKeywords] = React.useState([]);


  React.useEffect(() => {
    const keywordsArray = [];
    props.savedArticles.forEach(article => {
      keywordsArray.push(article.keyword);
    });
    const keywordByPopularity = keywordsArray.reduce((previousKeyword, currentKeyword) =>
    {
       // eslint-disable-next-line
      return previousKeyword[currentKeyword] ? ++previousKeyword[currentKeyword] : previousKeyword[currentKeyword] = 1, previousKeyword;
    }, {})

  function compareFrequency(a, b) {
    return keywordByPopularity[b] - keywordByPopularity[a];
  }
  setSortedKeywords(Object.keys(keywordByPopularity).sort(compareFrequency));
  }, [props.savedArticles])

  const keywordsToRender = () => {
    if (sortedKeywords.length < 4) {
      return sortedKeywords.join(', ')
    } else {
      return `${sortedKeywords[0]} ${sortedKeywords[1]}, and ${sortedKeywords.length - 2} more`
    }
  }

  return(
    <div className={`saved-news__header-container ${(props.savedArticles.length === 0) && 'saved-news__header-container_long'}`}>
      <h2 className='saved-news__title'>Saved articles</h2>
      <h3 className='saved-news__discription'>{CurrentUser.name}{props.savedArticles.length > 0 ?  `, you have ${props.savedArticles.length} ${props.savedArticles.length < 2 ? 'saved article' : 'saved articles'}` : ", you haven't saved any articles yet"} </h3>
      <p className='saved-news__keywords'>By keywords: <span className='saved-news__keywords saved-news__keywords_type_bold'>{keywordsToRender()}</span></p>
    </div>

  )
}

export default SavedNewsHeader;