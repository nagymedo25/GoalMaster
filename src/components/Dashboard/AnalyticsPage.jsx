import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Stack,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Timer as TimerIcon,
  EmojiEvents as EmojiEventsIcon,
  Lightbulb as LightbulbIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const MotionCard = motion(Card);

const AnalyticsPage = () => {
  // Mock data for charts
  const weeklyData = [
    { name: 'Mon', productivity: 85, tasks: 6 },
    { name: 'Tue', productivity: 92, tasks: 8 },
    { name: 'Wed', productivity: 78, tasks: 5 },
    { name: 'Thu', productivity: 88, tasks: 7 },
    { name: 'Fri', productivity: 95, tasks: 9 },
    { name: 'Sat', productivity: 70, tasks: 4 },
    { name: 'Sun', productivity: 65, tasks: 3 },
  ];

  const taskDistribution = [
    { name: 'Completed', value: 65 },
    { name: 'In Progress', value: 25 },
    { name: 'Delayed', value: 10 },
  ];

  const COLORS = ['#4CAF50', '#FFC107', '#F44336'];

  const insights = [
    {
      type: 'success',
      icon: <CheckCircleIcon color="success" />,
      text: "You've completed 65% of your weekly goals, exceeding your target of 60%",
    },
    {
      type: 'warning',
      icon: <WarningIcon color="warning" />,
      text: 'Productivity drops significantly after 2 PM. Consider scheduling important tasks in the morning',
    },
    {
      type: 'info',
      icon: <LightbulbIcon color="info" />,
      text: 'Breaking down complex goals into smaller tasks has improved your completion rate by 25%',
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Analytics & Insights
      </Typography>

      <Grid container spacing={3}>
        {/* Weekly Productivity Chart */}
        <Grid item xs={12} md={8}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Weekly Productivity Trends
              </Typography>
              <Box sx={{ height: 300, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="productivity"
                      stroke="#2196f3"
                      name="Productivity (%)"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="tasks"
                      stroke="#f50057"
                      name="Tasks Completed"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </MotionCard>
        </Grid>

        {/* Task Distribution Chart */}
        <Grid item xs={12} md={4}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Task Distribution
              </Typography>
              <Box sx={{ height: 300, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taskDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {taskDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </MotionCard>
        </Grid>

        {/* Performance Metrics */}
        <Grid item xs={12} md={6}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Performance Metrics
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Weekly Goal Completion</Typography>
                    <Typography variant="body2">65%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={65} />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Average Task Time</Typography>
                    <Typography variant="body2">2.5 hours</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={75} />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Productivity Score</Typography>
                    <Typography variant="body2">85/100</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={85} />
                </Box>
              </Stack>
            </CardContent>
          </MotionCard>
        </Grid>

        {/* AI Insights */}
        <Grid item xs={12} md={6}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                AI-Powered Insights
              </Typography>
              <List>
                {insights.map((insight, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>{insight.icon}</ListItemIcon>
                    <ListItemText primary={insight.text} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </MotionCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsPage; 