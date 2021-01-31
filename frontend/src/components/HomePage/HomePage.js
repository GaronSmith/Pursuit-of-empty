import './HomePage.css'

const HomePage = () => {
    return(
        <div className='homepage__container'>
            <div className='homepage__banner'></div>
            <div className='homepage__content'>
                <div className='homepage__header'>
                    <h1 className='homepage__header-title'>Welcome to Pursuit of Empty</h1>
                    <h3 className='homepage__header-tagline'>"Everyone wants an empty task bucket"</h3>
                </div>
                <div className='homepage__content-about-container'>
                    <p className='homepage__content-about'>
                        Pursuit of Empty is a clone of the proven project management tool
                        Pivotal Tracker. <br/> When there is transparency within the workflow
                        your team will be able to deliver more quickly.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HomePage