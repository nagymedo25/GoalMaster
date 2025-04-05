import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Badge,
  Tooltip,
  Stack,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  EmojiEvents as AchievementsIcon,
  CalendarToday as CalendarIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  Flag as GoalsIcon,
  Analytics as AnalyticsIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Translate as TranslateIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/Logo.png';

const drawerWidth = 240;
const menuId = 'primary-search-account-menu';
const notificationsMenuId = 'primary-search-notifications-menu';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Goals', icon: <GoalsIcon />, path: '/dashboard/goals' },
  { text: 'Analytics', icon: <AnalyticsIcon />, path: '/dashboard/analytics' },
  { text: 'Challenges', icon: <AchievementsIcon />, path: '/dashboard/challenges' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/dashboard/settings' },
];

const DashboardLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  const [languageAnchor, setLanguageAnchor] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleLanguageOpen = (event) => {
    setLanguageAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationsAnchor(null);
    setLanguageAnchor(null);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          GoalMaster
        </Typography>
      </Toolbar>
      <Divider />
      <Box sx={{ overflow: 'auto', mt: 2 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              onClick={() => {
                if (isMobile) {
                  handleDrawerToggle();
                }
              }}
              sx={{
                borderRadius: 2,
                mb: 2,
                py: 2,
                px: 3,
                background: location.pathname === item.path ? 'rgba(0, 212, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                cursor: 'pointer',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? '#00D4FF' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  color: '#ffffff',
                  '& .MuiListItemText-primary': {
                    fontSize: '1.1rem',
                    fontWeight: location.pathname === item.path ? 600 : 500,
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider />
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            GoalMaster Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: '64px',
        }}
      >
        {children}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        id={menuId}
        PaperProps={{
          sx: {
            bgcolor: 'background.paper',
            color: 'text.primary',
            mt: 1.5,
            '& .MuiMenuItem-root': {
              '&:hover': {
                bgcolor: 'action.hover',
              },
            },
          },
        }}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </Menu>

      <Menu
        anchorEl={notificationsAnchor}
        open={Boolean(notificationsAnchor)}
        onClose={handleMenuClose}
        id={notificationsMenuId}
        PaperProps={{
          sx: {
            bgcolor: 'background.paper',
            color: 'text.primary',
            mt: 1.5,
            '& .MuiMenuItem-root': {
              '&:hover': {
                bgcolor: 'action.hover',
              },
            },
          },
        }}
      >
        <MenuItem onClick={handleMenuClose}>New achievement unlocked!</MenuItem>
        <MenuItem onClick={handleMenuClose}>Task deadline approaching</MenuItem>
        <MenuItem onClick={handleMenuClose}>Weekly progress report ready</MenuItem>
      </Menu>

      <Menu
        anchorEl={languageAnchor}
        open={Boolean(languageAnchor)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            bgcolor: 'background.paper',
            color: 'text.primary',
            mt: 1.5,
            '& .MuiMenuItem-root': {
              '&:hover': {
                bgcolor: 'action.hover',
              },
            },
          },
        }}
      >
        <MenuItem onClick={handleMenuClose}>English</MenuItem>
        <MenuItem onClick={handleMenuClose}>العربية</MenuItem>
      </Menu>
    </Box>
  );
};

export default DashboardLayout; 