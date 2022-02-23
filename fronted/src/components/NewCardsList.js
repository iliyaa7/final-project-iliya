 import React from "react";
 import Card from "./Card"

 function NewsCardsList(props) {

  const nCardsToRender = props.isSavedNews ? 5 : props.nCardsToRender;

  return (
    <section className='news-section'>
      <div className='post-container'>
        {props.cardsToRender.slice(0, nCardsToRender).map(card => (
          <Card key={card.url} card={card} isLoggedIn={props.isLoggedIn} isSavedNews={props.isSavedNews} />
        ))}
      </div>
      {!props.isSavedNews && <button type='button' className='more-button' onClick={props.handleShowMore}>Show more</button>}
    </section>
  )
 }

 export default NewsCardsList;