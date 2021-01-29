import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import { Modal } from '../../../context/Modal';
import StoryForm from './StoryForm'



const StoryModal = ({story}) => {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);

    return (
        <>
            <button
                className='story-button__more'
                onClick={() => { setShowModal(true) }}>
                <FontAwesomeIcon className='story-icon' icon={faBars} />
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <StoryForm story={story} handleClose={handleClose} />
                </Modal>
            )}
        </>
    )
}

export default StoryModal
