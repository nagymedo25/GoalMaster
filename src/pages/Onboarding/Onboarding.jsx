import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
  Stepper,
  Step,
  StepLabel,
  styled,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Google as GoogleIcon,
  Notifications as NotificationsIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../../assets/Logo.png';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1e1e1e',
  color: '#ffffff',
  padding: theme.spacing(4),
  borderRadius: 16,
  border: '1px solid rgba(255, 255, 255, 0.12)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
}));

const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ff9800',
  color: '#ffffff',
  padding: '12px 32px',
  borderRadius: 8,
  fontSize: '1.1rem',
  '&:hover': {
    backgroundColor: '#f57c00',
  },
}));

const steps = [
  'Welcome to GoalMaster',
  'Set Your Primary Goal',
  'Choose Goal Categories',
  'Reminder Settings',
];

const categories = [
  { id: 'work', label: 'Work', icon: '💼' },
  { id: 'health', label: 'Health', icon: '❤️' },
  { id: 'education', label: 'Education', icon: '📚' },
  { id: 'personal', label: 'Personal Development', icon: '🎯' },
  { id: 'finance', label: 'Finance', icon: '💰' },
  { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
  { id: 'social', label: 'Social', icon: '🤝' },
  { id: 'other', label: 'Other', icon: '✨' },
];

const Onboarding = ({ onComplete }) => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    primaryGoal: '',
    categories: [],
    reminders: {
      daily: false,
      weekly: false,
      monthly: false,
      email: false,
      push: false,
      calendar: false,
    },
  });
  const [error, setError] = useState('');

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      try {
        // Here you would typically save the onboarding data
        await new Promise(resolve => setTimeout(resolve, 1000));
        localStorage.setItem('userPreferences', JSON.stringify(formData));
        
        // Call onComplete to update authentication state
        onComplete();
        
        // Navigate to dashboard after successful onboarding
        navigate('/dashboard');
      } catch (err) {
        setError('حدث خطأ أثناء حفظ البيانات. يرجى المحاولة مرة أخرى.');
      }
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleCategoryChange = (categoryId) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter((c) => c !== categoryId)
        : [...prev.categories, categoryId],
    }));
  };

  const handleReminderChange = (reminder) => {
    setFormData((prev) => ({
      ...prev,
      reminders: {
        ...prev.reminders,
        [reminder]: !prev.reminders[reminder],
      },
    }));
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h4" gutterBottom align="center" sx={{ mb: 2 }}>
              🚀 Welcome to GoalMaster
            </Typography>
            <Typography variant="h5" align="center" sx={{ mb: 4, color: '#ff9800' }}>
              Where your journey to achieving goals begins!
            </Typography>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <img
                src={Logo}
                alt="GoalMaster Logo"
                style={{ width: 340, height: 260, marginBottom: 24 }}
              />
            </Box>
            <Typography variant="body1" align="center" sx={{ mb: 4, fontSize: '1.1rem' }}>
              Let's start your journey towards achieving your goals in an organized and effective way
            </Typography>
            <Typography variant="body2" align="center" color="text.secondary">
              We'll set up your personal account step by step
            </Typography>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h5" gutterBottom align="center">
              What is your primary goal?
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 4, color: 'text.secondary' }}>
              Choose a clear and specific goal to start your journey
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              placeholder="Example: Improve daily productivity, learn a new language, enhance physical fitness..."
              value={formData.primaryGoal}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, primaryGoal: e.target.value }))
              }
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#ffffff',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: '#ff9800',
                  },
                },
              }}
            />
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h5" gutterBottom align="center">
              Choose Your Goal Categories
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 4, color: 'text.secondary' }}>
              Select the areas you want to focus on
            </Typography>
            <FormGroup sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
              {categories.map((category) => (
                <Paper
                  key={category.id}
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    backgroundColor: formData.categories.includes(category.id)
                      ? 'rgba(255, 152, 0, 0.16)'
                      : 'rgba(255, 255, 255, 0.05)',
                    border: formData.categories.includes(category.id)
                      ? '1px solid #ff9800'
                      : '1px solid rgba(255, 255, 255, 0.12)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 152, 0, 0.08)',
                    },
                  }}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h6">{category.icon}</Typography>
                    <Typography>{category.label}</Typography>
                  </Box>
                </Paper>
              ))}
            </FormGroup>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h5" gutterBottom align="center">
              Reminder Settings
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 4, color: 'text.secondary' }}>
              Choose how you want to be reminded about your goals
            </Typography>
            <FormGroup sx={{ gap: 2 }}>
              <Paper
                sx={{
                  p: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                }}
              >
                <Typography variant="subtitle1" gutterBottom>
                  Basic Reminders
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.reminders.daily}
                      onChange={() => handleReminderChange('daily')}
                      sx={{
                        color: '#ff9800',
                        '&.Mui-checked': {
                          color: '#ff9800',
                        },
                      }}
                    />
                  }
                  label="Daily Reminders"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.reminders.weekly}
                      onChange={() => handleReminderChange('weekly')}
                      sx={{
                        color: '#ff9800',
                        '&.Mui-checked': {
                          color: '#ff9800',
                        },
                      }}
                    />
                  }
                  label="Weekly Progress Report"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.reminders.monthly}
                      onChange={() => handleReminderChange('monthly')}
                      sx={{
                        color: '#ff9800',
                        '&.Mui-checked': {
                          color: '#ff9800',
                        },
                      }}
                    />
                  }
                  label="Monthly Goal Review"
                />
              </Paper>

              <Paper
                sx={{
                  p: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                }}
              >
                <Typography variant="subtitle1" gutterBottom>
                  Additional Notifications
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.reminders.email}
                      onChange={() => handleReminderChange('email')}
                      sx={{
                        color: '#ff9800',
                        '&.Mui-checked': {
                          color: '#ff9800',
                        },
                      }}
                    />
                  }
                  label="Email Notifications"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.reminders.push}
                      onChange={() => handleReminderChange('push')}
                      sx={{
                        color: '#ff9800',
                        '&.Mui-checked': {
                          color: '#ff9800',
                        },
                      }}
                    />
                  }
                  label="Push Notifications"
                />
              </Paper>

              <Paper
                sx={{
                  p: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                }}
              >
                <Typography variant="subtitle1" gutterBottom>
                  Calendar Sync
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.reminders.calendar}
                      onChange={() => handleReminderChange('calendar')}
                      sx={{
                        color: '#ff9800',
                        '&.Mui-checked': {
                          color: '#ff9800',
                        },
                      }}
                    />
                  }
                  label="Sync with Google Calendar"
                />
                {formData.reminders.calendar && (
                  <Button
                    startIcon={<GoogleIcon />}
                    variant="outlined"
                    sx={{ mt: 1, color: '#ff9800', borderColor: '#ff9800' }}
                  >
                    Connect Google Account
                  </Button>
                )}
              </Paper>
            </FormGroup>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#121212',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <StyledPaper>
          <Stepper
            activeStep={activeStep}
            sx={{
              mb: 4,
              '& .MuiStepLabel-label': {
                color: '#ffffff',
                fontSize: '1rem',
              },
              '& .MuiStepIcon-root': {
                color: '#666',
              },
              '& .MuiStepIcon-active': {
                color: '#ff9800',
              },
              '& .MuiStepIcon-completed': {
                color: '#ff9800',
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {getStepContent(activeStep)}

          {error && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              onClick={handleBack}
              disabled={activeStep === 0}
              sx={{ color: '#ffffff' }}
            >
              Back
            </Button>
            <ActionButton onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Get Started' : 'Next'}
            </ActionButton>
          </Box>
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default Onboarding; 