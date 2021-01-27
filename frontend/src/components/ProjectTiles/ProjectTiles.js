import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import ProjectDetails from './ProjectDetails'
import {getProjects} from '../../store/project'
import {getAssignedProjects} from '../../store/assignedProjects'
import './ProjectTiles.css'

const ProjectsTiles = () => {
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projects)
    const assignedProj = useSelector(state => state.assignedProjects)
    const sessionUser = useSelector(state => state.session.user)
 
    useEffect(() => {
        const getProj = async () =>{
            await dispatch(getProjects(sessionUser.id))
            await dispatch(getAssignedProjects(sessionUser.id))
       } 
       getProj()
    }, [sessionUser])
    let i = 0
    
    return (
        <div className='projects'>
            <div className='tiles-container__my-projects'>
                <h3 className='tiles-container__title'>My Projects</h3>
                {Object.values(projects).map(proj => {
                    return (
                        <div key={i--} className='tiles-container__tile'>
                            <ProjectDetails key={proj.id} project={proj} />
                        </div>
                    )

                })}
            </div>
            <div className='tiles-container__assigned-projects'>
                <h3 className='tiles-container__title'>Team Projects</h3>
                {Object.values(assignedProj).map(proj => {
                    return (
                        <div key={i--} className='tiles-container__tile'>
                            <ProjectDetails key={proj.id} project={proj.Project} />
                        </div>
                    )
                })}
            </div>
        </div>
        
    )
}

export default ProjectsTiles