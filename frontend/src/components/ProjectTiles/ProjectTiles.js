import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import ProjectDetails from './ProjectDetails'
import {getProjects} from '../../store/project'
import './ProjectTiles.css'

const ProjectsTiles = () => {
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projects)
 
    useEffect(() => {
        const getProj = async () =>{
            await dispatch(getProjects())
       } 
       getProj()
    }, [dispatch])
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

            </div>
        </div>
        
    )
}

export default ProjectsTiles