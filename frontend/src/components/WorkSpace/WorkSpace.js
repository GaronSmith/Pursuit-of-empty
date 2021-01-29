import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {DragDropContext} from 'react-beautiful-dnd'

import WorkSpaceSideBar from './WorkSpaceSideBar'
import { getPreferences }from '../../store/preferences'
import './WorkSpace.css'
import { getProjects } from '../../store/project'
import { getAssignedProjects } from '../../store/assignedProjects'
import WorkSpaceColumn from './WorkSpaceColumn'
import { getStories, storyDnD } from '../../store/stories'
import { dndDataObject } from '../../utils/workspaceUtils'




const WorkSpace = () => {
    const {id} = useParams()
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user)
    const preferences = useSelector(state => state.preferences)
    const stories = useSelector(state => state.stories)
    // const projects = useSelector(state => state.projects)
    // const assignedProj = useSelector(state => state.assignedProjects)

    const [dragState, setDragState] = useState({stories:{}, columns:{}, columnOrder:[]})

    useEffect(() => {
        const getPrefs = async () => {
            await dispatch(getProjects(sessionUser.id))
            await dispatch(getAssignedProjects(sessionUser.id))
            await dispatch(getPreferences(sessionUser.id))
            await dispatch(getStories(id))
        }
        getPrefs()
    }, [dispatch, sessionUser,id])

    useEffect(() => {
     
        const newState = dndDataObject(preferences.names, stories, preferences.order)
        setDragState(newState)
    }, [preferences,stories])

    const onDragEnd = (result) => {
        const {destination, source, draggableId} = result;
       console.log(dragState)

        if(!destination) return

        if(
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return 

        const start = dragState.columns[source.droppableId]
        const finish = dragState.columns[destination.droppableId]
        
        if(start === finish){
            const newStoryIds = Array.from(start.storyIds)
            const plusOne = newStoryIds.slice(destination.index, source.index)
            newStoryIds.splice(source.index, 1)
            newStoryIds.splice(destination.index, 0, draggableId)

            const newColumn = {
                ...start,
                storyIds: newStoryIds
            }

            const newState = {
                ...dragState,
                columns: {
                    ...dragState.columns,
                    [newColumn.id]: newColumn
                }
            }
            console.log('after same', newState)
            setDragState(newState)
            dispatch(storyDnD(draggableId, destination.index+1, destination.droppableId, plusOne, [] ))
            
            return
        }
        const startStoryIds = Array.from(start.storyIds)
        const minusOne = startStoryIds.slice(source.index+1)
        startStoryIds.splice(source.index, 1)

        const finishStoryIds = Array.from(finish.storyIds)
        const plusOne = finishStoryIds.slice(destination.index)
        finishStoryIds.splice(destination.index, 0, draggableId)

        const newStart = {
            ...start,
            storyIds: startStoryIds
        }
        const newFinish = {
            ...finish,
            storyIds: finishStoryIds
        }

        const newState = {
            ...dragState,
            columns: {
                ...dragState.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        }
        
        setDragState(newState)
        dispatch(storyDnD(draggableId, destination.index + 1, destination.droppableId, plusOne, minusOne))
        console.log('after diff', dragState)
    }

    return(
        <div className='workspace-container'>
            <div className='sidebar'>
                <WorkSpaceSideBar />
            </div>
            <div className='workspace'>
                <DragDropContext
                onDragEnd={onDragEnd}>
                    {dragState.columnOrder.map(columnId => {
                        const column = dragState.columns[columnId]
                        const stories = column.storyIds.map(storyId => dragState.stories[storyId])
                        return < WorkSpaceColumn key={column.id} column={column} stories={stories} />
                    })}
                </DragDropContext>
                
            </div>
        </div>
    )
}

export default WorkSpace