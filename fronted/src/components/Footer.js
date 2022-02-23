import React from 'react';
import githubPath from '../images/github.svg'
import facebookPath from '../images/facebook.svg'
import { Link } from 'react-router-dom'

function Footer() {
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const updatePredicate = () => {
      setIsDesktop(window.matchMedia('(min-width: 560px)').matches)
    }
    updatePredicate();
    window.addEventListener('resize', updatePredicate);

    return () => window.removeEventListener('resize', updatePredicate);
  },[])

  if (isDesktop) {
    return (
      <footer className='footer'>
        <p className='footer__copyright'>{`© ${new Date().getFullYear()} Supersite, Powered by News API`}</p>
        <Link className="link-container" to="/"><button type='button' className='footer__home-button'>Home</button></Link>
        <a className='footer__link' href='https://practicum.yandex.com/' target="_blank" rel='noreferrer'>Practicum by Yandex</a>
        <a className='footer__link-image' href='https://github.com/iliyaa7' target="_blank" rel='noreferrer'><img src={githubPath} alt='github logo'/></a>
        <a className='footer__link-image' href='https://www.facebook.com/gomon' target="_blank" rel='noreferrer'><img src={facebookPath} alt='facebook logo'/></a>
      </footer>
    )
  }

  return (
    <footer className='footer footer_type_mobile'>
      <div className='footer__mobile-container'>
        <Link className="link-container" to="/"><button type='button' className='footer__home-button'>Home</button></Link>
        <a className='footer__link-image' href='https://github.com/iliyaa7' target="_blank" rel='noreferrer'><img src={githubPath} alt='github logo'/></a>
        <a className='footer__link-image' href='https://www.facebook.com/gomon' target="_blank" rel='noreferrer'><img src={facebookPath} alt='facebook logo'/></a>
      </div>
      <a className='footer__link' href='https://practicum.yandex.com/' target="_blank" rel='noreferrer'>Practicum by Yandex</a>
      <p className='footer__copyright'>{`© ${new Date().getFullYear()} Supersite, Powered by News API`}</p>
    </footer>
  );
}

export default Footer;
