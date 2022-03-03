export default function showCardError(cardRef) {
  cardRef.current.querySelector('.card__error-elemnt').classList.add('card__error-elemnt_active');
    cardRef.current.querySelector('.card__hover-elemnt').classList.add('card__hover-elemnt_hidden');
    cardRef.current.querySelector('.card__hover-elemnt').classList.remove('card__hover-elemnt');
    setTimeout(() => {
      cardRef.current.querySelector('.card__error-elemnt').classList.remove('card__error-elemnt_active');
    cardRef.current.querySelector('.card__hover-elemnt_hidden').classList.add('card__hover-elemnt');
    cardRef.current.querySelector('.card__hover-elemnt').classList.remove('card__hover-elemnt_hidden');
    }, 3000);
}