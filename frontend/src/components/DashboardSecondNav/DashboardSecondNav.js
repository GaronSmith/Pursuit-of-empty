import './DashboardSecondNav.css'

const DashboardSecondNav = () => {

    return(
        <div className='navbar-second'>
            <div className='navbar-second__title-container'>
                <h4 className='navbar-second__title-text'>Projects</h4>
            </div>
            <div className='navbar-second__buttons-container'>
                <button 
                className='navbar-second__buttons-button'>
                    Create Project
                </button>
            </div>
        </div>
    )
}

export default DashboardSecondNav