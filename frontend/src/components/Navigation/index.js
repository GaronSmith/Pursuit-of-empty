import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import SignUpFormModal from '../SignUpFormModal';
import CreateProjectModal from '../CreateProjectModal';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    let homeLinks;
    if (sessionUser) {
        homeLinks = (
            <li className='navbar__links-link'>
                <NavLink id='navbar__links-home' style={{ textDecoration: 'none' }} exact to="/dashboard">
                    <FontAwesomeIcon id='icon__home' icon={faHome} />
                </NavLink>
            </li>
        )
        sessionLinks = (
            <>
                <CreateProjectModal id='create-project'/>
                <ProfileButton user={sessionUser} />
            </>
        );
    } else {
        homeLinks = (
            <li className='navbar__links-link'>
                <NavLink id='navbar__links-home' style={{ textDecoration: 'none' }} exact to="/">
                    <FontAwesomeIcon id='icon__home' icon={faHome} />
                </NavLink>
            </li>
        )
        sessionLinks = (
            <div className='navbar__links-auth'>
                <ul className='navbar__links-auth-items'>
                    <li className='navbar__links-link'><LoginFormModal /></li>
                    <li className='navbar__links-link'><SignUpFormModal /></li>
                </ul>
            </div>
                
            
        );
    }
    return (
        <nav className='navbar'>
            <ul className='navbar__links'>
                <div className='navbar-second__buttons-container'>
 
                
            </div>
                {homeLinks}
                <div className='navbar__links-user'>
                    {isLoaded && sessionLinks}
                </div>
            </ul>
        </nav>
        
    );
}

export default Navigation;