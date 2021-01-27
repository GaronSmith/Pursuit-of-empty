import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faClipboard, faBusinessTime, faCheckSquare} from '@fortawesome/free-solid-svg-icons'

import './WorkSpaceSideBar.css'

const WorkSpaceSideBar = () => {

    return (
        <div className='sidebar-container'>
            <ul className='sidebar-container__links'>
                <div className='sidebar-container__link'>
                    <li className='sidebar-container__link-text'><FontAwesomeIcon icon={faBriefcase} />  My Bucket</li>
                </div>
                <div className='sidebar-container__link'>
                    <li className='sidebar-container__link-text'><FontAwesomeIcon icon={faClipboard} />  Current Bucket</li>
                </div>
                <div className='sidebar-container__link'>
                    <li className='sidebar-container__link-text'><FontAwesomeIcon icon={faBusinessTime} />  Side Bucket</li>
                </div>
                <div className='sidebar-container__link'>
                    <li className='sidebar-container__link-text'><FontAwesomeIcon icon={faCheckSquare} />  Completed Bucket</li>
                </div>
            </ul>
        </div>
    )
}

export default WorkSpaceSideBar