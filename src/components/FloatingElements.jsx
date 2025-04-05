import { Box } from '@mui/material';
import { FitnessCenter, Psychology, TrendingUp, Settings, EmojiEvents } from '@mui/icons-material';
import FloatingElement from './FloatingElement';

const FloatingElements = () => (
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
    }}
  >
    <FloatingElement
      icon={<FitnessCenter />}
      color="primary.main"
      size={80}
      top="10%"
      left="10%"
      delay={0}
    />
    <FloatingElement
      icon={<Psychology />}
      color="secondary.main"
      size={60}
      top="20%"
      left="80%"
      delay={0.5}
    />
    <FloatingElement
      icon={<TrendingUp />}
      color="success.main"
      size={70}
      top="40%"
      left="20%"
      delay={1}
    />
    <FloatingElement
      icon={<Settings />}
      color="info.main"
      size={50}
      top="60%"
      left="70%"
      delay={1.5}
    />
    <FloatingElement
      icon={<EmojiEvents />}
      color="warning.main"
      size={90}
      top="80%"
      left="30%"
      delay={2}
    />
  </Box>
);

export default FloatingElements; 