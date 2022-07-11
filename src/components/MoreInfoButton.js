// Fav Icon
import moreInfoButton from '../images/more-info-button.svg';
import moreInfoButtonHover from '../images/more-info-button-hover.svg';

function MoreInfoButton() {
    return(
        <div className='more-info-icon-container'>
        <img src={moreInfoButton} className='more-info-display' alt='More Info Button' />
        <img src={moreInfoButtonHover} className='more-info-overlay' alt='More Info Button' />
        </div>
    )
}

export default MoreInfoButton;