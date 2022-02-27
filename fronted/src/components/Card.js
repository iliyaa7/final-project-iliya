import React from "react";
import './Card.css';
import noImageFoundPath from '../images/no_image.png';

function Card(props) {

  const [isBtnClick, setIsBtnClick] = React.useState(false)

  React.useEffect(() => {
    if (!props.isSavedNews && props.isLoggedIn) {
      if(props.savedArticles.some(i => i.link === props.card.url)) {
        setIsBtnClick(true);
      } return
    } return
  }, [props.isSavedNews, props.isLoggedIn, props.savedArticles, props.card.url])



  const article = {
   title: props.card.title,
   text: props.card.description || props.card.text,
   date: props.card.publishedAt || props.card.date,
   source: props.card.source.name ||props.card.source,
   link: props.card.url ||props.card.link,
   image: props.card.urlToImage || props.card.image || noImageFoundPath,
   keyword: props.isSavedNews ? props.card.keyword : props.keyword,
   _id: null || props.card._id
  }

  function handleFavoriteClick() {
    if(!isBtnClick) {
      props.handleSaveArticle(article)
      setIsBtnClick(true)
    } else {
      props.savedArticles.forEach((article) => {
        if (article.link === props.card.url) {
          props.handleDeleteArticle(article._id);
          setIsBtnClick(false);
        }
      })
    }
  }

  function handleDeleteCard() {
    props.handleDeleteArticle(article._id);
  }



  const articleDate = new Date(article.date);
  const month = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"][articleDate.getMonth()];
  const formatedArticleDate = month + ' ' + articleDate.getDate() + ', ' + articleDate.getFullYear();



  return (
    <div className="card">
      {!props.isSavedNews && <button onClick={handleFavoriteClick} className={`card__button ${isBtnClick ? 'card__button_type_favorite_active' :' card__button_type_favorite'}`} disabled={!props.isLoggedIn}/>}
      {props.isSavedNews && <button onClick={handleDeleteCard} className='card__button card__button_type_delete'/>}
      {props.isSavedNews && <p className='card__keyword'>{article.keyword}</p>}
      {props.isSavedNews ? <p className='card__hover-elemnt'>Remove from saved</p> : !props.isLoggedIn && <p className='card__hover-elemnt'>Sign in to save articles</p> }
      {isBtnClick ? !props.isSavedNews && props.isLoggedIn && <p className='card__hover-elemnt'>Remove from saved</p> : !props.isSavedNews && props.isLoggedIn && <p className='card__hover-elemnt'>Add to saved</p> }
      <a className='card__link card__link_type_image' href={article.link} target="_blank" rel='noreferrer'>
        <img  src={article.image} alt={`A pic of the article`} className="card__image"/>
      </a>
      <div className='card__bottom-container'>
        <p className='card__date'>{formatedArticleDate}</p>
        <a className='card__link' href={article.link} target="_blank" rel='noreferrer'><h2 className='card__title'>{article.title}</h2></a>
        <a className='card__link' href={article.link} target="_blank" rel='noreferrer'><p className='card__discription'>{article.text}</p></a>
        <p className='card__source'>{article.source}</p>
      </div>
    </div>
  );
}

export default Card;
