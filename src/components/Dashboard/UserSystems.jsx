import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Alert,
  Snackbar,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AccessTime as AccessTimeIcon,
  CalendarToday as CalendarIcon,
  EmojiEvents as EmojiEventsIcon,
} from '@mui/icons-material';
import { getUserSystems, saveUserSystem, deleteUserSystem } from '../../utils/storage';

const UserSystems = () => {
  const [systems, setSystems] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSystem, setEditingSystem] = useState(null);
  const [systemForm, setSystemForm] = useState({
    type: '',
    workHours: '',
    hasBreaks: '',
    preferredTime: '',
    productiveDays: [],
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Load user systems
    const userSystems = getUserSystems();
    setSystems(userSystems);
  }, []);

  const handleAddSystem = () => {
    setEditingSystem(null);
    setSystemForm({
      type: '',
      workHours: '',
      hasBreaks: '',
      preferredTime: '',
      productiveDays: [],
    });
    setOpenDialog(true);
  };

  const handleEditSystem = (system) => {
    setEditingSystem(system);
    setSystemForm({
      type: system.type,
      workHours: system.workHours,
      hasBreaks: system.hasBreaks,
      preferredTime: system.preferredTime,
      productiveDays: system.productiveDays,
    });
    setOpenDialog(true);
  };

  const handleDeleteSystem = (systemId) => {
    const updatedSystems = deleteUserSystem(systemId);
    setSystems(Array.isArray(updatedSystems) ? updatedSystems : []);
    setShowSuccess(true);
    setSuccessMessage('System deleted successfully!');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingSystem(null);
    setSystemForm({
      type: '',
      workHours: '',
      hasBreaks: '',
      preferredTime: '',
      productiveDays: [],
    });
  };

  const handleSubmitSystem = () => {
    const systemData = {
      ...systemForm,
      id: editingSystem?.id || Date.now(),
      createdAt: editingSystem?.createdAt || new Date().toISOString(),
    };

    const updatedSystems = saveUserSystem(systemData);
    setSystems(Array.isArray(updatedSystems) ? updatedSystems : [updatedSystems]);
    setShowSuccess(true);
    setSuccessMessage(editingSystem ? 'System updated successfully!' : 'System added successfully!');
    handleCloseDialog();
  };

  const handleSystemTypeChange = (event) => {
    setSystemForm(prev => ({
      ...prev,
      type: event.target.value
    }));
  };

  const handleFormChange = (field) => (event) => {
    setSystemForm(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleProductiveDaysChange = (day) => (event) => {
    setSystemForm(prev => ({
      ...prev,
      productiveDays: event.target.checked
        ? [...prev.productiveDays, day]
        : prev.productiveDays.filter(d => d !== day)
    }));
  };

  const getSystemTypeIcon = (type) => {
    return type === 'daily' ? <AccessTimeIcon /> : <CalendarIcon />;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ color: '#ffffff' }}>
          Your Systems
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddSystem}
          sx={{
            bgcolor: '#FF6B00',
            '&:hover': {
              bgcolor: '#E65A00',
            },
          }}
        >
          Add New System
        </Button>
      </Box>

      <Grid container spacing={3}>
        {systems.map((system) => (
          <Grid item xs={12} md={6} key={system.id}>
            <Card
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: 3,
                height: '100%',
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getSystemTypeIcon(system.type)}
                    <Typography variant="h6" sx={{ color: '#ffffff' }}>
                      {system.type === 'daily' ? 'Daily System' : 'Weekly System'}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleEditSystem(system)}
                      sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteSystem(system.id)}
                      sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                    Work Hours
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#ffffff' }}>
                    {system.workHours} hours per {system.type === 'daily' ? 'day' : 'week'}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                    Preferred Time
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#ffffff' }}>
                    {system.preferredTime === 'morning' ? 'Morning' : 'Evening'}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                    Productive Days
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {system.productiveDays.map((day) => (
                      <Chip
                        key={day}
                        label={day}
                        sx={{
                          bgcolor: 'rgba(255, 107, 0, 0.2)',
                          color: '#FF6B00',
                          '&:hover': {
                            bgcolor: 'rgba(255, 107, 0, 0.3)',
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                    Break Times
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#ffffff' }}>
                    {system.hasBreaks === 'yes' ? 'Fixed break times' : 'Flexible break times'}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit System Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#1e1e1e',
            color: '#ffffff',
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          {editingSystem ? 'Edit System' : 'Add New System'}
        </DialogTitle>
        <DialogContent sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ color: '#ffffff', mb: 2 }}>
                  System Type
                </FormLabel>
                <Select
                  value={systemForm.type}
                  onChange={handleSystemTypeChange}
                  fullWidth
                  sx={{
                    color: '#ffffff',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#FF6B00',
                    },
                  }}
                >
                  <MenuItem value="daily">Daily System</MenuItem>
                  <MenuItem value="weekly">Weekly System</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label={`Work Hours (per ${systemForm.type === 'daily' ? 'day' : 'week'})`}
                value={systemForm.workHours}
                onChange={handleFormChange('workHours')}
                type="number"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: '#FF6B00',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ color: '#ffffff' }}>
                  Break Times
                </FormLabel>
                <Select
                  value={systemForm.hasBreaks}
                  onChange={handleFormChange('hasBreaks')}
                  fullWidth
                  sx={{
                    color: '#ffffff',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#FF6B00',
                    },
                  }}
                >
                  <MenuItem value="yes">Fixed break times</MenuItem>
                  <MenuItem value="no">Flexible break times</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ color: '#ffffff' }}>
                  Preferred Time
                </FormLabel>
                <Select
                  value={systemForm.preferredTime}
                  onChange={handleFormChange('preferredTime')}
                  fullWidth
                  sx={{
                    color: '#ffffff',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#FF6B00',
                    },
                  }}
                >
                  <MenuItem value="morning">Morning</MenuItem>
                  <MenuItem value="evening">Evening</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ color: '#ffffff' }}>
                  Productive Days
                </FormLabel>
                <FormGroup>
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <FormControlLabel
                      key={day}
                      control={
                        <Checkbox
                          checked={systemForm.productiveDays.includes(day)}
                          onChange={handleProductiveDaysChange(day)}
                          sx={{ color: '#FF6B00' }}
                        />
                      }
                      label={day}
                      sx={{ color: '#ffffff' }}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Button onClick={handleCloseDialog} sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmitSystem}
            variant="contained"
            sx={{
              bgcolor: '#FF6B00',
              '&:hover': {
                bgcolor: '#E65A00',
              },
            }}
          >
            {editingSystem ? 'Update System' : 'Add System'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Notification */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserSystems; 