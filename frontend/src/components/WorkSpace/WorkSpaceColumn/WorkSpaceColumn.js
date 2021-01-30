import { faPlus} from '@fortawesome/free-solid-svg-icons'
import {Droppable} from 'react-beautiful-dnd'
import { useParams } from 'react-router-dom'

import './WorkSpaceColumn.css'
import WorkSpaceStory from '../WorkSpaceStory/WorkSpaceStory'
import StoryModal from '../StoryModal/StoryModal'

const WorkSpaceColumn = ({column, stories}) => {

    const empytyStory = {id:'new', name:'new'}
    const {id} = useParams();
    const newIndex = stories.length
    console.log('Priority', newIndex)
    return (
        <div className='column-container'>
            <div className='column-header'>
                <h3 className='column-header__bucket-title'>{column.name}</h3>
                <div className='column-header__buttons'>
                    <StoryModal 
                    story={empytyStory} 
                    icon={faPlus}
                    workflowStatusId={column.id}
                    project={id}
                    priority={newIndex} />
                </div>
            </div>
            <div className='column-details'>
                <Droppable droppableId={column.id}>
                    
                        {(provided) => (
                            <div className='stories' ref={provided.innerRef} {...provided.droppableProps}>
                            
                                {stories.map((story, index) => {
                                    return (
                                        <div key={story.id} className='story'>
                                            <WorkSpaceStory key={story.id} index={index} story={story} />
                                        </div>
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