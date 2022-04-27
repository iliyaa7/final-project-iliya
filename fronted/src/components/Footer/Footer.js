import React from 'react';
import githubPath from '../../images/github.svg'
import facebookPath from '../../images/facebook.svg'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const updatePredicate = () => {
      setIsDesktop(window.matchMedia('(min-width: 562px)').matches)
    }
    updatePredicate();
    window.addEventListener('resize', updatePredicate);

    return () => window.removeEventListener('resize', updatePredicate);
  },[])

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    console.log('a')
  };

  if (isDesktop) {
    return (
      <footer className='footer'>
        <nav className='footer__nav'>
          <p className='footer__copyright'>{`© ${new Date().getFullYear()} Supersite, Powered by News API`}</p>
          <Link className="link-container"  to="/"><button onClick={scrollToTop} type='button' className='footer__link'>Home</button></Link>
          <a className='footer__link footer__link_type_yandex' href='https://practicum.yandex.com/' target="_blank" rel='noreferrer'>Practicum by Yandex</a>
          <a className='footer__link-image' href='https://github.com/iliyaa7' target="_blank" rel='noreferrer'><img src={githubPath} alt='github logo'/></a>
          <a className='footer__link-image' href='https://www.facebook.com/gomon' target="_blank" rel='noreferrer'><img src={facebookPath} alt='facebook logo'/></a>
        </nav>
      </footer>
    )
  }

  return (
    <footer className='footer'>
      <nav className='footer__nav'>
        <div className='footer__mobile-container'>
          <Link className="link-container" to="/"><button onClick={scrollToTop} type='button' className='footer__link'>Home</button></Link>
          <a className='footer__link-image' href='https://github.com/iliyaa7' target="_blank" rel='noreferrer'><img src={githubPath} alt='github logo'/></a>
          <a className='footer__link-image' href='https://www.facebook.com/gomon' target="_blank" rel='noreferrer'><img src={facebookPath} alt='facebook logo'/></a>
        </div>
        <a className='footer__link footer__link_type_yandex' href='https://practicum.yandex.com/' target="_blank" rel='noreferrer'>Practicum by Yandex</a>
        <p className='footer__copyright'>{`© ${new Date().getFullYear()} Supersite, Powered by News API`}</p>
      </nav>
    </footer>
  );
}

export default Footer;
