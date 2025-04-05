import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Avatar,
  Badge,
} from '@mui/material';
import {
  EmojiEvents as EmojiEventsIcon,
  Star as StarIcon,
  CheckCircle as CheckCircleIcon,
  Lock as LockIcon,
  Diamond as DiamondIcon,
  LocalFireDepartment as FireIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

const ChallengesPage = () => {
  // Mock data
  const challenges = [
    {
      id: 1,
      title: 'Weekly Warrior',
      description: 'Complete 5 tasks in a single day',
      points: 500,
      progress: 60,
      deadline: '2024-03-31',
      status: 'in_progress',
      icon: <FireIcon />,
    },
    {
      id: 2,
      title: 'Early Bird',
      description: 'Complete 3 tasks before 10 AM',
      points: 300,
      progress: 0,
      deadline: '2024-03-31',
      status: 'locked',
      icon: <StarIcon />,
    },
    {
      id: 3,
      title: 'Streak Master',
      description: 'Maintain a 7-day completion streak',
      points: 1000,
      progress: 100,
      deadline: '2024-03-31',
      status: 'completed',
      icon: <EmojiEventsIcon />,
    },
  ];

  const achievements = [
    {
      id: 1,
      title: 'Task Master',
      description: 'Complete 50 tasks',
      points: 1000,
      icon: <CheckCircleIcon />,
      unlocked: true,
      progress: 100,
    },
    {
      id: 2,
      title: 'Early Bird',
      description: 'Complete 10 tasks before 9 AM',
      points: 500,
      icon: <StarIcon />,
      unlocked: false,
      progress: 30,
    },
    {
      id: 3,
      title: 'Streak Champion',
      description: 'Maintain a 30-day completion streak',
      points: 2000,
      icon: <EmojiEventsIcon />,
      unlocked: false,
      progress: 15,
    },
  ];

  const rewards = [
    {
      id: 1,
      title: 'Custom Theme',
      description: 'Unlock a premium dashboard theme',
      points: 1000,
      icon: <DiamondIcon />,
      available: true,
    },
    {
      id: 2,
      title: 'Priority Support',
      description: 'Get priority customer support',
      points: 2000,
      icon: <StarIcon />,
      available: false,
    },
    {
      id: 3,
      title: 'Advanced Analytics',
      description: 'Access advanced analytics features',
      points: 1500,
      icon: <EmojiEventsIcon />,
      available: true,
    },
  ];

  const userPoints = 1250;

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Points Display */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ mr: 2 }}>
          Challenges & Rewards
        </Typography>
        <Chip
          icon={<DiamondIcon />}
          label={`${userPoints} Points`}
          color="primary"
          variant="outlined"
          size="large"
        />
      </Box>

      <Grid container spacing={3}>
        {/* Active Challenges */}
        <Grid item xs={12} md={6}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Active Challenges
              </Typography>
              <List>
                {challenges.map((challenge) => (
                  <ListItem key={challenge.id}>
                    <ListItemIcon>{challenge.icon}</ListItemIcon>
                    <ListItemText
                      primary={challenge.title}
                      secondary={challenge.description}
                    />
                    <Box sx={{ minWidth: 100, textAlign: 'right' }}>
                      {challenge.status === 'locked' ? (
                        <LockIcon color="disabled" />
                      ) : challenge.status === 'completed' ? (
                        <CheckCircleIcon color="success" />
                      ) : (
                        <>
                          <Typography variant="body2" color="text.secondary">
                            {challenge.points} points
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={challenge.progress}
                            sx={{ mt: 1 }}
                          />
                        </>
                      )}
                    </Box>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </MotionCard>
        </Grid>

        {/* Achievements */}
        <Grid item xs={12} md={6}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Achievements
              </Typography>
              <List>
                {achievements.map((achievement) => (
                  <ListItem key={achievement.id}>
                    <ListItemIcon>
                      <Badge
                        color={achievement.unlocked ? 'success' : 'default'}
                        variant="dot"
                      >
                        {achievement.icon}
                      </Badge>
                    </ListItemIcon>
                    <ListItemText
                      primary={achievement.title}
                      secondary={achievement.description}
                    />
                    <Box sx={{ minWidth: 100, textAlign: 'right' }}>
                      <Typography variant="body2" color="text.secondary">
                        {achievement.points} points
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={achievement.progress}
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </MotionCard>
        </Grid>

        {/* Rewards */}
        <Grid item xs={12}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Available Rewards
              </Typography>
              <Grid container spacing={2}>
                {rewards.map((reward) => (
                  <Grid item xs={12} sm={6} md={4} key={reward.id}>
                    <Card
                      variant="outlined"
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        opacity: reward.available ? 1 : 0.5,
                      }}
                    >
                      <CardContent>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          sx={{ mb: 2 }}
                        >
                          {reward.icon}
                          <Typography variant="h6">{reward.title}</Typography>
                        </Stack>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          paragraph
                        >
                          {reward.description}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mt: 'auto',
                          }}
                        >
                          <Chip
                            icon={<DiamondIcon />}
                            label={`${reward.points} Points`}
                            size="small"
                          />
                          <Button
                            variant="contained"
                            disabled={!reward.available || userPoints < reward.points}
                            size="small"
                          >
                            Redeem
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </MotionCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChallengesPage; 