import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Stack,
  IconButton,
  Tooltip,
  Paper,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Timer as TimerIcon,
  CompareArrows as CompareArrowsIcon,
  Lightbulb as LightbulbIcon,
  EmojiEvents as EmojiEventsIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionCard = motion.create(Paper);

const HomePage = () => {
  // Mock data - replace with real data from your backend
  const userData = {
    name: 'John',
    weeklyProgress: 75,
    averageTaskTime: '2.5 hours',
    performanceComparison: '+15%',
    points: 1250,
    activeGoals: 5,
    completedGoals: 3,
    delayedGoals: 1,
  };

  const goals = [
    { title: 'Complete Project Proposal', progress: 80, status: 'In Progress' },
    { title: 'Learn React Hooks', progress: 60, status: 'In Progress' },
    { title: 'Exercise Routine', progress: 100, status: 'Completed' },
    { title: 'Read Book Chapter', progress: 30, status: 'Delayed' },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Personalized Greeting */}
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ mb: 4 }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Hello {userData.name}! How are your goals progressing today? 🚀
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Let's make today productive and achieve your goals!
          </Typography>
        </CardContent>
      </MotionCard>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1}>
                <TrendingUpIcon color="primary" />
                <Typography variant="h6">Weekly Progress</Typography>
              </Stack>
              <Typography variant="h4" sx={{ mt: 2 }}>
                {userData.weeklyProgress}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={userData.weeklyProgress}
                sx={{ mt: 1 }}
              />
            </CardContent>
          </MotionCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1}>
                <TimerIcon color="primary" />
                <Typography variant="h6">Avg. Task Time</Typography>
              </Stack>
              <Typography variant="h4" sx={{ mt: 2 }}>
                {userData.averageTaskTime}
              </Typography>
            </CardContent>
          </MotionCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1}>
                <CompareArrowsIcon color="primary" />
                <Typography variant="h6">Performance</Typography>
              </Stack>
              <Typography variant="h4" sx={{ mt: 2, color: 'success.main' }}>
                {userData.performanceComparison}
              </Typography>
            </CardContent>
          </MotionCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1}>
                <EmojiEventsIcon color="primary" />
                <Typography variant="h6">Points</Typography>
              </Stack>
              <Typography variant="h4" sx={{ mt: 2 }}>
                {userData.points}
              </Typography>
            </CardContent>
          </MotionCard>
        </Grid>
      </Grid>

      {/* Goals Summary */}
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        sx={{ mb: 4 }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Active Goals
          </Typography>
          <Grid container spacing={2}>
            {goals.map((goal, index) => (
              <Grid item xs={12} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1">{goal.title}</Typography>
                    <LinearProgress
                      variant="determinate"
                      value={goal.progress}
                      sx={{ mt: 1 }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    color={
                      goal.status === 'Completed'
                        ? 'success.main'
                        : goal.status === 'Delayed'
                        ? 'error.main'
                        : 'primary.main'
                    }
                  >
                    {goal.status}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </MotionCard>

      {/* AI Insights */}
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <LightbulbIcon color="primary" />
            <Typography variant="h5">AI Insights</Typography>
          </Stack>
          <Typography variant="body1" paragraph>
            Based on your recent activity, here are some personalized recommendations:
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            • You're most productive in the morning. Try scheduling important tasks before noon.
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            • Consider breaking down your "Learn React Hooks" goal into smaller, more manageable tasks.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • You're on track to achieve your weekly goals! Keep up the great work! 🎉
          </Typography>
        </CardContent>
      </MotionCard>
    </Box>
  );
};

export default HomePage; 