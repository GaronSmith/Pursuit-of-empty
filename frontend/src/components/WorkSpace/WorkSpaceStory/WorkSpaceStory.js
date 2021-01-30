import { faBars } from '@fortawesome/free-solid-svg-icons'
import {Draggable} from 'react-beautiful-dnd'

import './WorkSpaceStory.css'
import { useDispatch } from 'react-redux'
import { updateProgress } from '../../../store/stories'
import StoryModal from '../StoryModal/StoryModal'
const WorkSpaceStory = ({story,index}) => {
    const dispatch = useDispatch();

    const buttonText = (text) => {
        if(text === '' || text === null) return 'Start'
        if(text === 'Start') return 'Complete'
        if(text === 'Complete') return 'Completed'
        if(text === 'Completed') return 'Completed'
    }


    const onClick = (e) =>{
        e.preventDefault()
        let newProgress
        switch(story.progress){
            case null:
                newProgress = 'Start'
                break
            case '':
                newProgress = 'Start'
                break
            case 'Start':
                newProgress = 'Complete'
                break
            case 'Complete':
                newProgress = 'Completed'
                break
            default:
                break
            }

        const newState = {
            ...story,
            progress: newProgress
        }

        dispatch(updateProgress(newState))
    }

    return (
        <Draggable draggableId={story.id.toString()} key={story.id} index={index}>
            {(provided) => (
                <div className='story-container' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <div className='story-container__left'>
                        <StoryModal story={story} icon={faBars}/>
                        <h3 className='story-name'>{story.name}</h3>
                    </div>
                    <div className='story-container__right'>
                        <button className='story-container__right-button' value={story.progress} onClick={onClick}> {buttonText(story.progress)} </button>
                    </div>

                </div>
            )}
           
        </Draggable>
    )
}

export default WorkSpaceStory