import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Tooltip,
  LinearProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Task as TaskIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
} from 'recharts';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1e1e1e',
  color: '#ffffff',
  padding: theme.spacing(3),
  borderRadius: 12,
  border: '1px solid rgba(255, 255, 255, 0.12)',
  height: '100%',
}));

const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ff9800',
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: 8,
  '&:hover': {
    backgroundColor: '#f57c00',
  },
}));

const FirstTimeTooltip = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 152, 0, 0.16)',
  color: '#ff9800',
  padding: theme.spacing(1, 2),
  borderRadius: 8,
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

// Sample data for charts
const goalProgressData = [
  { name: 'Jan', progress: 30 },
  { name: 'Feb', progress: 45 },
  { name: 'Mar', progress: 60 },
  { name: 'Apr', progress: 75 },
  { name: 'May', progress: 85 },
  { name: 'Jun', progress: 90 },
];

const taskCompletionData = [
  { name: 'Mon', completed: 4, total: 5 },
  { name: 'Tue', completed: 3, total: 5 },
  { name: 'Wed', completed: 5, total: 5 },
  { name: 'Thu', completed: 2, total: 5 },
  { name: 'Fri', completed: 4, total: 5 },
];

const MainContent = ({ selectedSection, isFirstTime, onFirstTimeComplete }) => {
  const renderFirstTimeTooltip = (text) => {
    if (!isFirstTime) return null;
    return (
      <FirstTimeTooltip>
        <Typography variant="body2">{text}</Typography>
      </FirstTimeTooltip>
    );
  };

  const renderDashboardContent = () => {
    switch (selectedSection) {
      case 'home':
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              Welcome Back, User!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Here's your progress overview
            </Typography>

            <Grid container spacing={3}>
              {/* Quick Actions */}
              <Grid item xs={12}>
                <StyledPaper>
                  {renderFirstTimeTooltip('Quick actions help you manage your goals efficiently')}
                  <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <ActionButton startIcon={<AddIcon />}>
                      Add New Goal
                    </ActionButton>
                    <ActionButton startIcon={<TaskIcon />}>
                      View Tasks
                    </ActionButton>
                    <ActionButton startIcon={<TrendingUpIcon />}>
                      Track Progress
                    </ActionButton>
                  </Box>
                </StyledPaper>
              </Grid>

              {/* Goal Progress Chart */}
              <Grid item xs={12} md={6}>
                <StyledPaper>
                  {renderFirstTimeTooltip('Track your goal progress over time')}
                  <Typography variant="h6" gutterBottom>
                    Goal Progress
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={goalProgressData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="name" stroke="#fff" />
                        <YAxis stroke="#fff" />
                        <ChartTooltip
                          contentStyle={{
                            backgroundColor: '#1e1e1e',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                          }}
                          labelStyle={{ color: '#fff' }}
                        />
                        <Line
                          type="monotone"
                          dataKey="progress"
                          stroke="#ff9800"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </StyledPaper>
              </Grid>

              {/* Task Completion Chart */}
              <Grid item xs={12} md={6}>
                <StyledPaper>
                  {renderFirstTimeTooltip('Monitor your daily task completion rate')}
                  <Typography variant="h6" gutterBottom>
                    Task Completion Rate
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={taskCompletionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="name" stroke="#fff" />
                        <YAxis stroke="#fff" />
                        <ChartTooltip
                          contentStyle={{
                            backgroundColor: '#1e1e1e',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                          }}
                          labelStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="completed" fill="#ff9800" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </StyledPaper>
              </Grid>

              {/* Overall Progress */}
              <Grid item xs={12}>
                <StyledPaper>
                  {renderFirstTimeTooltip('See your overall progress towards your goals')}
                  <Typography variant="h6" gutterBottom>
                    Overall Progress
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={75}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: '#ff9800',
                          },
                        }}
                      />
                    </Box>
                    <Typography variant="body1">75%</Typography>
                  </Box>
                </StyledPaper>
              </Grid>
            </Grid>
          </Box>
        );

      case 'tasks':
        return <Typography variant="h4">Tasks Page</Typography>;
      case 'calendar':
        return <Typography variant="h4">Calendar Page</Typography>;
      case 'achievements':
        return <Typography variant="h4">Achievements Page</Typography>;
      case 'settings':
        return <Typography variant="h4">Settings Page</Typography>;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {renderDashboardContent()}
    </Box>
  );
};

export default MainContent; 