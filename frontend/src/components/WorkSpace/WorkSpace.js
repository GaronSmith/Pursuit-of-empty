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
import { getStories } from '../../store/stories'




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
        const newState = { stories: {}, columns: {}, columnOrder: [] }
        
        if(preferences.names) {
            Object.keys(preferences.names).forEach(el => {
                newState.columns[el] = {
                    id: el,
                    name: preferences.names[el],
                    storyIds: [],
                }
            })
        }
        if(stories){
            Object.keys(stories).forEach(el => {
                newState.stories[stories[el].id] = stories[el]
                newState.columns[stories[el].workflowStatusId].storyIds.splice(stories[el].priority - 1, 0, [stories[el].id])
            })
        }

        if(preferences.order){
            Object.keys(preferences.order).forEach(el => {
                newState.columnOrder[el-1] = preferences.order[el]
            })
        }
        
        setDragState(newState)
        console.log(dragState)

    }, [preferences,stories])

    const onDragEnd = (result) => {
        const {destination, source, draggableId} = result;

        if(!destination) return

        if(
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return 

        const start = dragState.columns[source.droppableId]
        const finish = dragState.columns[destination.droppableId]
        
        if(start === finish){
            const newStoryIds = Array.from(start.storyIds)
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
            setDragState(newState)
            return
        }
        const startStoryIds = Array.from(start.storyIds)
        startStoryIds.splice(source.index, 1)

        const finishStoryIds = Array.from(finish.storyIds)
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