// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const buttonRef = useRef(null); // Ref for the button
  const dropdownRef = useRef(null); // Ref for the dropdown

  const openMenu = () => {
    if (!showMenu) setShowMenu(true);
  };

  useEffect(() => {
    const closeMenu = (e) => {
      // Check if the click is inside the dropdown, if not then close the menu
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    // If the menu is shown, then add the event listener
    if (showMenu) {
      document.addEventListener('mousedown', closeMenu);
    }

    // Cleanup the event listener when the component is unmounted or when the menu is closed
    return () => document.removeEventListener('mousedown', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button onClick={openMenu} ref={buttonRef}>
        <i className="fas fa-user-circle" /> {user.username}
      </button>
      {showMenu && (
        <ul className="profile-dropdown" ref={dropdownRef}>
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
