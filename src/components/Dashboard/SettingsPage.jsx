import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  Stack,
  Alert,
} from '@mui/material';
import {
  DarkMode as DarkModeIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  CalendarToday as CalendarIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    darkMode: false,
    language: 'en',
    notifications: {
      email: true,
      push: true,
      taskReminders: true,
      weeklyReports: true,
    },
    calendar: {
      googleCalendar: false,
      syncEnabled: false,
    },
    privacy: {
      dataCollection: true,
      analytics: true,
    },
  });

  const handleSettingChange = (category, setting, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }));
  };

  const handleSaveSettings = () => {
    // Here you would typically make an API call to save the settings
    console.log('Saving settings:', settings);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Appearance */}
        <Grid item xs={12} md={6}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <DarkModeIcon />
                <Typography variant="h6">Appearance</Typography>
              </Stack>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.darkMode}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        darkMode: e.target.checked,
                      }))
                    }
                  />
                }
                label="Dark Mode"
              />
            </CardContent>
          </MotionCard>
        </Grid>

        {/* Language */}
        <Grid item xs={12} md={6}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <LanguageIcon />
                <Typography variant="h6">Language</Typography>
              </Stack>
              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select
                  value={settings.language}
                  label="Language"
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      language: e.target.value,
                    }))
                  }
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Spanish</MenuItem>
                  <MenuItem value="fr">French</MenuItem>
                  <MenuItem value="de">German</MenuItem>
                  <MenuItem value="ar">Arabic</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </MotionCard>
        </Grid>

        {/* Notifications */}
        <Grid item xs={12} md={6}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <NotificationsIcon />
                <Typography variant="h6">Notifications</Typography>
              </Stack>
              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications.email}
                      onChange={(e) =>
                        handleSettingChange('notifications', 'email', e.target.checked)
                      }
                    />
                  }
                  label="Email Notifications"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications.push}
                      onChange={(e) =>
                        handleSettingChange('notifications', 'push', e.target.checked)
                      }
                    />
                  }
                  label="Push Notifications"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications.taskReminders}
                      onChange={(e) =>
                        handleSettingChange(
                          'notifications',
                          'taskReminders',
                          e.target.checked
                        )
                      }
                    />
                  }
                  label="Task Reminders"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications.weeklyReports}
                      onChange={(e) =>
                        handleSettingChange(
                          'notifications',
                          'weeklyReports',
                          e.target.checked
                        )
                      }
                    />
                  }
                  label="Weekly Progress Reports"
                />
              </Stack>
            </CardContent>
          </MotionCard>
        </Grid>

        {/* Calendar Integration */}
        <Grid item xs={12} md={6}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <CalendarIcon />
                <Typography variant="h6">Calendar Integration</Typography>
              </Stack>
              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.calendar.googleCalendar}
                      onChange={(e) =>
                        handleSettingChange(
                          'calendar',
                          'googleCalendar',
                          e.target.checked
                        )
                      }
                    />
                  }
                  label="Google Calendar Integration"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.calendar.syncEnabled}
                      onChange={(e) =>
                        handleSettingChange('calendar', 'syncEnabled', e.target.checked)
                      }
                    />
                  }
                  label="Auto-sync Tasks"
                />
              </Stack>
            </CardContent>
          </MotionCard>
        </Grid>

        {/* Privacy Settings */}
        <Grid item xs={12}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <SecurityIcon />
                <Typography variant="h6">Privacy Settings</Typography>
              </Stack>
              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.privacy.dataCollection}
                      onChange={(e) =>
                        handleSettingChange(
                          'privacy',
                          'dataCollection',
                          e.target.checked
                        )
                      }
                    />
                  }
                  label="Data Collection"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.privacy.analytics}
                      onChange={(e) =>
                        handleSettingChange('privacy', 'analytics', e.target.checked)
                      }
                    />
                  }
                  label="Analytics"
                />
              </Stack>
            </CardContent>
          </MotionCard>
        </Grid>

        {/* Save Button */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveSettings}
              size="large"
            >
              Save Changes
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsPage; 