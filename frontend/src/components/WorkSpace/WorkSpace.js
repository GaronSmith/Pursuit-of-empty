import WorkSpaceSideBar from './WorkSpaceSideBar'
import './WorkSpace.css'

const WorkSpace = () => {

    return(
        <div className='workspace-container'>
            <div className='sidebar'>
                <WorkSpaceSideBar />
            </div>
        </div>
    )
}

export default WorkSpace