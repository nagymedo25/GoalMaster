import { motion } from 'framer-motion';

const FloatingElement = ({ children, delay = 0, duration = 3, distance = 20 }) => (
  <motion.div
    animate={{
      y: [-distance, distance],
    }}
    transition={{
      duration,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
      delay,
    }}
  >
    {children}
  </motion.div>
);

export default FloatingElement; 