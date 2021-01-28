import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import './WorkSpaceStory.css'
const WorkSpaceStory = ({story}) => {
    return (
        <div className='story-container'>
            <div className='story-container__left'>
                <button className='story-button__more'>
                    <FontAwesomeIcon className='story-icon' icon={faBars} />
                </button>
                <h3 className='story-name'>{story.name}</h3>
            </div>
            <div className='story-container__right'>
                <button className='story-container__right-button'> start </button>
            </div>
            
        </div>
    )
}

export default WorkSpaceStory