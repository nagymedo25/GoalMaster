import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  LinearProgress,
  Stack,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  PriorityHigh as PriorityHighIcon,
  TrendingUp as PriorityMediumIcon,
  ArrowDownward as PriorityLowIcon,
  Warning as WarningIcon,
  Flag as FlagIcon,
  EmojiEvents as EmojiEventsIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const GoalsPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: 'Complete Project Proposal',
      description: 'Write and submit the project proposal document',
      priority: 'high',
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      progress: 80,
      subtasks: [
        { id: 1, text: 'Research requirements', completed: true },
        { id: 2, text: 'Write initial draft', completed: true },
        { id: 3, text: 'Review and revise', completed: false },
      ],
    },
    {
      id: 2,
      title: 'Learn React',
      description: 'Master React fundamentals and advanced concepts',
      dueDate: '2024-03-15',
      priority: 'low',
      status: 'in_progress',
      progress: 30,
      category: 'Learning',
      subtasks: [
        { id: 1, text: 'Learn React basics', completed: true },
        { id: 2, text: 'Study hooks and state management', completed: false },
        { id: 3, text: 'Practice with projects', completed: false },
      ],
    },
    // Add more mock goals here
  ]);

  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    priority: 'medium',
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    subtasks: [],
  });

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleAddGoal = () => {
    setGoals([...goals, { ...newGoal, id: goals.length + 1, progress: 0 }]);
    setNewGoal({
      title: '',
      description: '',
      priority: 'medium',
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      subtasks: [],
    });
    handleCloseDialog();
  };

  const handleDeleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const handleAddSubtask = (goalId, subtaskText) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id === goalId) {
          return {
            ...goal,
            subtasks: [
              ...goal.subtasks,
              {
                id: goal.subtasks.length + 1,
                text: subtaskText,
                completed: false,
              },
            ],
          };
        }
        return goal;
      })
    );
  };

  const handleToggleSubtask = (goalId, subtaskId) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id === goalId) {
          return {
            ...goal,
            subtasks: goal.subtasks.map((subtask) =>
              subtask.id === subtaskId
                ? { ...subtask, completed: !subtask.completed }
                : subtask
            ),
            progress:
              (goal.subtasks.filter((st) => st.completed).length /
                goal.subtasks.length) *
              100,
          };
        }
        return goal;
      })
    );
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <PriorityHighIcon color="error" />;
      case 'medium':
        return <PriorityMediumIcon color="warning" />;
      case 'low':
        return <PriorityLowIcon color="info" />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Goals Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Add New Goal
        </Button>
      </Box>

      <Grid container spacing={3}>
        {goals.map((goal) => (
          <Grid item xs={12} md={6} key={goal.id}>
            <MotionCard
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">{goal.title}</Typography>
                  <Stack direction="row" spacing={1}>
                    <IconButton size="small" onClick={() => handleDeleteGoal(goal.id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton size="small">
                      <EditIcon />
                    </IconButton>
                  </Stack>
                </Box>

                <Typography variant="body2" color="text.secondary" paragraph>
                  {goal.description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  {getPriorityIcon(goal.priority)}
                  <Chip
                    label={goal.priority.toUpperCase()}
                    size="small"
                    color={
                      goal.priority === 'high'
                        ? 'error'
                        : goal.priority === 'medium'
                        ? 'warning'
                        : 'info'
                    }
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    Progress
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={goal.progress}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>

                <Typography variant="subtitle2" gutterBottom>
                  Subtasks
                </Typography>
                <List dense>
                  {goal.subtasks.map((subtask) => (
                    <ListItem key={subtask.id}>
                      <ListItemText
                        primary={subtask.text}
                        sx={{
                          textDecoration: subtask.completed ? 'line-through' : 'none',
                          color: subtask.completed ? 'text.secondary' : 'text.primary',
                        }}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          size="small"
                          onClick={() => handleToggleSubtask(goal.id, subtask.id)}
                        >
                          <CheckCircleIcon
                            color={subtask.completed ? 'success' : 'action'}
                          />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>

                <Box sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Add new subtask"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        handleAddSubtask(goal.id, e.target.value.trim());
                        e.target.value = '';
                      }
                    }}
                  />
                </Box>
              </CardContent>
            </MotionCard>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Goal</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Title"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={newGoal.description}
              onChange={(e) =>
                setNewGoal({ ...newGoal, description: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={newGoal.priority}
                label="Priority"
                onChange={(e) =>
                  setNewGoal({ ...newGoal, priority: e.target.value })
                }
              >
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <DatePicker
                    label="Start Date"
                    value={newGoal.startDate}
                    onChange={(date) =>
                      setNewGoal({ ...newGoal, startDate: date })
                    }
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DatePicker
                    label="End Date"
                    value={newGoal.endDate}
                    onChange={(date) => setNewGoal({ ...newGoal, endDate: date })}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Grid>
              </Grid>
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddGoal}
            disabled={!newGoal.title.trim()}
          >
            Add Goal
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GoalsPage; 