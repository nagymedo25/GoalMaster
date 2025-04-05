import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Task as TaskIcon,
  CalendarMonth as CalendarIcon,
  EmojiEvents as TrophyIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: '#1e1e1e',
    borderRight: '1px solid rgba(255, 255, 255, 0.12)',
  },
}));

const Logo = styled('img')({
  height: 40,
  margin: '16px',
});

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Tasks', icon: <TaskIcon />, path: '/tasks' },
  { text: 'Calendar', icon: <CalendarIcon />, path: '/calendar' },
  { text: 'Achievements', icon: <TrophyIcon />, path: '/achievements' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <StyledDrawer variant="permanent">
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ p: 2 }}>
          <Logo src="/src/assets/logo.png" alt="GoalMaster Logo" />
        </Box>
        <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />
        <List sx={{ flexGrow: 1, mt: 2 }}>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(255, 152, 0, 0.16)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 152, 0, 0.24)',
                  },
                  '& .MuiListItemIcon-root': {
                    color: '#ff9800',
                  },
                  '& .MuiListItemText-primary': {
                    color: '#ff9800',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </StyledDrawer>
  );
};

export default Sidebar; 