import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  styled,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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

const Register = ({ onRegister }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('كلمات المرور غير متطابقة');
      return;
    }

    try {
      // Here you would typically make an API call to register the user
      // For now, we'll simulate a successful registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call onRegister to update authentication state
      onRegister();
      
      // Navigate to register success page after successful registration
      navigate('/register-success');
    } catch (err) {
      setError('حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.');
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
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StyledPaper>
            <Typography variant="h4" align="center" gutterBottom>
              Create New Account
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 4, color: 'text.secondary' }}>
              Join us to start your journey towards achieving your goals
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                margin="normal"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
                sx={{
                  mb: 2,
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

              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                margin="normal"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                required
                sx={{
                  mb: 2,
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

              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                required
                sx={{
                  mb: 2,
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

              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                required
                sx={{
                  mb: 3,
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

              {error && (
                <Typography color="error" align="center" sx={{ mb: 2 }}>
                  {error}
                </Typography>
              )}

              <ActionButton
                type="submit"
                fullWidth
                variant="contained"
                size="large"
              >
                Create Account
              </ActionButton>
            </form>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate('/login')}
                  sx={{ color: '#ff9800' }}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </StyledPaper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Register; 