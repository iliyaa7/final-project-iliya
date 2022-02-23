import React from "react";
import trashPath from '../images/trash.png'

function Card(props) {

  // const user = React.useContext(CurrentUserContext);
  // const isOwn = props.card.owner === user._id;
  // const cardDeleteButtonClassName = (
  //   `${isOwn ? 'post__delete-button' : 'post__delete-button post__delete-button_hiden'}`
  // );
  // const isLiked = props.card.likes.some(i => i === user._id);
  // const cardLikeButtonClassName = (
  //   `${isLiked ? 'post__button post__button_active' : 'post__button'}`
  // );


  const articleDate = new Date(props.card.publishedAt);
  const month = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"][articleDate.getMonth()];
  const formatedArticleDate = month + ' ' + articleDate.getDay() + ', ' + articleDate.getFullYear();



  return (
    <div className="card">
      {!props.isSavedNews && <button className='card__button card__button_type_favorite'/>}
      {props.isSavedNews && <button className='card__button card__button_type_delete'/>}
      {props.isSavedNews && <p className='card__keyword'>Nature</p>}
      {props.isSavedNews ? <p className='card__hover-elemnt'>Remove from saved</p> : !props.isLoggedIn && <p className='card__hover-elemnt'>Sign in to save articles</p> }
      <a className='card__link card__link_type_image57' href={props.card.url} target="_blank" rel='noreferrer'>
        <img  src={props.card.urlToImage} alt={`A pic of the article`} className="card__image"/>
      </a>
      <div className='card__bottom-container'>
        <p className='card__date'>{formatedArticleDate}</p>
        <a className='card__link' href={props.card.url} target="_blank" rel='noreferrer'><h2 className='card__title'>{props.card.title}</h2></a>
        <a className='card__link' href={props.card.url} target="_blank" rel='noreferrer'><p className='card__discription'>{props.card.description}</p></a>
        <p className='card__source'>{props.card.source.name}</p>
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
