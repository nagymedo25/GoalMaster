import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Tooltip,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#1e1e1e',
  borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
  zIndex: theme.zIndex.drawer + 1,
}));

const Logo = styled('img')({
  height: 40,
  marginRight: 16,
});

const TopBar = () => {
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  const [settingsAnchor, setSettingsAnchor] = useState(null);
  const [notifications] = useState([
    { id: 1, text: 'Task "Complete project documentation" is overdue' },
    { id: 2, text: 'You have 3 tasks due today' },
  ]);

  const handleNotificationsClick = (event) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleSettingsClick = (event) => {
    setSettingsAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setNotificationsAnchor(null);
    setSettingsAnchor(null);
  };

  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <Logo src="/src/assets/Logo.png" alt="GoalMaster Logo" />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          GoalMaster
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Tooltip title="Notifications">
            <IconButton color="inherit" onClick={handleNotificationsClick}>
              <Badge badgeContent={notifications.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Settings">
            <IconButton color="inherit" onClick={handleSettingsClick}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>

          <Avatar
            alt="User Name"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 40, height: 40, cursor: 'pointer' }}
          />
        </Box>
      </Toolbar>

      <Menu
        anchorEl={notificationsAnchor}
        open={Boolean(notificationsAnchor)}
        onClose={handleClose}
      >
        {notifications.map((notification) => (
          <MenuItem key={notification.id} onClick={handleClose}>
            {notification.text}
          </MenuItem>
        ))}
      </Menu>

      <Menu
        anchorEl={settingsAnchor}
        open={Boolean(settingsAnchor)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile Settings</MenuItem>
        <MenuItem onClick={handleClose}>Notification Settings</MenuItem>
        <MenuItem onClick={handleClose}>Privacy Settings</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </StyledAppBar>
  );
};

export default TopBar; 