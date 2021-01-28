import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import {Draggable} from 'react-beautiful-dnd'

import './WorkSpaceStory.css'
const WorkSpaceStory = ({story,index}) => {
    return (
        <Draggable draggableId={story.id.toString()} index={index}>
            {(provided) => (
                <div className='story-container' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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

            )}
           
        </Draggable>
    )
}

export default WorkSpaceStory