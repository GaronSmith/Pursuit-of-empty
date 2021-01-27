import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons'


const WorkSpaceColumn = ({column, stories}) => {
    return (
        <div className='column-container'>
            <div className='column-header'>
                <h3 className='column-header__bucket-title'>{column.name}</h3>
                <div className='column-header__buttons'>
                    <button className='column-header__buttons-button'>
                        <FontAwesomeIcon className='project-icon' icon={faPlus} />  Add Story
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WorkSpaceColumn