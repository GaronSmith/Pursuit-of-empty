import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <>
            <button className= 'navbar__button navbar__button-profile' onClick={openMenu}>
                {/* <i className="fas fa-user-circle" /> */}
                <FontAwesomeIcon className='navbar__button-profile' icon={faUserCircle}/>
            </button>
            {showMenu && (
                    <div className='dropdown__profile-items'>
                        <li>{user.username}</li>
                        <li>{user.email}</li>
                        <li>
                            <button className='navbar__button' onClick={logout}>Log Out</button>
                        </li>
                    </div>
            )}
        </>
    );
}

export default ProfileButton;