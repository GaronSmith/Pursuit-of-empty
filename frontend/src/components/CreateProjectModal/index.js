import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateProject from './CreateProjectForm';

import CreateProjectForm from './CreateProjectForm';

const CreateProjectModal = () =>{
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button 
            className='navbar-second__buttons-button' 
            onClick={() => {setShowModal(true)}}>
                Create Project
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateProjectForm />
                </Modal>
            )}
        </>
    )
}

export default CreateProjectModal