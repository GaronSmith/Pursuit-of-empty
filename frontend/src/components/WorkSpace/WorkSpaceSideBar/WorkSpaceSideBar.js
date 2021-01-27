import './WorkSpaceSideBar.css'

const WorkSpaceSideBar = () => {

    return (
        <div className='sidebar-container'>
            <ul className='sidebar-container__links'>
                <div className='sidebar-container__link'>
                    <li className='sidebar-container__link-text'>My Bucket</li>
                </div>
                <div className='sidebar-container__link'>
                    <li className='sidebar-container__link-text'>Current Bucket</li>
                </div>
                <div className='sidebar-container__link'>
                    <li className='sidebar-container__link-text'>Side Bucket</li>
                </div>
                <div className='sidebar-container__link'>
                    <li className='sidebar-container__link-text'>Completed Bucket</li>
                </div>
            </ul>
        </div>
    )
}

export default WorkSpaceSideBar