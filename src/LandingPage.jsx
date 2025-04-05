import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Link,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger,
  Slide,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Rating,
  Fade,
  Avatar,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  AutoAwesome as AIIcon,
  Sync as IntegrationIcon,
  EmojiEvents as RewardsIcon,
  Notifications as ReminderIcon,
  ArrowForward as ArrowIcon,
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  AutoAwesomeMotion,
  CheckCircle,
  Analytics,
  Close as CloseIcon,
  Menu as MenuIcon,
  CalendarToday,
  Settings,
  Person,
  Logout,
} from '@mui/icons-material';
import { motion, useAnimationControls } from 'framer-motion';
import Logo from './assets/Logo.png';
import FloatingElement from './components/FloatingElement';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Pricing plans data
const plans = [
  {
    title: 'Free',
    price: '0',
    features: ['Basic features', 'AI insights', 'Limited reminders'],
    buttonText: 'Get Started',
    recommended: false
  },
  {
    title: 'Pro',
    price: '9.99',
    features: ['Unlimited goals', 'Smart analytics', 'All integrations'],
    buttonText: 'Try Pro',
    recommended: true
  },
  {
    title: 'Business',
    price: '19.99',
    features: ['Team collaboration', 'Advanced AI', 'Priority support'],
    buttonText: 'Contact Sales',
    recommended: false
  }
];

// FAQ data
const faqs = [
  {
    question: 'What is GoalMaster?',
    answer: 'GoalMaster is an AI-powered productivity platform that helps you set, track, and achieve your goals efficiently.'
  },
  {
    question: 'How does the AI track my goals?',
    answer: 'Our AI analyzes your progress patterns, provides personalized insights, and suggests optimization strategies.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! You can start with our free plan and upgrade anytime to access premium features.'
  },
  {
    question: 'Can I use it for team projects?',
    answer: 'Absolutely! Our Business plan includes team collaboration features and shared workspaces.'
  },
  {
    question: 'How secure is my data?',
    answer: 'We use enterprise-grade encryption and follow strict security protocols to protect your data.'
  }
];

// Testimonials data
const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Product Manager',
    rating: 5,
    comment: "GoalMaster transformed how I manage my team's objectives. The AI insights are incredibly helpful!",
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    name: 'David Chen',
    role: 'Freelancer',
    rating: 5,
    comment: "The best productivity tool I've ever used. The gamification keeps me motivated!",
    avatar: 'https://i.pravatar.cc/150?img=2'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Student',
    rating: 5,
    comment: "Perfect for managing my studies and personal projects. Love the smart reminders!",
    avatar: 'https://i.pravatar.cc/150?img=3'
  },
  {
    name: 'Michael Smith',
    role: 'Entrepreneur',
    rating: 5,
    comment: "GoalMaster has changed the way I approach my daily tasks. Highly recommend!",
    avatar: 'https://i.pravatar.cc/150?img=4'
  },
  {
    name: 'Jessica Brown',
    role: 'Designer',
    rating: 5,
    comment: "A fantastic tool for keeping my projects organized and on track!",
    avatar: 'https://i.pravatar.cc/150?img=5'
  }
];

// Navigation items
const navItems = [
  { title: 'Home', href: 'hero' },
  { title: 'Features', href: 'features' },
  { title: 'How It Works', href: 'how-it-works' },
  { title: 'Pricing', href: 'pricing' },
  { title: 'FAQ', href: 'faq' },
  { title: 'Contact', href: 'contact' }
];

// نقل containerVariants إلى خارج المكونات
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2
    }
  }
};

// Floating Elements Component
const FloatingElements = () => (
  <>
    {[...Array(5)].map((_, i) => (
      <FloatingElement key={i} delay={i * 0.5} distance={10 + i * 5}>
        <Box
          sx={{
            position: 'absolute',
            width: 20,
            height: 20,
            background: 'linear-gradient(45deg, #00D4FF, #FF007F)',
            borderRadius: '50%',
            opacity: 0.2,
            left: `${i * 15 + 5}%`,
            top: `${Math.random() * 80 + 10}%`,
          }}
        />
      </FloatingElement>
    ))}
  </>
);

// Hero Section
const HeroSection = () => (
  <Container component="section" id="hero" maxWidth="lg" sx={{ mt: 12, mb: 8, position: 'relative', pt: 6 }}>
    <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, overflow: 'hidden' }}>
      <FloatingElements />
    </Box>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              background: 'linear-gradient(45deg, #00D4FF, #FF007F)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              mb: 2,
            }}
          >
            Boost Your Productivity with AI Powered
          </Typography>
          <Typography
            variant="h5"
            color="#555555"
            sx={{ mb: 4 }}
          >
            Stay on track, get personalized recommendations, and achieve your goals effortlessly.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              size="large"
              endIcon={<ArrowIcon />}
              sx={{
                backgroundColor: '#007BFF',
                '&:hover': {
                  backgroundColor: '#0056b3',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 0 20px #00D4FF',
                }
              }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: '#6C757D',
                '&:hover': {
                  borderColor: '#007BFF',
                }
              }}
            >
              Learn More
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}
          >
            <motion.img
              src={Logo}
              alt="GoalMaster Logo"
              style={{ maxWidth: '85%', height: 'auto' }}
              animate={{ scale: [1, 1.02, 1], transition: { duration: 2, repeat: Infinity, repeatType: "reverse" } }}
            />
          </Box>
        </Grid>
      </Grid>
    </motion.div>
  </Container>
);

// How It Works Section
const HowItWorksSection = React.forwardRef((props, ref) => (
  <Container component="section" id="how-it-works" ref={ref} maxWidth="lg" sx={{ py: 8, mb: 7 }}>
    <Typography variant="h3" align="center" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2.5rem' }, color: '#FFF' }}>
      How GoalMaster Works?
    </Typography>
    <Grid container spacing={4} sx={{ mt: 4 }}>
      {[
        {
          icon: <AIIcon sx={{ fontSize: 40 }} />,
          title: 'Set Your Goals',
          description: 'Define what you want to achieve with our intuitive goal-setting interface.'
        },
        {
          icon: <IntegrationIcon sx={{ fontSize: 40 }} />,
          title: 'Track Your Progress',
          description: 'Let AI analyze and optimize your workflow for maximum productivity.'
        },
        {
          icon: <RewardsIcon sx={{ fontSize: 40 }} />,
          title: 'Stay Motivated',
          description: 'Get insights, rewards, and maintain your productivity streak.'
        }
      ].map((step, index) => (
        <Grid item xs={12} md={4} key={step.title}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <Box
                sx={{
                  mb: 2,
                  p: 2,
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #00D4FF, #FF007F)',
                  color: 'white'
                }}
              >
                {step.icon}
              </Box>
              <Typography variant="h5" gutterBottom sx={{ color: '#111111' }}>
                {step.title}
              </Typography>
              <Typography color="text.secondary">
                {step.description}
              </Typography>
            </Box>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  </Container>
));

// Testimonials Section
const TestimonialsSection = React.forwardRef((props, ref) => {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
  const controls = useAnimationControls();
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
    }
  }, []);

  const startAnimation = async () => {
    await controls.start({
      x: [null, "-100%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 15,
          ease: "linear",
        },
      },
    });
  };

  useEffect(() => {
    if (!isInteracting) {
      startAnimation();
    } else {
      controls.stop();
    }
  }, [isInteracting]);

  return (
    <Container component="section" ref={ref} maxWidth="lg" sx={{ py: 8, mb: 7, position: "relative" }}>
      <FloatingElements />
      <Typography variant="h3" pb={15} align="center" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2.5rem' }, color: '#FFF' }}>
        What Our Users Say
      </Typography>

      <Box
        ref={containerRef}
        sx={{
          position: "relative",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => setIsInteracting(false)}
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          onDragStart={() => setIsInteracting(true)}
          onDragEnd={() => setIsInteracting(false)}
          animate={controls}
          style={{ display: "flex", cursor: "grab" }}
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <Card
              key={index}
              sx={{
                flex: "0 0 auto",
                width: 270,
                mx: 2,
                p: 2,
                position: "relative",
                backdropFilter: "blur(10px)",
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar src={testimonial.avatar} sx={{ width: 50, height: 50, mr: 2 }} />
                  <Box>
                    <Typography variant="h6" sx={{ color: '#FFF' }}>{testimonial.name}</Typography>
                    <Typography color="text.secondary">{testimonial.role}</Typography>
                  </Box>
                </Box>
                <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "normal" }}>
                  {testimonial.comment}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </Box>
    </Container>
  );
});

// Pricing Section
const PricingSection = React.forwardRef((props, ref) => (
  <Container component="section" id="pricing" ref={ref} maxWidth="lg" sx={{ py: 8, mb: 7, position: 'relative' }}>
    <FloatingElements />
    <Typography variant="h3" align="center" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2.5rem' }, color: '#FFF' }}>
      Choose Your Plan
    </Typography>
    <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ color: '#555555' }}>
      Start free and upgrade as you grow
    </Typography>
    <Grid container spacing={4} sx={{ mt: 4 }}>
      {plans.map((plan, index) => (
        <Grid item xs={12} md={4} key={plan.title}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'visible',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  transition: 'transform 0.3s ease-in-out'
                }
              }}
            >
              {plan.recommended && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bgcolor: 'secondary.main',
                    color: 'white',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.875rem',
                    fontWeight: 'bold'
                  }}
                >
                  Recommended
                </Box>
              )}
              <CardContent sx={{ flexGrow: 1, p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ color: '#FFF' }}>
                  {plan.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                  <Typography variant="h3" component="span">
                    ${plan.price}
                  </Typography>
                  {plan.price !== '0' && (
                    <Typography variant="subtitle1" component="span" sx={{ ml: 1 }}>
                      /month
                    </Typography>
                  )}
                </Box>
                <Box sx={{ mb: 3 }}>
                  {plan.features.map((feature) => (
                    <Box
                      key={feature}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1
                      }}
                    >
                      <CheckCircle sx={{ mr: 1, color: 'success.main', fontSize: 20 }} />
                      <Typography>{feature}</Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
              <Box sx={{ p: 3 }}>
                <Button
                  variant={plan.recommended ? 'contained' : 'outlined'}
                  fullWidth
                  size="large"
                >
                  {plan.buttonText}
                </Button>
              </Box>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  </Container>
));

// FAQ Section
const FAQSection = React.forwardRef((props, ref) => (
  <Container component="section" id="faq" ref={ref} maxWidth="lg" sx={{ py: 8, mb: 7, position: 'relative' }}>
    <FloatingElements />
    <Typography variant="h3" align="center" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2.5rem' }, color: '#FFF' }}>
      Frequently Asked Questions
    </Typography>
    <Box sx={{ mt: 4, maxWidth: 800, mx: 'auto' }}>
      {faqs.map((faq, index) => (
        <motion.div
          key={faq.question}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Accordion
            sx={{
              mb: 1,
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              '&:before': { display: 'none' }
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </motion.div>
      ))}
    </Box>
  </Container>
));

// Final CTA Section
const CTASection = () => (
  <Container component="section" maxWidth="lg" sx={{ mb: 7 }}>
    <Box
      sx={{
        textAlign: 'center',
        p: 6,
        borderRadius: 4,
        background: 'linear-gradient(45deg, rgba(0,212,255,0.1), rgba(255,0,127,0.1))',
        backdropFilter: 'blur(10px)'
      }}
    >
      <Typography variant="h3" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2.5rem' }, paddingBottom: { xs: '1.5rem' } }} >
        Start Achieving Your Goals Today!
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph>
        Join thousands of users who have transformed their productivity with GoalMaster.
      </Typography>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="center"
        sx={{ mt: 4 }}
      >
        <Button
          variant="contained"
          size="large"
          component={RouterLink}
          to="/register"
          sx={{
            px: 4,
            py: 1.5,
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 0 20px #00D4FF'
            }
          }}
        >
          Get Started for Free
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            borderColor: 'rgba(255, 255, 255, 0.2)'
          }}
        >
          Contact Us
        </Button>
      </Stack>
    </Box>
  </Container>
);

// Features Section
const FeaturesSection = React.forwardRef((props, ref) => (
  <Container component="section" id="features" ref={ref} maxWidth="lg" sx={{ py: 8, mb: 7, position: 'relative' }}>
    <FloatingElements />
    <Typography variant="h3" align="center" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2.5rem' }, color: '#FFF' }}>
      Why Choose GoalMaster?
    </Typography>
    <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ fontSize: { xs: '1rem', md: '1.25rem' }, color: '#555555' }}>
      More than just a to-do list. We provide smart insights and motivation!
    </Typography>

    <Grid container spacing={4} sx={{ mt: 4 }}>
      {[
        {
          icon: <AIIcon sx={{ fontSize: 60 }} />,
          title: 'AI-Powered',
          description: 'Smart goal tracking and personalized insights.'
        },
        {
          icon: <IntegrationIcon sx={{ fontSize: 60 }} />,
          title: 'Seamless Integration',
          description: 'Syncs with Google Calendar, Notion, etc.'
        },
        {
          icon: <RewardsIcon sx={{ fontSize: 60 }} />,
          title: 'Gamified Challenges',
          description: 'Earn rewards for completing tasks.'
        },
        {
          icon: <ReminderIcon sx={{ fontSize: 60 }} />,
          title: 'Smart Reminders',
          description: 'Never miss an important task again!'
        }
      ].map((feature, index) => (
        <Grid item xs={12} sm={6} md={3} key={feature.title}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                p: 3,
                '&:hover': {
                  transform: 'translateY(-8px)',
                  transition: 'transform 0.3s ease-in-out'
                }
              }}
            >
              <Box sx={{ mb: 2, color: 'primary.main', fontSize: '60px' }}>
                {feature.icon}
              </Box>
              <Typography variant="h6" sx={index === 1 ? { fontSize: "19px" } : {}} gutterBottom>
                {feature.title}
              </Typography>
              <Typography color="text.secondary">
                {feature.description}
              </Typography>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  </Container>
));

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleScroll = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    if (isMobile) {
      setOpenDrawer(false);
    }
  };

  // Add click handler for navigation items
  const handleNavClick = (href) => {
    handleScroll(href);
    if (isMobile) {
      setOpenDrawer(false);
    }
  };

  return (
    <Box sx={{ 
      bgcolor: '#121212', 
      color: '#ffffff', 
      minHeight: '100vh',
      '& ::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
      },
      '& ::-webkit-scrollbar-track': {
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '4px',
      },
      '& ::-webkit-scrollbar-thumb': {
        background: 'linear-gradient(45deg, #00D4FF, #FF007F)',
        borderRadius: '4px',
        '&:hover': {
          background: 'linear-gradient(45deg, #00A3CC, #CC0066)',
        },
      },
    }}>

      {/* Navigation Bar */}
      <AppBar position="fixed" sx={{ bgcolor: 'rgba(18, 18, 18, 0.8)', backdropFilter: 'blur(10px)' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <img src={Logo} alt="GoalMaster Logo" style={{ height: 40, marginRight: 16 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#ffffff' }}>
              GoalMaster
            </Typography>
          </Box>

          {isMobile ? (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={() => setOpenDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.title}
                    color="inherit"
                    onClick={() => handleNavClick(item.href)}
                    sx={{
                      color: '#ffffff',
                      minWidth: 'auto',
                      px: 2,
                      '&:hover': {
                        color: '#00D4FF',
                      },
                    }}
                  >
                    {item.title}
                  </Button>
                ))}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 12 }}>
                <Button
                  variant="contained"
                  onClick={() => navigate('/register')}
                  sx={{
                    background: 'linear-gradient(45deg, #00D4FF, #FF007F)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #00A3CC, #CC0066)',
                    },
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/login')}
                  sx={{
                    color: '#ffffff',
                    borderColor: '#ffffff',
                    '&:hover': {
                      borderColor: '#00D4FF',
                      color: '#00D4FF',
                    },
                  }}
                >
                  Login
                </Button>
              </Box>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: 300,
            bgcolor: '#1e1e1e',
            backdropFilter: 'blur(10px)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <Box sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Drawer Header */}
          <Box sx={{ 
            p: 3, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'linear-gradient(45deg, rgba(0,212,255,0.1), rgba(255,0,127,0.1))',
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <img src={Logo} alt="GoalMaster Logo" style={{ height: 32 }} />
              <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 700 }}>
                Menu
              </Typography>
            </Box>
            <IconButton
              onClick={() => setOpenDrawer(false)}
              sx={{ 
                color: '#ffffff',
                '&:hover': {
                  color: '#00D4FF',
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Drawer Content */}
          <Box sx={{ 
            flex: 1, 
            overflow: 'auto',
            p: 3
          }}>
            <List sx={{ width: '100%' }}>
              {navItems.map((item) => (
                <ListItem
                  button
                  key={item.title}
                  onClick={() => handleNavClick(item.href)}
                  sx={{
                    color: '#ffffff',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  <ListItemText primary={item.title} />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Drawer Footer */}
          <Box sx={{ 
            p: 3, 
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            background: 'rgba(0, 0, 0, 0.2)',
          }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                navigate('/login');
                setOpenDrawer(false);
              }}
              sx={{
                color: '#ffffff',
                borderColor: '#ffffff',
                py: 1.5,
                '&:hover': {
                  borderColor: '#00D4FF',
                  color: '#00D4FF',
                },
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                navigate('/register');
                setOpenDrawer(false);
              }}
              sx={{
                background: 'linear-gradient(45deg, #00D4FF, #FF007F)',
                py: 1.5,
                '&:hover': {
                  background: 'linear-gradient(45deg, #00A3CC, #CC0066)',
                },
              }}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: "background.paper", py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>Company</Typography>
              <Stack spacing={2}>
                <Link href="#" color="inherit">About</Link>
                <Link href="#" color="inherit">Careers</Link>
                <Link href="#" color="inherit">Blog</Link>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>Support</Typography>
              <Stack spacing={2}>
                <Link href="#" color="inherit">Help Center</Link>
                <Link href="#" color="inherit">Privacy Policy</Link>
                <Link href="#" color="inherit">Terms</Link>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>Connect</Typography>
              <Stack direction="row" spacing={2}>
                <IconButton color="inherit"><TwitterIcon /></IconButton>
                <IconButton color="inherit"><LinkedInIcon /></IconButton>
                <IconButton color="inherit"><GitHubIcon /></IconButton>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

// **Styles**
const navLinkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "500",
  transition: "color 0.3s ease-in-out",
  "&:hover": {
    color: "#00D4FF",
  },
};

const registerButtonStyle = {
  borderRadius: "8px",
  fontWeight: "bold",
  textTransform: "none",
  marginLeft : '300px',
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0px 4px 15px rgba(0, 212, 255, 0.6)",
  },
};

export default LandingPage; 