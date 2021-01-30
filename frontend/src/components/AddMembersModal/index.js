import React, { useState } from 'react';
import { Modal } from '../../context/Modal';

import AddMembersForm from './AddMembersForm';

const AddMembersModal = () => {
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
                    <AddMembersForm handleClose={handleClose} />
                </Modal>
            )}
        </>
    )
}

export default AddMembersModal