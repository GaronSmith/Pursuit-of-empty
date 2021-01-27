import React, { useState } from 'react';
import { Modal } from '../../context/Modal';

import CreateProjectForm from './CreateProjectForm';

const CreateProjectModal = () =>{
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);

    return (
        <>
            <button 
            className='navbar-second__buttons-button' 
            onClick={() => {setShowModal(true)}}>
                Create Project
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateProjectForm handleClose={handleClose}/>
                </Modal>
            )}
        </>
    )
}

export default CreateProjectModal