import React from "react";
import './Card.css';

function Card(props) {

  const [isBtnClick, setIsBtnClick] = React.useState(false)

  // const user = React.useContext(CurrentUserContext);
  // const isOwn = props.card.owner === user._id;
  // const cardDeleteButtonClassName = (
  //   `${isOwn ? 'post__delete-button' : 'post__delete-button post__delete-button_hiden'}`
  // );
  // const isLiked = props.card.likes.some(i => i === user._id);
  // const cardLikeButtonClassName = (
  //   `${isLiked ? 'post__button post__button_active' : 'post__button'}`
  // );

  const isLiked = () => {
    if (!props.isSavedNews && props.isLoggedIn) {
     return props.savedArticles.some(i => i.link === props.card.url);
    }
  }



  const article = {
   title: props.card.title,
   text: props.card.description || props.card.text,
   date: props.card.publishedAt || props.card.date,
   source: props.card.source.name ||props.card.source,
   link: props.card.url ||props.card.link,
   image: props.card.urlToImage || props.card.image,
   keyword: props.isSavedNews ? props.card.keyword : props.keyword,
   _id: null || props.card._id
  }

  function handleFavoriteClick() {
    if(isLiked) {
      props.savedArticles.forEach((article) => {
        if (article.link === props.card.url) {
          props.handleDeleteArticle(article._id);
          setIsBtnClick(false);
        }
      })
    }
      props.handleSaveArticle(article)
      setIsBtnClick(true)
    
  }

  function handleDeleteCard() {
    props.handleDeleteArticle(article._id);
  }



  const articleDate = new Date(article.date);
  const month = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"][articleDate.getMonth()];
  const formatedArticleDate = month + ' ' + articleDate.getDay() + ', ' + articleDate.getFullYear();



  return (
    <div className="card">
      {!props.isSavedNews && <button onClick={handleFavoriteClick} className={`card__button ${isLiked() && 'card__button_type_favorite_active'} ${isBtnClick ? 'card__button_type_favorite_active' :' card__button_type_favorite'}`} disabled={!props.isLoggedIn}/>}
      {props.isSavedNews && <button onClick={handleDeleteCard} className='card__button card__button_type_delete'/>}
      {props.isSavedNews && <p className='card__keyword'>{article.keyword}</p>}
      {props.isSavedNews ? <p className='card__hover-elemnt'>Remove from saved</p> : !props.isLoggedIn && <p className='card__hover-elemnt'>Sign in to save articles</p> }
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

// author: "https://www.facebook.com/bbcnews"
// content: "Image caption, Amnesty's report says Israel enforces a system of oppression and domination against Palestinians\r\nIsraeli laws, policies and practices against Palestinians in Israel and the occupied t… [+5125 chars]"
// description: "The rights group accuses it of racist policies, but Israel fiercely rejects \"the false allegations\"."
// publishedAt: "2022-02-01T09:00:02Z"
// source: {id: 'bbc-news', name: 'BBC News'}
// title: "Israeli policies against Palestinians amount to apartheid - Amnesty"
// url: "https://www.bbc.co.uk/news/world-middle-east-60197918"
// urlToImage: "https://ichef.bbci.co.uk/news/1024/branded_news/CA7D/production/_123073815_mediaitem123067772.jpg"
