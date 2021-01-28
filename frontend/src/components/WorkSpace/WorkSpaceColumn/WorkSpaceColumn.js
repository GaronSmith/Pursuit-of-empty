import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons'
import {Droppable} from 'react-beautiful-dnd'

import './WorkSpaceColumn.css'
import WorkSpaceStory from '../WorkSpaceStory/WorkSpaceStory'

let i = 0
const WorkSpaceColumn = ({column, stories}) => {
    return (
        <div className='column-container'>
            <div className='column-header'>
                <h3 className='column-header__bucket-title'>{column.name}</h3>
                <div className='column-header__buttons'>
                    <button className='column-header__buttons-button'>
                        <FontAwesomeIcon className='project-icon' icon={faPlus} />  Add Story
                    </button>
                </div>
            </div>
            <div className='column-details'>
                <Droppable droppableId={column.id}>
                    
                        {(provided) => (
                            <div className='stories' ref={provided.innerRef} {...provided.droppableProps}>
                            
                                {stories.map((story, index) => {
                                    return (
                                        // <div key={story.id} className='story'>
                                        <WorkSpaceStory key={story.id} index={index} story={story} />
                                        // </div>
                                    )
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    
                    
                </Droppable>
                
            </div>
        </div>
    )
}

export default WorkSpaceColumn