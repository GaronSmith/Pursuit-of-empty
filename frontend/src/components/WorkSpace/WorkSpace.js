import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import WorkSpaceSideBar from './WorkSpaceSideBar'
import { getPreferences }from '../../store/preferences'
import './WorkSpace.css'
import { getProjects } from '../../store/project'
import { getAssignedProjects } from '../../store/assignedProjects'



const WorkSpace = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const projects = useSelector(state => state.projects)
    const assignedProj = useSelector(state => state.assignedProjects)

    useEffect(() => {
        const getPrefs = async () => {
            await dispatch(getProjects(sessionUser.id))
            await dispatch(getAssignedProjects(sessionUser.id))
            await dispatch(getPreferences(sessionUser.id))
        }
        getPrefs()
    }, [dispatch, sessionUser])

    return(
        <div className='workspace-container'>
            <div className='sidebar'>
                <WorkSpaceSideBar />
            </div>
        </div>
    )
}

export default WorkSpace