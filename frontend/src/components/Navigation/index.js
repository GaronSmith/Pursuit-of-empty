import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import SignUpFormModal from '../SignUpFormModal';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <li className='navbar__links'>
                <ul className='navbar__links-auth'>
                    <li className='navbar__links-link'>
                        <LoginFormModal />
                    </li>
                    <li className='navbar__links-link'>
                        <SignUpFormModal />
                    </li>
                </ul>
            </li>
                
            
        );
    }

    return (
        <nav className='navbar'>
            <ul className='navbar__links'>
                <li className='navbar__links-link'>
                    <NavLink id='navbar__links-home' style={{ textDecoration: 'none' }} exact to="/">Home</NavLink>
                    {isLoaded && sessionLinks}
                </li>
            </ul>
        </nav>
        
    );
}

export default Navigation;