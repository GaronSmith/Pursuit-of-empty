import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import { Modal } from '../../../context/Modal';
import StoryForm from './StoryForm'
import { useDispatch } from 'react-redux';
import { removeTasks } from '../../../store/tasks';



const StoryModal = ({ story, icon, workflowStatusId, project, priority}) => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const handleClose = async () => {
        dispatch(removeTasks())
        setShowModal(false)
    };

    const onClose = async () => {
        dispatch(removeTasks())
        setShowModal(false)
    }

    return (
        <>
            <button
                className='story-button__more'
                onClick={() => { setShowModal(true) }}>
                <FontAwesomeIcon className='story-icon' icon={icon} />
            </button>
            {showModal && (
                <Modal onClose={onClose}>
                    <StoryForm 
                    className= 'modal' 
                    story={story} 
                    handleClose={handleClose} 
                    story={story}
                    workflowStatusId={workflowStatusId}
                    project={project}
                    priority={priority}/>
                </Modal>
            )}
        </>
    )
}

export default StoryModal
