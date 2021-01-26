import { Link } from "react-router-dom"
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faProjectDiagram } from '@fortawesome/free-solid-svg-icons'

const ProjectDetails = ({project}) =>{

    return (
        <div className='project-tile__container'>
            <div className='project-tile__header'>
                
                <Link className='project-tile__title' to='/'>
                    <FontAwesomeIcon className='project-icon' icon={faProjectDiagram} /> {project.name}</Link>  {/*set link properly */}
                <button className='project-tile__delete'>
                    <FontAwesomeIcon icon={faBan}/>
                </button>
            </div>
            <div className='project-tile__container-details'>
                <div className='project-tile__container-info'>
                    <div className='project-tile__container-dates'>
                        <p className='project-tile__text-dates'>Start date: <span className='date-span'>{moment(project.startDate.get).format("MMM Do YY")}</span></p>
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