import './SavedNewsHeader.css'

function SavedNewsHeader() {

  return(
    <div className='saved-news__header-container'>
      <h2 className='saved-news__title'>Saved articles</h2>
      <h3 className='saved-news__discription'>Iliya, you have 5 saved articles</h3>
      <p className='saved-news__keywords'>By keywords:<span className='saved-news__keywords saved-news__keywords_type_bold'> Nature, Yellowstone, and 2 other</span></p>
    </div>

  )
}

export default SavedNewsHeader;