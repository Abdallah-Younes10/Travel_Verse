import React, { useState } from 'react';
import person from '../../Assets/images/aaaaaaaaaaaa.png';
import { Link, useNavigate } from "react-router-dom";
import {
  MenuItem,
  Tooltip,
  Avatar,
  Box,
  IconButton,
  Menu,
} from '@mui/material';

const UserAvatar = () => {
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const openMenu = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const closeMenu = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    closeMenu();
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="User Settings">
        <IconButton sx={{ p: 0 }} onClick={openMenu}>
          <Avatar alt="User Avatar" src={person} />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={closeMenu}
      >
        {isLoggedIn && (
          <MenuItem component={Link} to="/user/profile" onClick={closeMenu}>
            Profile
          </MenuItem>
        )}

        {isLoggedIn && (
          <MenuItem component={Link} to="/user/reservations" onClick={closeMenu}>
            Favorites
          </MenuItem>
        )}

        {!isLoggedIn ? (
          <MenuItem component={Link} to="/login" onClick={closeMenu}>
            Login
          </MenuItem>
        ) : (
          <MenuItem onClick={handleLogout}>
            Logout
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default UserAvatar;
