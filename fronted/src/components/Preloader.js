import searchingPath from '../images/Ellipse.png'
import notFoundPath from '../images/not-found.png'

function Preloader(props) {

  return(
    <div className='preloader'>
      {props.isSearching && <img className='perloader__searching-image rotation' src={searchingPath} alt='searching animation'/>}
      {props.isSearching && <p className='preloader__searching-text'>Searching for news</p>}
      {props.notFound && <img className='perloader__not-found-image' src={notFoundPath} alt='searching animation'/>}
      {props.notFound && <h2 className='preloader__title'>Nothing found</h2>}
      {props.notFound && <p className='preloader__not-found-text'>Sorry, but nothing matched<br/>your search terms.</p>}
    </div>
  )
}

export default Preloader;
