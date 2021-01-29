import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import { Modal } from '../../../context/Modal';
import StoryForm from './StoryForm'
import { useDispatch } from 'react-redux';
import { removeTasks } from '../../../store/tasks';



const StoryModal = ({story}) => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const handleClose = async () => {
        dispatch(removeTasks())
        setShowModal(false)
    };

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
