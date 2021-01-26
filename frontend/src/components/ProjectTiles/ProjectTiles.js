import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ProjectDetails from './ProjectDetails'
import {getProjects} from '../../store/project'


const ProjectsTiles = () => {
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projects)
 
    useEffect(async () => {
        await dispatch(getProjects())
    }, [dispatch])
    let i = 0
    
    return (
        <div className='tiles-container__my-projects'>
            <h3 className='tiles-container__title'>My Projects</h3>
            {Object.values(projects).map(proj => {
                return (
                    <div key={i--}className='tiles-container__tile'>
                        <ProjectDetails key={proj.id} project={proj} />
                    </div>
                )
                 
            })}
        </div>
    )
}

export default ProjectsTiles