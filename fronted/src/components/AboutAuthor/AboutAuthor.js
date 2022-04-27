import './AboutAuthor.css'

function AboutAuthor() {
  return (
    <div className='about'>
      <div className='about__image'/>
      <div className='about__text-container'>
        <h2 className='about__title'>About the author</h2>
        <p className='about__content'>My name is Iliya Gomon and in this project I have created a responsive fully-fledged web application using React, Node.js, Express and MongoDB.
        </p>
        <p className='about__content'>In this web site the user can search for news from around the world and add them to his personal collection.<br/></p>
      </div>
    </div>
  )
}

export default AboutAuthor;