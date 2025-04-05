import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  styled,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { motion } from 'framer-motion';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1e1e1e',
  color: '#ffffff',
  padding: theme.spacing(4),
  borderRadius: 16,
  border: '1px solid rgba(255, 255, 255, 0.12)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
}));

const RegisterSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to onboarding page after 3 seconds
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

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
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <CheckCircle sx={{ fontSize: 80, color: '#00D4FF', mb: 2 }} />
              <Typography variant="h4" gutterBottom>
                Registration Successful!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Your account has been created successfully.
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" align="center">
              Redirecting to onboarding...
            </Typography>
          </StyledPaper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default RegisterSuccess; 