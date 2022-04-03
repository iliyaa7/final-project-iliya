 import React from "react";
 import Card from "../Card/Card";
 import './NewsCardsList.css'

 function NewsCardsList(props) {

  const nCardsToRender = props.isSavedNews ? props.cardsToRender.length : props.nCardsToRender;

  return (
    <section className='news-section'>
      <ul className='post-container'>
        {props.cardsToRender.slice(0, nCardsToRender).map(card => (
          <li className='post-container__list-item' key={card.url || card.link}><Card  handleOpenPopupSignin={props.handleOpenPopupSignin} cardServerError={props.cardServerError} handleDeleteArticle={props.handleDeleteArticle} savedArticles={props.savedArticles} keyword={props.keyword} handleSaveArticle={props.handleSaveArticle} card={card} isLoggedIn={props.isLoggedIn} isSavedNews={props.isSavedNews} /></li>
        ))}
      </ul>
      {!props.isSavedNews && <button type='button' className='more-button' onClick={props.handleShowMore}>Show more</button>}
    </section>
  )
 }

 export default NewsCardsList;