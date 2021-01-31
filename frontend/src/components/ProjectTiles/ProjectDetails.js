import { Link } from "react-router-dom"
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faUsers, faProjectDiagram } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux"
import { getProjects, removeProject } from "../../store/project"
import AddMembersModal from "../AddMembersModal"

const ProjectDetails = ({project}) =>{
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    
    const onClick = (e) => {
        e.preventDefault()
        dispatch(removeProject(project.id))
        dispatch(getProjects(sessionUser.id))
    }
    return (
        <div className='project-tile__container'>
            <div className='project-tile__header'>
                
                <Link className='project-tile__title' to={`/workspace/${project.id}`} >
                    <FontAwesomeIcon className='project-icon' icon={faProjectDiagram} /> {project.name}</Link> 
                {sessionUser.id === project.ownerId && 
                <div className='project-tile__buttons'>
                {/* <button className='project-tile__add-users'>
                    <FontAwesomeIcon icon={faUsers} />
                </button>  */}
                < AddMembersModal project={project} />
                <button onClick={onClick} className='project-tile__delete'>
                    <FontAwesomeIcon icon={faBan} />
                </button></div>} 
                
            </div>
            <div className='project-tile__container-details'>
                <div className='project-tile__container-info'>
                    <div className='project-tile__container-dates'>
                        <p className='project-tile__text-dates'>Start date: <span className='date-span'>{moment(project.startDate).format("MMM Do YY")}</span></p>
                        <p className='project-tile__text-dates'>Project due: {moment(project.endDate).endOf('day').fromNow()}.</p>
                    </div>
                </div>
                <div className='project-tile__container-description'>
                    <p className='project-tile__text-description'>{project.description}</p>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetails