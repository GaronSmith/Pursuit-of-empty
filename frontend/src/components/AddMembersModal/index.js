import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'

import AddMembersForm from './AddMembersForm';

const AddMembersModal = ({project}) => {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);

    return (
        <>
            <button
                className='project-tile__add-users'
                onClick={() => { setShowModal(true) }}>
                <FontAwesomeIcon icon={faUsers} />
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddMembersForm project={project} handleClose={handleClose} />
                </Modal>
            )}
        </>
    )
}

export default AddMembersModal